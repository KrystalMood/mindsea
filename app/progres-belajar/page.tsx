import { Metadata } from "next";
import Hero from "./components/hero";
import Statistics from "./components/statistics";
import Chart from "./components/chart";
import Activity from "./components/activity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Progres Belajar | Mindsea",
  description: "Progres belajar aplikasi Mindsea",
  openGraph: {
    title: "Progres Belajar | Mindsea",
    description: "Progres belajar aplikasi Mindsea",
  },
  twitter: {
    title: "Progres Belajar | Mindsea",
    description: "Progres belajar aplikasi Mindsea",
  },
};

export default function ProgresBelajar() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <Statistics />
      <section className="mx-8 mt-6 grid grid-cols-1 gap-6 overflow-hidden rounded-xl md:grid-cols-2">
        <Chart />
        <Activity />
      </section>
    </>
  );
}
