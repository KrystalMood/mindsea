import { NextRequest, NextResponse } from "next/server";
import { cookies as cookieStore } from "next/headers";
import { Prisma } from "@/lib/prisma";
import { USER_INFO } from "@/constants/route";
import { Peran } from "@/lib/generated/prisma";

/**
 * GET /api/admin/materi
 * Fetch all generated materials
 * Admin-only endpoint
 */
export async function GET(request: NextRequest) {
  try {
    // Authentication Check
    const cookies = await cookieStore();
    const userRole = cookies.get(USER_INFO)?.value as Peran | undefined;

    if (userRole !== Peran.ADMIN) {
      return NextResponse.json(
        { error: "Unauthorized", details: "Admin access required" },
        { status: 401 },
      );
    }

    // Fetch all materials, ordered by newest first
    const materials = await Prisma.materi_generated.findMany({
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        judul: true,
        audience: true,
        format: true,
        model: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json({ materials }, { status: 200 });
  } catch (error: unknown) {
    console.error("❌ Error fetching materials:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: "Failed to fetch materials",
      },
      { status: 500 },
    );
  }
}
