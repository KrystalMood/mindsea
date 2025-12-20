import { Metadata } from "next";
import Client from "@/app/latihan-soal/client/exercise";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latihan | Mindsea",
  description: "Latihan aplikasi Mindsea",
  openGraph: {
    title: "Latihan | Mindsea",
    description: "Latihan aplikasi Mindsea",
  },
  twitter: {
    title: "Latihan | Mindsea",
    description: "Latihan aplikasi Mindsea",
  },
};

export default function Latihan() {
  return <Client />;
}