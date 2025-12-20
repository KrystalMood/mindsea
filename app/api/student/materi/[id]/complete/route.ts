import { NextRequest, NextResponse } from "next/server";
import { cookies as cookieStore } from "next/headers";
import { Prisma } from "@/lib/prisma";
import { SESSION_TOKEN, USER_ID } from "@/constants/route";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const cookies = await cookieStore();

    const sessionToken = cookies.get(SESSION_TOKEN)?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 },
      );
    }

    const userIdStr = cookies.get(USER_ID)?.value;
    if (!userIdStr) {
      return NextResponse.json(
        { error: "User ID tidak ditemukan, silakan login ulang" },
        { status: 401 },
      );
    }

    const userId = BigInt(userIdStr);

    const material = await Prisma.materi_generated.findUnique({
      where: { id },
    });

    if (!material) {
      return NextResponse.json(
        { error: "Materi tidak ditemukan" },
        { status: 404 },
      );
    }

    const existing = await Prisma.progres_materi.findUnique({
      where: {
        id_pengguna_id_materi: {
          id_pengguna: userId,
          id_materi: id,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "Materi sudah ditandai selesai sebelumnya",
          alreadyCompleted: true,
        },
        { status: 200 },
      );
    }

    await Prisma.progres_materi.create({
      data: {
        id_pengguna: userId,
        id_materi: id,
      },
    });

    console.log(`Material ${id} marked as complete by user ${userId}`);

    return NextResponse.json(
      { message: "Materi berhasil ditandai selesai!", completed: true },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error marking material complete:", error);
    return NextResponse.json(
      { error: "Gagal menandai materi selesai" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const cookies = await cookieStore();

    const sessionToken = cookies.get(SESSION_TOKEN)?.value;
    const userIdStr = cookies.get(USER_ID)?.value;

    if (!sessionToken || !userIdStr) {
      return NextResponse.json({ completed: false }, { status: 200 });
    }

    const userId = BigInt(userIdStr);

    const progress = await Prisma.progres_materi.findUnique({
      where: {
        id_pengguna_id_materi: {
          id_pengguna: userId,
          id_materi: id,
        },
      },
    });

    return NextResponse.json(
      { completed: !!progress, completedAt: progress?.selesai_at },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error checking completion:", error);
    return NextResponse.json({ completed: false }, { status: 200 });
  }
}
