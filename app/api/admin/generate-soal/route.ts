import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jumlahSoal = parseInt(formData.get("jumlahSoal") as string);
    const sumberKonteks = formData.get("sumberKonteks") as string;
    const idLatihan = formData.get("idLatihan") as string;

    if (!jumlahSoal || jumlahSoal < 1 || jumlahSoal > 20) {
      return NextResponse.json(
        { message: "Jumlah soal harus antara 1-20" },
        { status: 400 }
      );
    }

    // Get context
    let context = "";

    if (sumberKonteks === "materi") {
      const idMateri = formData.get("idMateri") as string;
      const materi = await Prisma.materi_generated.findUnique({
        where: { id: idMateri },
        select: { judul: true, konten: true },
      });

      if (!materi) {
        return NextResponse.json(
          { message: "Materi tidak ditemukan" },
          { status: 404 }
        );
      }

      context = `Judul: ${materi.judul}\n\nKonten:\n${materi.konten}`;
    } else if (sumberKonteks === "pdf") {
      const file = formData.get("file") as File;

      if (!file) {
        return NextResponse.json(
          { message: "File PDF tidak ditemukan" },
          { status: 400 }
        );
      }

      // For now, return error for PDF - will implement later
      return NextResponse.json(
        { message: "Upload PDF belum didukung. Gunakan sumber materi." },
        { status: 400 }
      );
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

    // Tambahkan id_latihan ke setiap soal
    const questionsWithLatihan = questions.map((q) => ({
      ...q,
      id_latihan: idLatihan,
    }));

    return NextResponse.json({
      message: "Soal berhasil di-generate",
      questions: questionsWithLatihan,
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
