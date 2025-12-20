export type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "accent";
  subtitle?: string;
};