import {
  BookOpen,
  CheckCircle,
  Target,
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
    label: "Materi Dipelajari",
    value: "5 / 10",
    icon: BookOpen,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-100",
  },
  {
    label: "Latihan Selesai",
    value: "8 / 15",
    icon: CheckCircle,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-100",
  },
  {
    label: "Nilai Rata-rata",
    value: "85%",
    icon: Target,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-100",
  }
];
