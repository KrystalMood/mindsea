import { Peran } from "@/lib/generated/prisma";
import { z } from "zod";

const kelasSchema = z.preprocess(
  (value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    if (typeof value === "string") {
      return Number(value);
    }

    return value;
  },
  z
    .number({ error: "Kelas harus berupa angka." })
    .int({ message: "Kelas harus berupa angka bulat." })
    .min(1, { message: "Kelas minimal 1 SD." })
    .max(6, { message: "Kelas maksimal 6 SD." })
    .nullable()
    .optional(),
);

export const UsersSchema = z
  .object({
    nama: z
      .string({ error: "Nama harus berupa kalimat." })
      .min(3, { message: "Nama harus memiliki minimal 3 karakter." })
      .max(50, { message: "Nama tidak boleh lebih dari 50 karakter." })
      .nonempty({ message: "Nama tidak boleh kosong." })
      .trim(),
    surel: z
      .email({ message: "Surel tidak valid." })
      .nonempty({ message: "Surel tidak boleh kosong." })
      .trim(),
    kata_sandi: z
      .string({ error: "Kata sandi harus berupa kalimat." })
      .min(7, { message: "Kata sandi harus memiliki minimal 7 karakter." })
      .max(100, { message: "Kata sandi tidak boleh lebih dari 100 karakter." })
      .nonempty({ message: "Kata sandi tidak boleh kosong." })
      .trim(),
    peran: z.enum(Object.values(Peran as unknown as [string, ...string[]]), {
      error: "Peran tidak valid.",
    }),
    kelas: kelasSchema,
  })
  .superRefine((data, ctx) => {
    if (data.peran === "SISWA" && typeof data.kelas !== "number") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["kelas"],
        message: "Kelas wajib diisi untuk siswa.",
      });
    }
  });
