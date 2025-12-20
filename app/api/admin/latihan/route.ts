import { Prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const latihan = await Prisma.latihan.findMany({
      where: { aktif: true },
      select: {
        id_latihan: true,
        judul: true,
        deskripsi: true,
        total_pertanyaan: true,
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({
      data: latihan.map((item) => ({
        id: item.id_latihan.toString(),
        judul: item.judul,
        deskripsi: item.deskripsi,
        total_pertanyaan: item.total_pertanyaan,
      })),
    });
  } catch (error) {
    console.error("Error fetching latihan:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data latihan" },
      { status: 500 }
    );
  }
}
