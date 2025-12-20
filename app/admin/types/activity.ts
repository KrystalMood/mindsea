export type Activity = {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "user" | "content" | "comment";
};
