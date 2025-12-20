import { Book, Pencil, type LucideIcon } from "lucide-react";
import { STUDENT_MATERIAL, STUDENT_QUIZZES } from "@/constants/route";

type Lessons = {
  title: string;
  description: string;
  icon: LucideIcon;
  url: string;
};

export const lessons: Lessons[] = [
  {
    title: "Materi Belajar",
    description: "Pilih materi yang ingin kamu pelajari hari ini",
    icon: Book,
    url: STUDENT_MATERIAL,
  },
  {
    title: "Latihan Soal",
    description: "Uji kemampuanmu dengan latihan soal interaktif",
    icon: Pencil,
    url: STUDENT_QUIZZES,
  }
];