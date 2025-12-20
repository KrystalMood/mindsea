import { type LucideIcon } from "lucide-react";

type Stats = {
  label: string;
  value: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  borderColor: string;
};

interface StatsData {
  totalMateri: number;
  materiSelesai: number;
  progress: number;
}

export type { Stats, StatsData };