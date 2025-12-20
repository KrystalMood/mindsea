import { Prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Hero from "./components/hero";
import MateriTable from "./components/materi-table";

export const metadata: Metadata = {
  title: "Materi | Mindsea",
  description: "Halaman materi untuk admin Mindsea.",
  openGraph: {
    title: "Materi | Mindsea",
    description: "Halaman materi untuk admin Mindsea.",
  },
  twitter: {
    title: "Materi | Mindsea",
    description: "Halaman materi untuk admin Mindsea.",
  },
};

type MaterialData = {
  no: number;
  id: string;
  judul: string;
  audience: string;
  format: string;
  created_at: Date;
};

async function getMaterials(): Promise<MaterialData[]> {
  const materials = await Prisma.materi_generated.findMany({
    select: {
      id: true,
      judul: true,
      audience: true,
      format: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return materials.map((material, index) => ({
    no: index + 1,
    id: material.id,
    judul: material.judul,
    audience: material.audience || "-",
    format: material.format,
    created_at: material.created_at,
  }));
}

export default async function Materi() {
  const materials = await getMaterials();

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
        <MateriTable materials={materials} />
      </section>
    </>
  );
}
