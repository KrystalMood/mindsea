import { NextRequest, NextResponse } from "next/server";
import { cookies as cookieStore } from "next/headers";
import { z } from "zod";
import { Prisma } from "@/lib/prisma";
import { USER_INFO } from "@/constants/route";
import { Peran } from "@/lib/generated/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { generateGeminiContent } from "@/lib/gemini";

// Input validation schema
const GenerateMateriSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(5, "Prompt harus minimal 5 karakter")
    .max(4000, "Prompt maksimal 4000 karakter"),
  title: z.string().trim().optional(),
  audience: z.string().trim().optional(),
  format: z.enum(["markdown", "html"]).default("markdown"),
});

type GenerateMateriInput = z.infer<typeof GenerateMateriSchema>;

interface GenerateMateriResponse {
  id: string;
  text: string;
  model: string;
  title: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

/**
 * POST /api/admin/generate-materi
 * Generate learning material using Gemini 2.5 Flash
 * Admin-only endpoint with rate limiting
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<GenerateMateriResponse | ErrorResponse>> {
  try {
    // === 1. Authentication Check ===
    const cookies = await cookieStore();
    const userRole = cookies.get(USER_INFO)?.value as Peran | undefined;

    // TODO: Integrate with full auth system (check SESSION_TOKEN validity)
    // For now, checking if user role is ADMIN
    if (userRole !== Peran.ADMIN) {
      console.warn(
        "❌ Unauthorized access attempt to generate-materi endpoint",
      );
      return NextResponse.json(
        { error: "Unauthorized", details: "Admin access required" },
        { status: 401 },
      );
    }

    // === 2. Rate Limiting ===
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, {
      maxRequests: 10,
      windowMs: 10 * 60 * 1000, // 10 requests per 10 minutes
    });

    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetAt).toISOString();
      console.warn(`❌ Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        {
          error: "Too many requests",
          details: `Rate limit exceeded. Try again after ${resetDate}`,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
          },
        },
      );
    }

    // === 3. Input Validation ===
    const body = await request.json();
    const validation = GenerateMateriSchema.safeParse(body);

    if (!validation.success) {
      const errorMessage =
        validation.error.issues[0]?.message || "Invalid input";
      console.warn("❌ Invalid input:", errorMessage);
      return NextResponse.json(
        { error: "Validation failed", details: errorMessage },
        { status: 400 },
      );
    }

    const { prompt, title, audience, format } = validation.data;

    // === 4. Initialize Gemini API ===
    const apiKey = process.env.GOOGLE_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";

    if (!apiKey) {
      console.error("❌ GOOGLE_API_KEY not configured");
      return NextResponse.json(
        {
          error: "Server configuration error",
          details: "API key not configured",
        },
        { status: 500 },
      );
    }

    // === 5. Construct Prompt with System Instructions ===
    const systemInstruction = `
Anda adalah penulis materi pembelajaran berbahasa Indonesia yang dirancang khusus agar nyaman dipahami oleh pengguna tunanetra melalui pembacaan Text-to-Speech (TTS) dan screen reader.

PRINSIP UTAMA (WAJIB DIPATUHI)
1) Jangan menulis kalimat pembuka meta seperti “Berikut adalah…”, “Sebagai AI…”, “Materi ini dirancang…”, atau sejenisnya. Langsung mulai dari judul materi.
2) Output WAJIB Markdown yang rapi, konsisten, dan mudah dibaca TTS.
3) Fokus pada kejelasan dan kelengkapan. Tidak boleh ada kuis, soal pilihan ganda, atau bagian “Kuis/Latihan” berupa pertanyaan-pertanyaan evaluasi. Jika perlu latihan, buat “Latihan Praktik Terarah” yang berupa langkah kerja/proyek mini, bukan daftar pertanyaan.
4) Hindari ketergantungan visual: jangan menulis “lihat gambar”, “pada diagram”, “di tabel”. Jika butuh ilustrasi, jelaskan dalam kata-kata secara naratif.
5) TTS-friendly: gunakan kalimat relatif pendek, istilah teknis dijelaskan sekali saat pertama muncul, gunakan daftar bernomor untuk prosedur, dan hindari tabel Markdown (gunakan bullet/nomor sebagai pengganti).
6) Personalisasi ringan untuk tunanetra: gunakan sapaan “kamu” secara netral, dan sisipkan tips praktis yang relevan seperti penggunaan screen reader, navigasi keyboard, atau strategi mendengarkan ulang bagian tertentu—tanpa terdengar seperti promosi fitur.

FORMAT STRUKTUR (WAJIB ADA SEMUA)
- # Judul Materi (satu judul yang spesifik dan deskriptif)
- ## Ringkasan Singkat (2–4 kalimat, langsung ke inti)
- ## Tujuan Pembelajaran (3–6 poin, terukur)
- ## Prasyarat (opsional, hanya jika memang perlu)
- ## Konsep Inti (pecah menjadi subbagian dengan heading ###, jelaskan dari dasar ke lanjut)
- ## Langkah demi Langkah (jika materi prosedural, pakai numbering 1,2,3…; jika konseptual, berikan alur “dari pengertian → alasan → cara kerja → konsekuensi”)
- ## Contoh Praktis (minimal 2 contoh, konkret)
    - Jika ada kode: 
      - berikan blok kode,
      - lalu jelaskan setelahnya secara naratif (apa tujuan kode, bagian pentingnya, dan cara memodifikasi),
      - hindari komentar panjang di dalam kode; lebih baik jelaskan di luar blok kode.
- ## Kesalahan Umum dan Cara Menghindarinya (minimal 5 poin, format bullet)
- ## Rangkuman (5–10 bullet poin)
- ## Glosarium (opsional, hanya istilah yang benar-benar penting)

GAYA BAHASA
- Bahasa Indonesia teknis tapi mudah, hindari slang berlebihan.
- Gunakan istilah konsisten (misal: “endpoint”, “request”, “response”).
- Jangan gunakan emoji, ASCII art, atau pemisah dekoratif berlebihan.
- Jangan membuat klaim yang tidak pasti. Jika ada hal yang bergantung konteks, tuliskan “umumnya”, “biasanya”, dan sebutkan syaratnya.

ATURAN KONTEN
- Materi harus akurat dan relevan dengan "Target Kelas" dan/atau "Judul Materi" bila diberikan.
- Sesuaikan kedalaman materi berdasarkan tingkat kelas SD (usia 6-12 tahun):
  - Kelas 1-2 SD (usia 6-8): Bahasa sangat sederhana, kalimat pendek-pendek, banyak analogi dari kehidupan sehari-hari, hindari istilah teknis, fokus pada pengenalan dasar.
  - Kelas 3-4 SD (usia 8-10): Bahasa sederhana tapi mulai diperkenalkan istilah dasar dengan penjelasan, gunakan contoh konkret dari lingkungan sekitar, mulai perkenalkan konsep sebab-akibat.
  - Kelas 5-6 SD (usia 10-12): Bahasa lebih formal tapi tetap mudah dipahami, boleh gunakan istilah teknis dengan definisi jelas, contoh bisa lebih abstrak, mulai perkenalkan konsep yang lebih kompleks dan hubungan antar-konsep.
- Jangan menyertakan kuis atau pertanyaan evaluasi di akhir.

OUTPUT FINAL
Tulis hanya konten materi dalam Markdown sesuai struktur di atas. Tidak ada preface, tidak ada penjelasan meta, tidak ada penutup yang memuji pengguna.
`;

    const userPrompt = `${audience ? `Target Kelas: ${audience}\n` : ""}${title ? `Judul Materi: ${title}\n` : ""}\nBuat materi pembelajaran tentang: ${prompt}`;

    console.log("🚀 Generating material with Gemini...");

    // === 6. Call Gemini API ===
    const { result, model: resolvedModel } = await generateGeminiContent({
      apiKey,
      contents: [
        {
          role: "user",
          parts: [{ text: systemInstruction + "\n\n" + userPrompt }],
        },
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        topP: 0.95,
        topK: 40,
      },
    });

    const generatedText =
      result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!generatedText) {
      console.error("❌ Empty response from Gemini");
      return NextResponse.json(
        { error: "Generation failed", details: "No content generated" },
        { status: 500 },
      );
    }

    console.log("✅ Material generated successfully");

    // === 7. Extract Title (if not provided) ===
    const finalTitle =
      title || extractTitleFromMarkdown(generatedText) || "Materi Pembelajaran";

    // === 8. Save to Database ===
    const savedMaterial = await Prisma.materi_generated.create({
      data: {
        judul: finalTitle,
        prompt: prompt,
        konten: generatedText,
        model: resolvedModel,
        audience: audience || null,
        format: format,
        created_by: null, // TODO: Add user ID when auth system is fully integrated
      },
    });

    console.log(`✅ Material saved to database with ID: ${savedMaterial.id}`);

    // === 9. Return Response ===
    return NextResponse.json(
      {
        id: savedMaterial.id,
        text: generatedText,
        model: resolvedModel,
        title: finalTitle,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
        },
      },
    );
  } catch (error: unknown) {
    console.error("❌ Error in generate-materi:", error);

    // Check if it's a Gemini API error
    if (error && typeof error === "object" && "message" in error) {
      return NextResponse.json(
        {
          error: "Generation failed",
          details: (error as Error).message,
        },
        {
          status: (error as Error).message.includes("503") ? 503 : 500,
        },
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}

/**
 * Helper function to extract title from generated Markdown
 */
function extractTitleFromMarkdown(markdown: string): string | null {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : null;
}
