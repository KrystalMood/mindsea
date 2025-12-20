import type { Metadata } from "next";
import { titleCase } from "@/utils/text";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    return {
      title: `Materi ${titleCase(id.replace(/-/g, " "))} | Mindsea`,
      description: `Detail materi dengan ID ${titleCase(id.replace(/-/g, " "))}.`,
      openGraph: {
        title: `Materi ${titleCase(id.replace(/-/g, " "))} | Mindsea`,
        description: `Detail materi dengan ID ${titleCase(id.replace(/-/g, " "))}.`,
      },
      twitter: {
        title: `Materi ${titleCase(id.replace(/-/g, " "))} | Mindsea`,
        description: `Detail materi dengan ID ${titleCase(id.replace(/-/g, " "))}.`,
      },
    };
  } catch (error: unknown) {
    console.error(`❌ Error fetching materi with ID ${titleCase(id.replace(/-/g, " "))}: ${(error as Error).message}`);

    return {
      title: "404: Materi Tidak Ditemukan | Mindsea",
      description: `Materi dengan ID ${titleCase(id.replace(/-/g, " "))} tidak ditemukan.`,
      openGraph: {
        title: "404: Materi Tidak Ditemukan | Mindsea",
        description: `Materi dengan ID ${titleCase(id.replace(/-/g, " "))} tidak ditemukan.`,
      },
      twitter: {
        title: "404: Materi Tidak Ditemukan | Mindsea",
        description: `Materi dengan ID ${titleCase(id.replace(/-/g, " "))} tidak ditemukan.`,
      },
    };
  }
}

export default async function DetailMateri({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <span className="absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-10" />
      <section className="m-8">{titleCase(id.replace(/-/g, " "))}</section>
    </>
  );
}