import { Peran } from "@/lib/generated/prisma";
type User = {
  no: number;
  id: string;
  nama: string;
  surel: string;
  peran: Peran;
  kelas: number | null;
  created_at: Date;
};
export default User;
