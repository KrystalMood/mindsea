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

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const kelas = searchParams.get("kelas");

    // Build where clause
    const whereClause: any = {};
    if (kelas) {
      const kelasInt = parseInt(kelas);
      // Filter: kelas yang sama, kelas di bawahnya
      whereClause.OR = [
        { kelas: { lte: kelasInt } }, // kelas <= dipilih
  
      ];
    }

    // Fetch all materials, ordered by newest first
    const materials = await Prisma.materi_generated.findMany({
      where: whereClause,
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        judul: true,
        audience: true,
        format: true,
        model: true,
        kelas: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json({ 
      materials,
      data: materials.map(m => ({ id: m.id, judul: m.judul, kelas: m.kelas }))
    }, { status: 200 });
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
