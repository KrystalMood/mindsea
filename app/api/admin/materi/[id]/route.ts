import { NextRequest, NextResponse } from "next/server";
import { cookies as cookieStore } from "next/headers";
import { Prisma } from "@/lib/prisma";
import { USER_INFO } from "@/constants/route";
import { Peran } from "@/lib/generated/prisma";
import { z } from "zod";

// Validation schema for updating material
const UpdateMateriSchema = z.object({
  judul: z.string().trim().min(1, "Judul harus diisi").optional(),
  konten: z.string().trim().min(1, "Konten harus diisi").optional(),
  audience: z.string().trim().optional(),
});

/**
 * GET /api/admin/materi/[id]
 * Fetch a single material by ID
 * Admin-only endpoint
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    const material = await Prisma.materi_generated.findUnique({
      where: { id },
    });

    if (!material) {
      return NextResponse.json(
        { error: "Not found", details: "Material not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ material }, { status: 200 });
  } catch (error: unknown) {
    console.error("❌ Error fetching material:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: "Failed to fetch material",
      },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/admin/materi/[id]
 * Update a material by ID
 * Admin-only endpoint
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const body = await request.json();
    const validation = UpdateMateriSchema.safeParse(body);

    if (!validation.success) {
      const errorMessage =
        validation.error.issues[0]?.message || "Invalid input";
      return NextResponse.json(
        { error: "Validation failed", details: errorMessage },
        { status: 400 },
      );
    }

    // Update material
    const updatedMaterial = await Prisma.materi_generated.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json(
      { message: "Material updated successfully", material: updatedMaterial },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("❌ Error updating material:", error);

    // Check if it's a Prisma error (record not found)
    if (error && typeof error === "object" && "code" in error) {
      if ((error as { code: string }).code === "P2025") {
        return NextResponse.json(
          { error: "Not found", details: "Material not found" },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: "Failed to update material",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/admin/materi/[id]
 * Delete a material by ID
 * Admin-only endpoint
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    // Delete material
    await Prisma.materi_generated.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Material deleted successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("❌ Error deleting material:", error);

    // Check if it's a Prisma error (record not found)
    if (error && typeof error === "object" && "code" in error) {
      if ((error as { code: string }).code === "P2025") {
        return NextResponse.json(
          { error: "Not found", details: "Material not found" },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: "Failed to delete material",
      },
      { status: 500 },
    );
  }
}
