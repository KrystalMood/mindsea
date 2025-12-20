import Link from "next/link";
import { quickActions } from "../constants/quick-action";

export default function QuickActions() {
  return (
    <section className="mx-6 mt-6">
      <header className="mb-4">
        <h2 className="text-heading text-lg font-semibold">Aksi Cepat</h2>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={`group relative flex items-center gap-4 overflow-hidden rounded-xl bg-${action.gradient} cursor-pointer p-5 text-left text-white opacity-90 shadow-md transition-all hover:scale-[1.01] hover:shadow-lg`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              {action.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">{action.title}</h3>
              <p className="text-sm text-white/80">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
