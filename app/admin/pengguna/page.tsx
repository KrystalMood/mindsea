import Hero from "./components/hero";
import Table from "@/components/common/table";

const rows = [
  ["1", "John Doe", "10", "Edit"],
  ["2", "Jane Smith", "11", "Edit"],
  ["3", "John Doe", "10", "Edit"],
  ["4", "Jane Smith", "11", "Edit"],
  ["5", "John Doe", "10", "Edit"],
  ["6", "Jane Smith", "11", "Edit"],
];

export default function Pengguna() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
        <Table
          headers={["No", "Nama Siswa", "Kelas", "Aksi"]}
          rows={rows}
          sortable={["Nama Siswa"]}
          itemsPerPage={5}
        />
      </section>
    </>
  );
}
