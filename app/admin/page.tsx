import { Metadata } from "next";
import Hero from "./components/hero";
import Statistics from "./components/statistics";
import RecentActivities from "./components/recent-activities";
import QuickActions from "./components/quick-actions";

export const metadata: Metadata = {
  title: "Dasbor Admin | Mindsea",
  description: "Halaman dasbor untuk admin Mindsea.",
  openGraph: {
    title: "Dasbor Admin | Mindsea",
    description: "Halaman dasbor untuk admin Mindsea.",
  },
  twitter: {
    title: "Dasbor Admin | Mindsea",
    description: "Halaman dasbor untuk admin Mindsea.",
  },
};

export default function DasborAdmin() {
  return (
    <main className="pb-8">
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <Statistics />
      <QuickActions />
      <RecentActivities />
    </main>
  );
}
