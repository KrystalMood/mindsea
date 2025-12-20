import { cookies as cookieStore } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { LOGIN, SESSION_TOKEN, USER_INFO } from "@/constants/route";

export async function POST({}: NextRequest): Promise<NextResponse> {
  try {
    const cookies = await cookieStore();
    
    cookies.set(SESSION_TOKEN, "", {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
    })

    cookies.set(USER_INFO, "", {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
    })

    return NextResponse.json({ message: "✅ Successfully logged out.", url: LOGIN }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: `❌ An error occurred while logging out: ${(error as Error).message}` }, { status: 500 });
  }
}