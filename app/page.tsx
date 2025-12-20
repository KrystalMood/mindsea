import { Metadata } from "next";
import { Prisma } from "@/lib/prisma";
import { cookies as cookieStore } from "next/headers";
import { USER_ID } from "@/constants/route";
import Client from "@/app/client/home";

export const metadata: Metadata = {
  title: "Beranda | Mindsea",
  description:
    "Platform pembelajaran interaktif untuk anak berkebutuhan khusus.",
  openGraph: {
    title: "Beranda | Mindsea",
    description:
      "Platform pembelajaran interaktif untuk anak berkebutuhan khusus.",
  },
  twitter: {
    title: "Beranda | Mindsea",
    description:
      "Platform pembelajaran interaktif untuk anak berkebutuhan khusus.",
  },
};

async function getStats() {
  const cookies = await cookieStore();
  const userIdStr = cookies.get(USER_ID)?.value;

  const totalMateri = await Prisma.materi_generated.count();
  let materiSelesai = 0;

  if (userIdStr) {
    materiSelesai = await Prisma.progres_materi.count({
      where: {
        id_pengguna: BigInt(userIdStr),
      },
    });
  }

  return {
    materiSelesai,
    totalMateri,
  };
}

export default async function Page() {
  const stats = await getStats();
  return <Client stats={stats} />;
}
