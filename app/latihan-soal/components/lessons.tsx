import ExerciseCard from "../atoms/exercise-card";

export default function Lessons({
  data,
  activeIndex,
}: {
  data: { judul: string; deskripsi: string }[];
  activeIndex: number;
}) {
  return (
    <section className="mx-8 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      {data.map((exercise, index) => {
        const isActive = activeIndex === 4 + index;
        const theme = index % 2 === 0 ? "blue" : "orange"; // Alternate themes

        return (
          <ExerciseCard
            key={index}
            index={index}
            title={exercise.judul}
            description={exercise.deskripsi}
            theme={theme}
            isActive={isActive}
          />
        );
      })}
    </section>
  );
}
