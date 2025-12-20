import { CheckCircle2, LayoutList, type LucideIcon, Star } from "lucide-react";
import { ComponentType, SVGProps } from "react";

type Stats = {
  label: string;
  value: string;
  subLabel: string;
  icon: ComponentType<SVGProps<SVGSVGElement>> | LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  btnColor: string;
  total?: string;
}

export const stats: Stats[] = [
  {
    label: "Materi Selesai",
    value: "0",
    subLabel: "materi telah dipelajari",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    btnColor: "bg-emerald-500/10 text-emerald-600",
  },
  {
    label: "Latihan Dikerjakan",
    value: "0",
    subLabel: "latihan diselesaikan",
    icon: LayoutList,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    btnColor: "bg-blue-500/10 text-blue-600",
  },
  {
    label: "Nilai Rata-rata",
    value: "0",
    total: "/100",
    subLabel: "dari total nilai",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-100",
    btnColor: "bg-yellow-500/10 text-yellow-600",
  },
];