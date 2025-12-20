import { Metadata } from "next";
import Hero from "@/app/components/hero";
import Lessons from "@/app/components/lessons";
import Progress from "@/app/components/progress";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dasbor | Mindsea",
  description: "Dasbor aplikasi Mindsea",
  openGraph: {
    title: "Dasbor | Mindsea",
    description: "Dasbor aplikasi Mindsea",
  },
  twitter: {
    title: "Dasbor | Mindsea",
    description: "Dasbor aplikasi Mindsea",
  },
};

export default function Home() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <Lessons />
      <Progress />
    </>
  );
}