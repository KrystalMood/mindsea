import { BarChart3, CheckCircle, LayoutGrid, type LucideIcon } from "lucide-react";

type Stats = {
  label: string;
  value: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  borderColor: string;
};

export const stats: Stats[] = [
  {
    label: "Total Materi",
    value: "3",
    icon: LayoutGrid,
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
    borderColor: "border-red-100",
  },
  {
    label: "Materi Selesai",
    value: "0 / 3",
    icon: CheckCircle,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-100",
  },
  {
    label: "Progress Belajar",
    value: "0%",
    icon: BarChart3,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-100",
  },
];