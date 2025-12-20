import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latihan | Mindsea",
  description: "Latihan aplikasi Mindsea",
  openGraph: {
    title: "Latihan | Mindsea",
    description: "Latihan aplikasi Mindsea",
  },
  twitter: {
    title: "Latihan | Mindsea",
    description: "Latihan aplikasi Mindsea",
  },
};

export default function Latihan() {
  return (
    <>
      <span className="absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-10" />
    </>
  );
}