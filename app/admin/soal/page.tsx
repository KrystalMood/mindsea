import { Metadata } from "next";
import Hero from "./components/hero";
import { Prisma } from "@/lib/prisma";
import SoalTable from "./components/soal-table";

export const metadata: Metadata = {
  title: "Soal | Mindsea Admin",
  description: "Kelola soal-soal pada platform Mindsea Admin.",
  openGraph: {
    title: "Soal | Mindsea Admin",
    description: "Kelola soal-soal pada platform Mindsea Admin.",
  },
  twitter: {
    title: "Soal | Mindsea Admin",
    description: "Kelola soal-soal pada platform Mindsea Admin.",
  },
};

async function getSoalStats() {
  // Group by judul and kelas to get statistics
  const soalList = await Prisma.pertanyaan.findMany({
    select: {
      judul: true,
      kelas: true,
      id_pertanyaan: true,
    },
    orderBy: [
      { kelas: "asc" },
      { judul: "asc" },
      { created_at: "desc" },
    ],
  });

  // Group questions by judul and kelas
  const grouped = soalList.reduce((acc: any, soal) => {
    const key = `${soal.judul || "Tanpa Judul"}-${soal.kelas || 0}`;
    if (!acc[key]) {
      acc[key] = {
        judul: soal.judul || "Tanpa Judul",
        kelas: soal.kelas,
        count: 0,
      };
    }
    acc[key].count++;
    return acc;
  }, {});

  return Object.values(grouped);
}

export default async function Soal() {
  const soalStats = await getSoalStats();

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <section className="border-border mx-6 my-10 rounded-xl border bg-white p-6">
        <SoalTable soalStats={soalStats} />
      </section>
    </>
  );
}