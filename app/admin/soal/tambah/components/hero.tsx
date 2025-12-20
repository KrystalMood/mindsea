import { LuBrain } from "react-icons/lu";

export default function Hero() {
  return (
    <header className="mx-6 mt-8 flex items-center gap-4">
      <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
        <LuBrain size={24} />
      </div>
      <div>
        <h1 className="text-heading text-xl font-semibold">
          Generate Soal dengan AI
        </h1>
        <p className="text-text-secondary text-sm">
          Buat soal pilihan ganda otomatis menggunakan AI
        </p>
      </div>
    </header>
  );
}
