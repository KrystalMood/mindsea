import MaterialCard from "@/app/materi/atoms/material-card";

export default function Material() {
  return (
    <section className="m-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <MaterialCard
        title="Matematika Dasar"
        description="Pengenalan konsep matematika dasar"
        difficulty="Mudah"
        colorTheme="green"
      />
      <MaterialCard
        title="Ilmu Pengetahuan Alam"
        description="Pengenalan konsep ilmu pengetahuan alam"
        difficulty="Sulit"
        colorTheme="red"
      />
    </section>
  );
}