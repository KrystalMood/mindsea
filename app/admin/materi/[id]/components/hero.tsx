import { LuBookOpen } from "react-icons/lu";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface HeroProps {
  title: string;
  description: string;
  backLink: string;
  backLabel: string;
}

export default function Hero({
  title,
  description,
  backLink,
  backLabel,
}: HeroProps) {
  return (
    <section className="border-secondary/20 from-primary/5 to-secondary/5 mx-6 mt-6 flex flex-col gap-4 rounded-xl border bg-gradient-to-r p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
          <LuBookOpen size={24} />
        </div>
        <div>
          <Link
            href={backLink}
            className="text-primary hover:text-primary/80 mb-1 inline-flex items-center gap-1 text-sm"
          >
            <ChevronLeft size={16} /> {backLabel}
          </Link>
          <h1 className="text-heading text-xl font-semibold">{title}</h1>
          <p className="text-text-secondary text-sm">{description}</p>
        </div>
      </div>
    </section>
  );
}
