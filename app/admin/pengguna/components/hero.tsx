import { LuUsers, LuPlus } from "react-icons/lu";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Hero Banner */}
      <section className="border-secondary/20 from-primary/5 to-secondary/5 mx-6 mt-6 flex flex-col gap-4 rounded-xl border bg-gradient-to-r p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
            <LuUsers size={24} />
          </div>
          <div>
            <h1 className="text-heading text-xl font-semibold">
              Kelola Pengguna
            </h1>
            <p className="text-text-secondary text-sm">
              Manajemen data pengguna Mindsea
            </p>
          </div>
        </div>

        {/* Tambah Pengguna */}
        <Link
          href="/admin/pengguna/tambah"
          className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all hover:shadow-md"
        >
          <LuPlus size={18} />
          <span>Tambah Pengguna</span>
        </Link>
      </section>
    </>
  );
}
