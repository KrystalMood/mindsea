import type { Metadata } from "next";
import { Prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Hero from "./components/hero";
import SlideContent from "./components/slide-content";

type Params = { params: Promise<{ id: string }> };

async function getMaterial(id: string) {
  const material = await Prisma.materi_generated.findUnique({
    where: { id },
    select: {
      id: true,
      judul: true,
      konten: true,
      audience: true,
      format: true,
      model: true,
      created_at: true,
    },
  });

  return material;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const material = await getMaterial(id);

  if (!material) {
    return {
      title: "Materi Tidak Ditemukan | Mindsea",
      description: "Materi yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: `${material.judul} | Mindsea`,
    description: material.konten.substring(0, 150) + "...",
    openGraph: {
      title: `${material.judul} | Mindsea`,
      description: material.konten.substring(0, 150) + "...",
    },
    twitter: {
      title: `${material.judul} | Mindsea`,
      description: material.konten.substring(0, 150) + "...",
    },
  };
}

export default async function DetailMateri({ params }: Params) {
  const { id } = await params;
  const material = await getMaterial(id);

  if (!material) {
    notFound();
  }

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero title={material.judul} audience={material.audience} />
      <SlideContent material={material} />
    </>
  );
}
