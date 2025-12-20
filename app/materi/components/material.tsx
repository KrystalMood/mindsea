import MaterialCard from "@/app/materi/atoms/material-card";
import { MaterialCard as IMaterialCard } from "@/app/materi/constants/themes";

interface MaterialProps {
  materials: IMaterialCard[];
  activeIndex?: number;
}

export default function Material({ materials, activeIndex }: MaterialProps) {
  if (materials.length === 0) {
    return (
      <section className="m-8 py-12 text-center">
        <p className="text-text-secondary">Belum ada materi tersedia</p>
      </section>
    );
  }
  return (
    <section className="m-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      {materials.map((material, index) => {
        const isActive = activeIndex === 4 + index;
        return (
          <MaterialCard
            key={material.id}
            id={material.id}
            title={material.title}
            description={material.description}
            difficulty={material.difficulty}
            colorTheme={material.colorTheme}
            audience={material.audience}
            isActive={isActive}
          />
        );
      })}
    </section>
  );
}
