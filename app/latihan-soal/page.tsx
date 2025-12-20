import { Metadata } from "next";
import Client from "@/app/latihan-soal/client/exercise";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latihan Soal | Mindsea",
  description: "Latihan soal aplikasi Mindsea",
  openGraph: {
    title: "Latihan Soal | Mindsea",
    description: "Latihan soal aplikasi Mindsea",
  },
  twitter: {
    title: "Latihan Soal | Mindsea",
    description: "Latihan soal aplikasi Mindsea",
  },
};

export default function Latihan() {
  return <Client />;
}
