import {
  LuActivity,
  LuUserPlus,
  LuFileText,
  LuMessageSquare,
} from "react-icons/lu";
import { Activity } from "../types/activity";
import { activities } from "../constants/activities";

function getIcon(type: Activity["type"]) {
  const icons = {
    user: <LuUserPlus size={18} />,
    content: <LuFileText size={18} />,
    comment: <LuMessageSquare size={18} />,
  };
  return icons[type];
}

function getIconBg(type: Activity["type"]) {
  const colors = {
    user: "bg-primary/10 text-primary",
    content: "bg-secondary/10 text-secondary",
    comment: "bg-accent/10 text-accent",
  };
  return colors[type];
}

export default function RecentActivities() {
  return (
    <section className="mx-6 mt-6">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LuActivity size={20} className="text-primary" />
          <h2 className="text-heading text-lg font-semibold">
            Aktivitas Terbaru
          </h2>
        </div>
        <button className="text-primary text-sm hover:underline">
          Lihat Semua
        </button>
      </header>

      <div className="space-y-3">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="border-border flex items-center gap-4 rounded-xl border bg-white p-4 transition-all hover:shadow-sm"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getIconBg(activity.type)}`}
            >
              {getIcon(activity.type)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-heading font-medium">{activity.title}</h3>
              <p className="text-text-secondary truncate text-sm">
                {activity.description}
              </p>
            </div>
            <time className="text-text-secondary shrink-0 text-xs">
              {activity.time}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}
