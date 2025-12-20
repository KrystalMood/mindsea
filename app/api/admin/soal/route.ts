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

    // Get id_latihan from first question
    const idLatihan = BigInt(questions[0].id_latihan);

    // Validate latihan exists
    const latihan = await Prisma.latihan.findUnique({
      where: { id_latihan: idLatihan },
    });

    if (!latihan) {
      return NextResponse.json(
        { message: "Latihan tidak ditemukan" },
        { status: 404 }
      );
    }

    // Insert all questions
    const createdQuestions = await Promise.all(
      questions.map((q) =>
        Prisma.pertanyaan.create({
          data: {
            id_latihan: idLatihan,
            teks_pertanyaan: q.teks_pertanyaan,
            pilihan: q.pilihan,
            jawaban_benar: q.jawaban_benar,
          },
        })
      )
    );

    // Update total_pertanyaan in latihan
    await Prisma.latihan.update({
      where: { id_latihan: idLatihan },
      data: {
        total_pertanyaan: {
          increment: createdQuestions.length,
        },
      },
    });

    return NextResponse.json(
      {
        message: "Soal berhasil disimpan",
        data: {
          created: createdQuestions.length,
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
