import { Metadata } from "next";
import { cookies as cookieStore } from "next/headers";
import Hero from "@/app/materi/components/hero";
import Statistics from "@/app/materi/components/statistics";
import Material from "@/app/materi/components/material";
import { Prisma } from "@/lib/prisma";
import { Kesulitan } from "@/lib/generated/prisma";
import { USER_ID } from "@/constants/route";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Materi | Mindsea",
  description: "Materi aplikasi Mindsea",
  openGraph: {
    title: "Materi | Mindsea",
    description: "Materi aplikasi Mindsea",
  },
  twitter: {
    title: "Materi | Mindsea",
    description: "Materi aplikasi Mindsea",
  },
};

async function getMaterials() {
  const materials = await Prisma.materi_generated.findMany({
    select: {
      id: true,
      judul: true,
      konten: true,
      audience: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return materials;
}

async function getStats() {
  const cookies = await cookieStore();
  const userIdStr = cookies.get(USER_ID)?.value;

  const totalMateri = await Prisma.materi_generated.count();

  let materiSelesai = 0;
  if (userIdStr) {
    materiSelesai = await Prisma.progres_materi.count({
      where: {
        id_pengguna: BigInt(userIdStr),
      },
    });
  }

  const progress =
    totalMateri > 0 ? Math.round((materiSelesai / totalMateri) * 100) : 0;
  return { totalMateri, materiSelesai, progress };
}

function getColorTheme(
  audience: string | null,
): "green" | "blue" | "red" | "yellow" {
  if (!audience) return "blue";
  if (audience.includes("1")) return "green";
  if (audience.includes("2")) return "blue";
  if (audience.includes("3")) return "red";
  if (audience.includes("4")) return "yellow";
  return "blue";
}

export default async function Materi() {
  const materials = await getMaterials();
  const stats = await getStats();

  const materialCards = materials.map((m) => ({
    id: m.id,
    title: m.judul,
    description: m.konten.substring(0, 100) + "...",
    difficulty: "Mudah" as Kesulitan,
    colorTheme: getColorTheme(m.audience),
    audience: m.audience,
  }));

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <Statistics stats={stats} />
      <Material materials={materialCards} />
    </>
  );
}
