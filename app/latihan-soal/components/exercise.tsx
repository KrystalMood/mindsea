import ExerciseCard from "@/app/latihan-soal/atoms/exercise-card";

export default function Exercise() {
  return (
    <section className="m-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ExerciseCard
        id="1"
        title="Matematika Dasar"
        description="Pengenalan konsep matematika dasar"
        difficulty="Mudah"
        colorTheme="green"
      />
      <ExerciseCard
        id="2"
        title="Ilmu Pengetahuan Alam"
        description="Pengenalan konsep ilmu pengetahuan alam"
        difficulty="Sulit"
        colorTheme="red"
      />
    </section>
  );
}
