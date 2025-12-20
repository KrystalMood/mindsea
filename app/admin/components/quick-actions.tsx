"use client";

import { quickActions } from "@/app/admin/constants/quick-action";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function QuickActions() {
  return (
    <section className="mx-6 mt-10">
      <div className="mb-6 flex items-center gap-4">
        <i className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-sm">
          <Zap size={24} fill="currentColor" />
        </i>
        <span>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-800">
            Aksi Cepat
          </h2>
          <p className="text-xs font-medium text-slate-500">
            Akses instan untuk manajemen konten dan pengguna
          </p>
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="group relative flex items-center gap-4 rounded-lg border-2 border-dashed border-slate-200 bg-white p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50/30 hover:shadow-xl hover:shadow-indigo-100/50"
          >
            <i className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 shadow-inner transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
              {action.icon}
            </i>
            <span className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-700">
                {action.title}
              </h3>
              <p className="text-xs leading-relaxed font-medium text-slate-500">
                {action.description}
              </p>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}