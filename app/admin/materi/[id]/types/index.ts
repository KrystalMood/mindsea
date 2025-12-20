export interface Material {
  id: string;
  judul: string;
  prompt: string;
  konten: string;
  model: string;
  audience: string | null;
  format: string;
  created_at: string;
  updated_at: string;
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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
