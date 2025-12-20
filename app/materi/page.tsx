import { Metadata } from "next";

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

export default function Materi() {
  return (
    <>
      <span className="absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-10" />
    </>
  );
}