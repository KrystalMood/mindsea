import {
  BarChart3,
  CheckCircle,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

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
    label: "Total Soal",
    value: "15",
    icon: LayoutGrid,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-500",
    borderColor: "border-indigo-100",
  },
  {
    label: "Soal Selesai",
    value: "0 / 15",
    icon: CheckCircle,
    bgColor: "bg-teal-50",
    iconColor: "text-teal-500",
    borderColor: "border-teal-100",
  },
  {
    label: "Nilai Rata-rata",
    value: "0%",
    icon: BarChart3,
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
    borderColor: "border-red-100",
  },
];
