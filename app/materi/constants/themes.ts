export type Kesulitan = "Mudah" | "Sedang" | "Sulit";

export type MaterialCard = {
  id: string;
  title: string;
  description: string;
  difficulty: Kesulitan;
  colorTheme: "green" | "blue" | "red" | "yellow";
  audience?: string | null;
};

export const themes: Record<
  string,
  {
    border: string;
    bg: string;
    icon: string;
    btn: string;
    shadow: string;
    ring: string;
  }
> = {
  green: {
    border: "border-emerald-100",
    bg: "bg-emerald-50",
    icon: "bg-emerald-100 text-emerald-600",
    btn: "bg-emerald-500",
    shadow: "hover:shadow-emerald-100",
    ring: "ring-emerald-400",
  },
  blue: {
    border: "border-blue-100",
    bg: "bg-blue-50",
    icon: "bg-blue-100 text-blue-600",
    btn: "bg-blue-500",
    shadow: "hover:shadow-blue-100",
    ring: "ring-blue-400",
  },
  red: {
    border: "border-red-100",
    bg: "bg-red-50",
    icon: "bg-red-100 text-red-600",
    btn: "bg-red-500",
    shadow: "hover:shadow-red-100",
    ring: "ring-red-400",
  },
  yellow: {
    border: "border-yellow-100",
    bg: "bg-yellow-50",
    icon: "bg-yellow-100 text-yellow-600",
    btn: "bg-yellow-500",
    shadow: "hover:shadow-yellow-100",
    ring: "ring-yellow-400",
  },
};
