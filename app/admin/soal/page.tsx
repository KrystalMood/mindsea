import { Metadata } from "next";
import Hero from "./components/hero";
import Table from "@/components/common/table";

export const metadata: Metadata = {
  title: "Soal | Mindsea Admin",
  description: "Kelola soal-soal pada platform Mindsea Admin.",
  openGraph: {
    title: "Soal | Mindsea Admin",
    description: "Kelola soal-soal pada platform Mindsea Admin.",
  },
  twitter: {
    title: "Soal | Mindsea Admin",
    description: "Kelola soal-soal pada platform Mindsea Admin.",
  },
};

const rows = [
  ["1", "Soal Matematika Dasar", "Mudah", "10", "Edit"],
  ["2", "Soal Bahasa Indonesia", "Sedang", "15", "Edit"],
  ["3", "Soal IPA Terpadu", "Sulit", "20", "Edit"],
  ["4", "Soal Bahasa Inggris", "Mudah", "12", "Edit"],
  ["5", "Soal IPS", "Sedang", "18", "Edit"],
  ["6", "Soal PKN", "Mudah", "8", "Edit"],
  ["7", "Soal Seni Budaya", "Sedang", "10", "Edit"],
];

export default function Soal() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <section className="border-border mx-6 my-10 rounded-xl border bg-white p-6">
        <Table
          headers={["No", "Judul Soal", "Tingkat", "Jumlah", "Aksi"]}
          rows={rows}
          sortable={["Judul Soal", "Tingkat"]}
          itemsPerPage={5}
        />
      </section>
    </>
  );
}