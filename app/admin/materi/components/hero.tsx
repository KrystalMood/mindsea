import { BookOpen, LucidePlus } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="mx-6 mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="text-heading text-xl font-semibold">Kelola Materi</h1>
          <p className="text-text-secondary text-sm">
            Manajemen data materi Mindsea
          </p>
        </div>
      </div>

      <Link
        href="/admin/materi/tambah"
        className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all hover:shadow-md"
      >
        <LucidePlus size={18} />
        <span>Tambah Materi</span>
      </Link>
    </section>
  );
}