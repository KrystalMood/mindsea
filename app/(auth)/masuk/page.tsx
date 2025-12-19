import type { Metadata } from "next";
import Form from "@/app/(auth)/masuk/components/form";
import Slider from "@/app/(auth)/masuk/components/slider";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Masuk | Mindsea",
  description: "",
  openGraph: {
    title: "Masuk | Mindsea",
    description: "",
  },
  twitter: {
    title: "Masuk | Mindsea",
    description: "",
  },
};

export default function Masuk() {
  return (
    <main className="bg-background flex min-h-screen w-full">
      <Form />
      <Slider />
    </main>
  );
}