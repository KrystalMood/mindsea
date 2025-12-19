import type { Metadata } from "next";
import Form from "@/app/(auth)/masuk/components/form";
import Slider from "@/app/(auth)/masuk/components/slider";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daftar | Mindsea",
  description: "",
  openGraph: {
    title: "Daftar | Mindsea",
    description: "",
  },
  twitter: {
    title: "Daftar | Mindsea",
    description: "",
  },
};

export default function Daftar() {
  return (
    <main className="bg-background flex min-h-screen w-full">
      <Form />
      <Slider />
    </main>
  );
}