import Hero from "./components/hero";
import Table from "@/components/common/table";

const rows = [
  ["1", "Pengenalan JavaScript", "Pemula", "15 menit", "Edit"],
  ["2", "React Hooks Advanced", "Lanjutan", "30 menit", "Edit"],
  ["3", "Database MySQL", "Menengah", "25 menit", "Edit"],
  ["4", "TypeScript Fundamentals", "Pemula", "20 menit", "Edit"],
  ["5", "Next.js App Router", "Menengah", "35 menit", "Edit"],
  ["6", "Prisma ORM", "Menengah", "28 menit", "Edit"],
  ["7", "Authentication & Security", "Lanjutan", "40 menit", "Edit"],
];

export default function Materi() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
        <Table
          headers={["No", "Judul Materi", "Tingkat", "Durasi", "Aksi"]}
          rows={rows}
          sortable={["Judul Materi", "Tingkat"]}
          itemsPerPage={5}
        />
      </section>
    </>
  );
}
