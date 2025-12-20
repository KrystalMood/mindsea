import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    return NextResponse.json({ message: "✅ Registration successful!" }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ message: `❌ An error occurred while registering: ${(error as Error).message}` }, { status: 500 });
  }
}