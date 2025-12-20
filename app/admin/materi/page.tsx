import Hero from "./components/hero";
import Table from "@/components/common/table";

const rows = [
  ["1", "Judul Materi", "Deskripsi", "Target", "Edit"],
  ["2", "Judul Materi", "Deskripsi", "Target", "Edit"],
  ["3", "Judul Materi", "Deskripsi", "Target", "Edit"],
  ["4", "Judul Materi", "Deskripsi", "Target", "Edit"],
  ["5", "Judul Materi", "Deskripsi", "Target", "Edit"],
  ["6", "Judul Materi", "Deskripsi", "Target", "Edit"],
  ["7", "Judul Materi", "Deskripsi", "Target", "Edit"],
];

export default function Materi() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <section className="m-6">
        <Table headers={["No", "Judul Materi", "Deskripsi", "Target", "Aksi"]} rows={rows} sortable={["Judul Materi"]} itemsPerPage={5} />
      </section>
    </>
  );
}
