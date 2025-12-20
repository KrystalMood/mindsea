import { Metadata } from "next";
import Client from "@/app/progres-belajar/client/progress";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Progres Belajar | Mindsea",
  description: "Progres belajar aplikasi Mindsea",
  openGraph: {
    title: "Progres Belajar | Mindsea",
    description: "Progres belajar aplikasi Mindsea",
  },
  twitter: {
    title: "Progres Belajar | Mindsea",
    description: "Progres belajar aplikasi Mindsea",
  },
};

export default function ProgresBelajar() {
  return <Client />;
}
