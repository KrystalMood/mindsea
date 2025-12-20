import { Prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questions } = body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { message: "Data soal tidak valid" },
        { status: 400 }
      );
    }

    // Get kelas and judul from first question
    const kelas = questions[0]?.kelas;
    const judul = questions[0]?.judul || null;

    if (!kelas || kelas < 1 || kelas > 6) {
      return NextResponse.json(
        { message: "Kelas tidak valid" },
        { status: 400 }
      );
    }

    // Insert all questions
    const createdQuestions = await Promise.all(
      questions.map((q) =>
        Prisma.pertanyaan.create({
          data: {
            teks_pertanyaan: q.teks_pertanyaan,
            pilihan: q.pilihan,
            jawaban_benar: q.jawaban_benar,
            kelas: q.kelas,
            judul: q.judul || null,
          },
        })
      )
    );

    return NextResponse.json(
      {
        message: "Soal berhasil disimpan",
        data: {
          created: createdQuestions.length,
          kelas: kelas,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving questions:", error);
    return NextResponse.json(
      { message: `Gagal menyimpan soal: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
