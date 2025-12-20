export interface GeneratedMaterial {
  id: string;
  text: string;
  model: string;
  title: string;
}

export interface FormData {
  prompt: string;
  title: string;
  audience: string;
}

export const KELAS_OPTIONS = [
  { value: "", label: "Pilih kelas..." },
  { value: "Kelas 1 SD", label: "Kelas 1 SD" },
  { value: "Kelas 2 SD", label: "Kelas 2 SD" },
  { value: "Kelas 3 SD", label: "Kelas 3 SD" },
  { value: "Kelas 4 SD", label: "Kelas 4 SD" },
  { value: "Kelas 5 SD", label: "Kelas 5 SD" },
  { value: "Kelas 6 SD", label: "Kelas 6 SD" },
];
