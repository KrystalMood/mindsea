import { LuBookOpen } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="border-secondary/20 from-primary/5 to-secondary/5 mx-6 mt-6 flex flex-col gap-4 rounded-xl border bg-gradient-to-r p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
          <LuBookOpen size={24} />
        </div>
        <div>
          <h1 className="text-heading text-xl font-semibold">
            Kelola Materi
          </h1>
          <p className="text-text-secondary text-sm">
            Manajemen data materi Mindsea
          </p>
        </div>
      </div>
    </section>
  );
}
