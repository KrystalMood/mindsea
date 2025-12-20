import { compare } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { cookies as cookieStore } from "next/headers";
import {
  ADMIN_DASHBOARD,
  SESSION_TOKEN,
  STUDENT_DASHBOARD,
  USER_INFO,
  USER_ID,
} from "@/constants/route";
import { Prisma } from "@/lib/prisma";
import { UsersSchema } from "@/validators/users.schema";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<{ message: string; url?: string }>> {
  try {
    const cookies = await cookieStore();
    const body = await request.json();
    const validate = UsersSchema.pick({
      surel: true,
      kata_sandi: true,
    }).safeParse(body);

    if (!validate.success) {
      console.warn(
        "❌ Invalid login format:",
        validate.error.issues[0].message,
      );
      return NextResponse.json(
        { message: `❌ ${validate.error.issues[0].message}` },
        { status: 400 },
      );
    }

    const { surel, kata_sandi } = validate.data;

    const user = await Prisma.pengguna.findFirst({
      where: { surel },
    });

    if (!user || !(await compare(kata_sandi, user.kata_sandi))) {
      return NextResponse.json(
        { message: `❌ Akun tidak ditemukan atau kata sandi salah.` },
        { status: 401 },
      );
    }

    if (!user.aktif) {
      return NextResponse.json(
        { message: `❌ Akun Anda telah dinonaktifkan.` },
        { status: 403 },
      );
    }

    cookies.set(SESSION_TOKEN, process.env.SESSION_TOKEN as string, {
      httpOnly: false,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    cookies.set(USER_INFO, user.peran, {
      httpOnly: false,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Store user ID for progress tracking
    cookies.set(USER_ID, user.id_pengguna.toString(), {
      httpOnly: false,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(
      {
        message: "✅ Berhasil masuk.",
        url: user.peran === "ADMIN" ? ADMIN_DASHBOARD : STUDENT_DASHBOARD,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: `❌ Terjadi kesalahan saat masuk ke akun Anda: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}
