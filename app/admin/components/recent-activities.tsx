"use client";

import { LuActivity, LuArrowRight, LuFileText, LuMessageSquare, LuUserPlus } from "react-icons/lu";
import { activities } from "@/app/admin/constants/activities";
import { Activity } from "@/app/admin/types/activity";

function getIcon(type: Activity["type"]) {
  const icons = {
    user: <LuUserPlus size={20} />,
    content: <LuFileText size={20} />,
    comment: <LuMessageSquare size={20} />,
  };
  return icons[type];
}

function getIconStyles(type: Activity["type"]) {
  const styles = {
    user: "bg-blue-50 text-blue-600 border-blue-100",
    content: "bg-emerald-50 text-emerald-600 border-emerald-100",
    comment: "bg-orange-50 text-orange-600 border-orange-100",
  };
  return styles[type];
}

export default function RecentActivities() {
  return (
    <section className="mx-6 mt-10 mb-10">
      <article className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <i className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 shadow-sm">
            <LuActivity size={24} />
          </i>
          <span>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-800">
              Aktivitas Terbaru
            </h2>
            <p className="text-xs font-medium text-slate-500">
              Pantau interaksi pengguna secara real-time
            </p>
          </span>
        </div>
        <button className="group flex items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-700">
          Lihat Semua
          <LuArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </article>
      <div className="grid gap-3">
        {activities.map((activity) => (
          <article key={activity.id} className="group flex items-center gap-5 rounded-lg border border-slate-100 bg-white p-4 transition-all duration-300 hover:border-indigo-100 hover:shadow-lg hover:shadow-slate-200/40">
            <i className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${getIconStyles(activity.type)} transition-transform group-hover:scale-110`}>
              {getIcon(activity.type)}
            </i>
            <span className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-slate-800 transition-colors group-hover:text-indigo-600">
                {activity.title}
              </h3>
              <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
                {activity.description}
              </p>
            </span>
            <time className="shrink-0 rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-400">
              {activity.time}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}