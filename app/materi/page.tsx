import { Metadata } from "next";
import Client from "@/app/materi/client/material";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Materi | Mindsea",
  description: "Materi aplikasi Mindsea",
  openGraph: {
    title: "Materi | Mindsea",
    description: "Materi aplikasi Mindsea",
  },
  twitter: {
    title: "Materi | Mindsea",
    description: "Materi aplikasi Mindsea",
  },
};

export default function Materi() {
  return <Client />;
}