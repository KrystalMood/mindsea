import { Prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Hero from "./components/hero";
import UserTable from "./components/user-table";

export const metadata: Metadata = {
  title: "Pengguna | Mindsea",
  description: "Halaman pengguna untuk admin Mindsea.",
  openGraph: {
    title: "Pengguna | Mindsea",
    description: "Halaman pengguna untuk admin Mindsea.",
  },
  twitter: {
    title: "Pengguna | Mindsea",
    description: "Halaman pengguna untuk admin Mindsea.",
  },
};

async function getUsers() {
  const users = await Prisma.pengguna.findMany({
    where: { aktif: true },
    select: {
      id_pengguna: true,
      nama: true,
      surel: true,
      peran: true,
      kelas: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return users.map((user, index) => ({
    no: index + 1,
    id: user.id_pengguna.toString(),
    nama: user.nama,
    surel: user.surel,
    peran: user.peran,
    kelas: user.kelas,
    created_at: user.created_at,
  }));
}

export default async function Pengguna() {
  const users = await getUsers();

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
        <UserTable users={users} />
      </section>
    </>
  );
}
