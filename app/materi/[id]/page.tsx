import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    return {
      title: `Materi ${id} | Mindsea`,
      description: `Detail materi dengan ID ${id}.`,
      openGraph: {
        title: `Materi ${id} | Mindsea`,
        description: `Detail materi dengan ID ${id}.`,
      },
      twitter: {
        title: `Materi ${id} | Mindsea`,
        description: `Detail materi dengan ID ${id}.`,
      },
    };
  } catch (error: unknown) {
    console.error(`❌ Error fetching materi with ID ${id}: ${(error as Error).message}`);

    return {
      title: "404: Materi Tidak Ditemukan | Mindsea",
      description: `Materi dengan ID ${id} tidak ditemukan.`,
      openGraph: {
        title: "404: Materi Tidak Ditemukan | Mindsea",
        description: `Materi dengan ID ${id} tidak ditemukan.`,
      },
      twitter: {
        title: "404: Materi Tidak Ditemukan | Mindsea",
        description: `Materi dengan ID ${id} tidak ditemukan.`,
      },
    };
  }
}

export default async function DetailMateri({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <span className="absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-10" />
      <section className="m-8">{id}</section>
    </>
  );
}