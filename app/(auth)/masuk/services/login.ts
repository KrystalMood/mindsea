import type { ChangeEvent } from "react";
import { API_AUTH_LOGIN } from "@/constants/route";
import axios from "axios";

export async function submit(e: ChangeEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  try {
    const payload: Record<"surel" | "kata_sandi", string> = {
      surel: String(formData.get("surel") ?? ""),
      kata_sandi: String(formData.get("kata_sandi") ?? ""),
    };

    const { data } = await axios.post<{ message: string; url?: string }>(
      API_AUTH_LOGIN,
      payload
    );

    if (!data?.url) {
      throw new Error("Gagal mendapatkan informasi pengalihan setelah masuk.");
    }

    window.location.assign(data.url);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat masuk ke akun Anda.";

    console.error(`❌ Terjadi kesalahan saat masuk ke akun Anda: ${message}`);
    throw new Error(message);
  }
}
