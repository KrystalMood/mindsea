import { Peran } from "@/lib/generated/prisma";
import { Prisma } from "@/lib/prisma";
import { UsersSchema } from "@/validators/users.schema";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const user = await Prisma.pengguna.findUnique({
      where: {
        id_pengguna: BigInt(id),
      },
      select: {
        id_pengguna: true,
        nama: true,
        surel: true,
        peran: true,
        kelas: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Pengguna tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      id: user.id_pengguna.toString(),
      nama: user.nama,
      surel: user.surel,
      peran: user.peran,
      kelas: user.kelas,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
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

export async function PUT(
  request: NextRequest,
  { params }: Params,
): Promise<NextResponse<{ message: string }>> {
  const { id } = await params;

  try {
    const body = await request.json();

    const validate = UsersSchema.partial().safeParse(body);
    if (!validate.success)
      return NextResponse.json(
        {
          message: `${validate.error.issues[0].message}`,
        },
        {
          status: 400,
        },
      );

    const { nama, surel, kata_sandi, peran, kelas } = validate.data;

    const existingUser = await Prisma.pengguna.findUnique({
      where: {
        id_pengguna: BigInt(id),
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "Pengguna tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    if (surel && surel !== existingUser.surel) {
      const emailExists = await Prisma.pengguna.findFirst({
        where: { surel, NOT: { id_pengguna: BigInt(id) } },
      });
      if (emailExists) {
        return NextResponse.json(
          { message: "Email sudah digunakan pengguna lain" },
          { status: 400 },
        );
      }
    }

    const updateData: {
      nama?: string;
      surel?: string;
      kata_sandi?: string;
      peran?: Peran;
      kelas?: number | null;
    } = {};

    if (nama) updateData.nama = nama;
    if (surel) updateData.surel = surel;
    if (kata_sandi) updateData.kata_sandi = kata_sandi;
    if (peran) {
      updateData.peran = peran as Peran;
      // Set kelas hanya jika peran SISWA, jika ADMIN set ke null
      if (peran === "SISWA" && kelas !== undefined) {
        updateData.kelas = kelas;
      } else if (peran === "ADMIN") {
        updateData.kelas = null;
      }
    }

    await Prisma.pengguna.update({
      where: {
        id_pengguna: BigInt(id),
      },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Pengguna berhasil diperbarui",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error updating user:", error);
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
