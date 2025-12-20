import { Metadata } from "next";
import Client from "@/app/client/home";

export const metadata: Metadata = {
  title: "Beranda | Mindsea",
  description: "Platform pembelajaran interaktif untuk anak berkebutuhan khusus.",
  openGraph: {
    title: "Beranda | Mindsea",
    description: "Platform pembelajaran interaktif untuk anak berkebutuhan khusus.",
  },
  twitter: {
    title: "Beranda | Mindsea",
    description: "Platform pembelajaran interaktif untuk anak berkebutuhan khusus.",
  },
};

export default function Page() {
  return <Client />;
}