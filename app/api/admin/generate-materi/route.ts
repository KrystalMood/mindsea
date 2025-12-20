import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { cookies as cookieStore } from "next/headers";
import { z } from "zod";
import { Prisma } from "@/lib/prisma";
import { USER_INFO } from "@/constants/route";
import { Peran } from "@/lib/generated/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

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
  request: NextRequest
): Promise<NextResponse<GenerateMateriResponse | ErrorResponse>> {
  try {
    // === 1. Authentication Check ===
    const cookies = await cookieStore();
    const userRole = cookies.get(USER_INFO)?.value as Peran | undefined;

    // TODO: Integrate with full auth system (check SESSION_TOKEN validity)
    // For now, checking if user role is ADMIN
    if (userRole !== Peran.ADMIN) {
      console.warn("❌ Unauthorized access attempt to generate-materi endpoint");
      return NextResponse.json(
        { error: "Unauthorized", details: "Admin access required" },
        { status: 401 }
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
        }
      );
    }

    // === 3. Input Validation ===
    const body = await request.json();
    const validation = GenerateMateriSchema.safeParse(body);

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || "Invalid input";
      console.warn("❌ Invalid input:", errorMessage);
      return NextResponse.json(
        { error: "Validation failed", details: errorMessage },
        { status: 400 }
      );
    }

    const { prompt, title, audience, format } = validation.data;

    // === 4. Initialize Gemini API ===
    const apiKey = process.env.GOOGLE_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp";

    if (!apiKey) {
      console.error("❌ GOOGLE_API_KEY not configured");
      return NextResponse.json(
        { error: "Server configuration error", details: "API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenAI({ apiKey });

    // === 5. Construct Prompt with System Instructions ===
    const systemInstruction = `Anda adalah asisten AI yang ahli dalam membuat materi pembelajaran yang komprehensif.

**INSTRUKSI PENTING:**
- Outputnya HARUS dalam format Markdown yang terstruktur dengan baik
- Gunakan Bahasa Indonesia yang teknis namun mudah dipahami
- Setiap materi pembelajaran HARUS mencakup bagian-bagian berikut:

1. **Judul** - Judul yang menarik dan deskriptif
2. **Tujuan Pembelajaran** - 3-5 poin spesifik yang akan dicapai
3. **Penjelasan Konsep** - Penjelasan mendalam dengan sub-bagian jika perlu
4. **Contoh Praktis** - Minimal 2 contoh konkret dengan kode/ilustrasi
5. **Kuis/Latihan** - 5 pertanyaan pilihan ganda dengan jawaban
6. **Rangkuman** - Ringkasan poin-poin penting

Pastikan konten edukatif, akurat, dan sesuai dengan tingkat audiens.`;

    const userPrompt = `${audience ? `Target Audiens: ${audience}\n` : ""}${title ? `Judul Materi: ${title}\n` : ""}\nBuat materi pembelajaran tentang: ${prompt}`;

    console.log("🚀 Generating material with Gemini...");

    // === 6. Call Gemini API ===
    const result = await genAI.models.generateContent({
      model: model,
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

    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!generatedText) {
      console.error("❌ Empty response from Gemini");
      return NextResponse.json(
        { error: "Generation failed", details: "No content generated" },
        { status: 500 }
      );
    }

    console.log("✅ Material generated successfully");

    // === 7. Extract Title (if not provided) ===
    const finalTitle =
      title ||
      extractTitleFromMarkdown(generatedText) ||
      "Materi Pembelajaran";

    // === 8. Save to Database ===
    const savedMaterial = await Prisma.materi_generated.create({
      data: {
        judul: finalTitle,
        prompt: prompt,
        konten: generatedText,
        model: model,
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
        model: model,
        title: finalTitle,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
        },
      }
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
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: "An unexpected error occurred" },
      { status: 500 }
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
