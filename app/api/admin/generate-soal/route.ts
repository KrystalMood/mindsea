import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jumlahSoal = parseInt(formData.get("jumlahSoal") as string);
    const sumberKonteks = formData.get("sumberKonteks") as string;
    const kelas = parseInt(formData.get("kelas") as string);
    const judul = formData.get("judul") as string | null;

    if (!jumlahSoal || jumlahSoal < 1 || jumlahSoal > 20) {
      return NextResponse.json(
        { message: "Jumlah soal harus antara 1-20" },
        { status: 400 }
      );
    }

    if (!kelas || kelas < 1 || kelas > 6) {
      return NextResponse.json(
        { message: "Kelas harus antara 1-6 SD" },
        { status: 400 }
      );
    }

    // Get context
    let context = "";

    if (sumberKonteks === "materi") {
      const idMateriStr = formData.get("idMateri") as string;
      
      // Support multiple materials separated by comma
      const idMateriList = idMateriStr
        .split(",")
        .map(id => id.trim())
        .filter(id => id.length > 0);
      
      if (idMateriList.length === 0) {
        return NextResponse.json(
          { message: "Pilih minimal 1 materi" },
          { status: 400 }
        );
      }

      const materiList = await Prisma.materi_generated.findMany({
        where: { 
          id: { in: idMateriList } 
        },
        select: { judul: true, konten: true },
      });

      if (materiList.length === 0) {
        return NextResponse.json(
          { message: "Materi tidak ditemukan" },
          { status: 404 }
        );
      }

      // Combine multiple materials into one context
      context = materiList
        .map((m) => `=== ${m.judul} ===\n\n${m.konten}`)
        .join("\n\n---\n\n");
    } else if (sumberKonteks === "pdf") {
      const file = formData.get("file") as File;

      if (!file) {
        return NextResponse.json(
          { message: "File PDF tidak ditemukan" },
          { status: 400 }
        );
      }

      if (!file.type.includes("pdf")) {
        return NextResponse.json(
          { message: "File harus berformat PDF" },
          { status: 400 }
        );
      }

      try {
        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Parse PDF using pdf-parse v1.x
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdf = require("pdf-parse/lib/pdf-parse");
        const pdfData = await pdf(buffer);
        context = pdfData.text;

        if (!context || context.trim().length === 0) {
          return NextResponse.json(
            { message: "PDF tidak mengandung teks yang bisa dibaca" },
            { status: 400 }
          );
        }
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        return NextResponse.json(
          { message: "Gagal membaca file PDF. Pastikan file tidak terenkripsi." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Sumber konteks tidak valid" },
        { status: 400 }
      );
    }

    // Generate questions using Gemini
    const apiKey = process.env.GOOGLE_API_KEY;
    const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp";

    if (!apiKey) {
      return NextResponse.json(
        { message: "API key tidak dikonfigurasi" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenAI({ apiKey });

    const prompt = `Kamu adalah seorang guru yang ahli dalam membuat soal pilihan ganda untuk siswa sekolah dasar (SD).

Berdasarkan materi berikut, buatlah ${jumlahSoal} soal pilihan ganda yang sesuai untuk anak SD.

MATERI:
${context}

INSTRUKSI:
1. Buat ${jumlahSoal} soal pilihan ganda yang berkualitas
2. Setiap soal harus memiliki 4 pilihan jawaban (A, B, C, D)
3. Pastikan hanya ada 1 jawaban yang benar
4. Soal harus sesuai dengan tingkat pemahaman anak SD
5. Gunakan bahasa Indonesia yang baik dan mudah dipahami
6. Soal harus relevan dengan materi yang diberikan
7. Hindari soal yang terlalu mudah atau terlalu sulit

FORMAT OUTPUT (JSON):
{
  "questions": [
    {
      "teks_pertanyaan": "Pertanyaan soal...",
      "pilihan": {
        "a": "Pilihan A",
        "b": "Pilihan B",
        "c": "Pilihan C",
        "d": "Pilihan D"
      },
      "jawaban_benar": "a"
    }
  ]
}

PENTING: Berikan respons HANYA dalam format JSON yang valid tanpa penjelasan tambahan.`;

    const result = await genAI.models.generateContent({
      model: modelName,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 8000,
      },
    });

    const text = result.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Format respons AI tidak valid");
    }

    const generatedData = JSON.parse(jsonMatch[0]);
    const questions = generatedData.questions;

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("AI tidak menghasilkan soal yang valid");
    }

    // Tambahkan kelas dan judul ke setiap soal
    const questionsWithKelas = questions.map((q) => ({
      ...q,
      kelas: kelas,
      judul: judul || null,
    }));

    return NextResponse.json({
      message: "Soal berhasil di-generate",
      questions: questionsWithKelas,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      {
        message: `Gagal generate soal: ${(error as Error).message}`,
      },
      { status: 500 }
    );
  }
}
