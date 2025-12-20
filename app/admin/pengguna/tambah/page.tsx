import Hero from "./components/hero";
import Form from "./components/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Pengguna | Mindsea",
  description: "Halaman tambah pengguna untuk admin Mindsea.",
  openGraph: {
    title: "Tambah Pengguna | Mindsea",
    description: "Halaman tambah pengguna untuk admin Mindsea.",
  },
  twitter: {
    title: "Tambah Pengguna | Mindsea",
    description: "Halaman tambah pengguna untuk admin Mindsea.",
  },
};

export default function TambahPengguna() {
  return (
    <>
      <Hero />
      <Form />
    </>
  );
}
