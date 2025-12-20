import { Metadata } from "next";
import { Prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ViewEditClient from "./components/client";

type Props = {
  params: Promise<{ judul: string; kelas: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { judul, kelas } = await params;
  const decodedJudul = decodeURIComponent(judul);
  
  return {
    title: `${decodedJudul} - Kelas ${kelas} | Mindsea Admin`,
    description: `Detail soal ${decodedJudul} untuk kelas ${kelas} SD`,
  };
}

async function getQuestions(judul: string, kelas: string) {
  const decodedJudul = decodeURIComponent(judul);
  
  const whereClause: any = {
    kelas: parseInt(kelas),
  };

  // Handle "Tanpa Judul" case
  if (decodedJudul === "Tanpa Judul") {
    whereClause.judul = null;
  } else {
    whereClause.judul = decodedJudul;
  }

  const questions = await Prisma.pertanyaan.findMany({
    where: whereClause,
    orderBy: {
      created_at: "desc",
    },
  });

  if (questions.length === 0) {
    notFound();
  }

  // Convert BigInt to string for JSON serialization
  return questions.map((q) => ({
    ...q,
    id_pertanyaan: q.id_pertanyaan.toString(),
    id_latihan: q.id_latihan?.toString() || null,
  }));
}

export default async function SoalDetailPage({ params }: Props) {
  const { judul, kelas } = await params;
  const questions = await getQuestions(judul, kelas);
  const decodedJudul = decodeURIComponent(judul);

  return (
    <ViewEditClient 
      questions={questions}
      judul={decodedJudul}
      kelas={parseInt(kelas)}
    />
  );
}
