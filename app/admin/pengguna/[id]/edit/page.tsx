import Hero from "./components/hero";
import Form from "./components/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Pengguna | Mindsea",
  description: "Halaman edit pengguna untuk admin Mindsea.",
  openGraph: {
    title: "Edit Pengguna | Mindsea",
    description: "Halaman edit pengguna untuk admin Mindsea.",
  },
  twitter: {
    title: "Edit Pengguna | Mindsea",
    description: "Halaman edit pengguna untuk admin Mindsea.",
  },
};

export default function EditPengguna() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <Form />
    </>
  );
}
