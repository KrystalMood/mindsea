import MaterialCard from "@/app/materi/atoms/material-card";

export default function Material({ activeIndex }: { activeIndex: number }) {
  return (
    <section className="m-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className={activeIndex === 4 ? "ring-4 ring-green-400 rounded-3xl" : ""}>
        <MaterialCard
          title="Matematika Dasar"
          description="Pengenalan konsep matematika dasar"
          difficulty="Mudah"
          colorTheme="green"
        />
      </div>
      <div className={activeIndex === 5 ? "ring-4 ring-red-400 rounded-3xl" : ""}>
        <MaterialCard
          title="Ilmu Pengetahuan Alam"
          description="Pengenalan konsep ilmu pengetahuan alam"
          difficulty="Sulit"
          colorTheme="red"
        />
      </div>
    </section>
  );
}