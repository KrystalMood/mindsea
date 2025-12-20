import { Prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/soal?judul=xxx&kelas=x
 * Fetch questions by judul and kelas
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const judul = searchParams.get("judul");
    const kelas = searchParams.get("kelas");

    const whereClause: any = {};
    
    if (judul) {
      whereClause.judul = judul === "null" ? null : judul;
    }
    
    if (kelas) {
      whereClause.kelas = parseInt(kelas);
    }

    const questions = await Prisma.pertanyaan.findMany({
      where: whereClause,
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(
      {
        questions,
        count: questions.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { message: `Gagal mengambil soal: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

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

/**
 * PUT /api/admin/soal
 * Update a question by ID
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_pertanyaan, teks_pertanyaan, pilihan, jawaban_benar, judul, kelas } = body;

    if (!id_pertanyaan) {
      return NextResponse.json(
        { message: "ID pertanyaan tidak valid" },
        { status: 400 }
      );
    }

    const updatedQuestion = await Prisma.pertanyaan.update({
      where: {
        id_pertanyaan: BigInt(id_pertanyaan),
      },
      data: {
        teks_pertanyaan,
        pilihan,
        jawaban_benar,
        judul: judul || null,
        kelas: kelas ? parseInt(kelas) : null,
      },
    });

    return NextResponse.json(
      {
        message: "Soal berhasil diupdate",
        data: updatedQuestion,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { message: `Gagal mengupdate soal: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/soal?id=xxx
 * OR
 * DELETE /api/admin/soal?judul=xxx&kelas=x
 * Delete a question by ID or delete all questions by judul and kelas
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const judul = searchParams.get("judul");
    const kelas = searchParams.get("kelas");

    // Delete by ID (single question)
    if (id) {
      await Prisma.pertanyaan.delete({
        where: {
          id_pertanyaan: BigInt(id),
        },
      });

      return NextResponse.json(
        { message: "Soal berhasil dihapus" },
        { status: 200 }
      );
    }

    // Delete by judul and kelas (all questions in a group)
    if (judul && kelas) {
      const whereClause: any = {
        kelas: parseInt(kelas),
      };

      const decodedJudul = decodeURIComponent(judul);
      if (decodedJudul === "Tanpa Judul") {
        whereClause.judul = null;
      } else {
        whereClause.judul = decodedJudul;
      }

      const result = await Prisma.pertanyaan.deleteMany({
        where: whereClause,
      });

      return NextResponse.json(
        { 
          message: `${result.count} soal berhasil dihapus`,
          count: result.count 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Parameter tidak valid. Berikan id atau judul+kelas" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { message: `Gagal menghapus soal: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
