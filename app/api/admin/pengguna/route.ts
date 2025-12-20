import { Peran } from "@/lib/generated/prisma";
import { Prisma } from "@/lib/prisma";
import { UsersSchema } from "@/validators/users.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<{ message: string }>> {
  try {
    const body = await request.json();

    const validate = UsersSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json(
        {
          message: `${validate.error.issues[0].message}`,
        },
        {
          status: 400,
        },
      );
    }

    const { nama, surel, kata_sandi, peran, kelas } = validate.data;

    const existingUser = await Prisma.pengguna.findFirst({
      where: {
        surel,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Pengguna dengan surel ini sudah ada",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await hash(kata_sandi, 12);

    await Prisma.pengguna.create({
      data: {
        nama,
        surel,
        kata_sandi: hashedPassword,
        peran: peran as Peran,
        kelas: peran === "SISWA" ? kelas : null,
        aktif: true,
      },
    });

    return NextResponse.json(
      {
        message: "Pengguna berhasil dibuat",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        message: `Terjadi kesalahan: ${error as Error}.message`,
      },
      {
        status: 500,
      },
    );
  }
}
