import { Prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await Prisma.pengguna.delete({
      where: {
        id_pengguna: Number(id),
      },
    });
    return NextResponse.json(
      {
        message: "Pengguna berhasil dihapus",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        message: `Terjadi kesalahan: ${(error as Error).message}`,
      },
      {
        status: 500,
      },
    );
  }
}
