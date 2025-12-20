import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cookies as cookieStore } from "next/headers";
import type { ReactNode } from "react";
import { USER_INFO } from "@/constants/route";
import { ClientLayout as Auth } from "@/layouts/auth";
import { Peran } from "@/lib/generated/prisma";
import "@/app/globals.css";

const fonts = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: "/images/favicon.ico",
  metadataBase: new URL("https://mindsea.vercel.app/"),
  openGraph: {
    images: "/images/favicon.ico",
    url: "https://mindsea.vercel.app",
    siteName: "Mindsea",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    images: "/images/favicon.ico",
    card: "summary_large_image",
    site: "https://mindsea.vercel.app",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const role = (await cookieStore()).get(USER_INFO)?.value as Peran;

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`scroll-py-10 ${fonts.variable} max-[8192px]:opacity-0 max-[3120px]:m-0 max-[3120px]:box-border max-[3120px]:p-0 max-[3120px]:font-['Plus_Jakarta_Sans',Times,sans-serif,serif] max-[3120px]:opacity-100 max-[324px]:hidden`}>
      <body className="flex h-full min-h-screen flex-col overflow-x-hidden">
        <Auth role={role}>{children}</Auth>
      </body>
    </html>
  );
}