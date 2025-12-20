import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tentang Kami | Mindsea",
  description:
    "Cari tahu lebih lanjut tentang Mindsea, misi kami, dan tim di balik platform inovatif ini.",
  openGraph: {
    title: "Tentang Kami | Mindsea",
    description:
      "Cari tahu lebih lanjut tentang Mindsea, misi kami, dan tim di balik platform inovatif ini.",
  },
  twitter: {
    title: "Tentang Kami | Mindsea",
    description:
      "Cari tahu lebih lanjut tentang Mindsea, misi kami, dan tim di balik platform inovatif ini.",
  },
};

export default function TentangKami() {
  return (
    <>
      <span className="absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-10" />
    </>
  );
}