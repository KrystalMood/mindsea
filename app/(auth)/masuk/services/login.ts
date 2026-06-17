import type { ChangeEvent } from "react";
import { API_AUTH_LOGIN } from "@/constants/route";
import axios from "axios";
import { UsersSchema } from "@/validators/users.schema";

export async function submit(e: ChangeEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  try {
  const payload: Record<"surel" | "kata_sandi", string> = {
    surel: formData.get("surel") as string,
    kata_sandi: formData.get("kata_sandi") as string,
  };

    // const response = await axios.post(API_AUTH_LOGIN, payload);
    const { data } = await axios.post<{ message: string; url?: string }>(API_AUTH_LOGIN, payload);

    if (!data || !data.url) {
      throw new Error("❌ Gagal mendapatkan informasi pengalihan setelah masuk.");
    }

    return window.location.assign(data.url);
  } catch (error: unknown) {
    console.error(`❌ Terjadi kesalahan saat masuk ke akun Anda: ${(error as Error).message}`);
    throw (error as Error).message;
  }
}
