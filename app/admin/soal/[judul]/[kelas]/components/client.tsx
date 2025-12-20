"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LuCheck, LuPencil, LuTrash2, LuX, LuSave, LuArrowLeft } from "react-icons/lu";
import Link from "next/link";

type Question = {
  id_pertanyaan: string;
  teks_pertanyaan: string;
  pilihan: any;
  jawaban_benar: string;
  judul: string | null;
  kelas: number | null;
};

type Props = {
  questions: Question[];
  judul: string;
  kelas: number;
};

export default function ViewEditClient({ questions: initialQuestions, judul, kelas }: Props) {
  const router = useRouter();
  const [questions, setQuestions] = useState(initialQuestions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleEdit = (question: Question) => {
    setEditingId(question.id_pertanyaan);
    setEditData({
      teks_pertanyaan: question.teks_pertanyaan,
      pilihan: question.pilihan,
      jawaban_benar: question.jawaban_benar,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = async (id: string) => {
    try {
      await axios.put("/api/admin/soal", {
        id_pertanyaan: id,
        teks_pertanyaan: editData.teks_pertanyaan,
        pilihan: editData.pilihan,
        jawaban_benar: editData.jawaban_benar,
        judul,
        kelas,
      });

      // Update local state
      setQuestions(
        questions.map((q) =>
          q.id_pertanyaan === id
            ? { ...q, ...editData }
            : q
        )
      );

      setEditingId(null);
      setEditData({});
      alert("Soal berhasil diupdate!");
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Gagal mengupdate soal!");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) {
      return;
    }

    setDeleting(id);
    try {
      await axios.delete(`/api/admin/soal?id=${id}`);
      
      // Remove from local state
      const newQuestions = questions.filter((q) => q.id_pertanyaan !== id);
      
      if (newQuestions.length === 0) {
        // If no more questions, redirect to main page
        alert("Semua soal telah dihapus. Kembali ke halaman utama.");
        router.push("/admin/soal");
      } else {
        setQuestions(newQuestions);
        alert("Soal berhasil dihapus!");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Gagal menghapus soal!");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      
      {/* Header */}
      <header className="mx-6 mt-8 mb-6">
        <Link
          href="/admin/soal"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-4"
        >
          <LuArrowLeft size={16} />
          Kembali ke Daftar Soal
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            {judul}
          </h1>
          <p className="text-sm text-slate-500">
            Kelas {kelas} SD • {questions.length} Soal
          </p>
        </div>
      </header>

      {/* Questions List */}
      <section className="mx-6 mb-10 space-y-4">
        {questions.map((question, index) => {
          const isEditing = editingId === question.id_pertanyaan;
          const isDeleting = deleting === question.id_pertanyaan;
          const pilihan = isEditing ? editData.pilihan : question.pilihan;

          return (
            <div
              key={question.id_pertanyaan}
              className="border-border rounded-xl border bg-white p-6"
            >
              {/* Question Number & Actions */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-semibold text-blue-600">
                  Soal #{index + 1}
                </span>
                {!isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(question)}
                      className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100"
                    >
                      <LuPencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(question.id_pertanyaan)}
                      disabled={isDeleting}
                      className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                    >
                      <LuTrash2 size={14} />
                      {isDeleting ? "Menghapus..." : "Hapus"}
                    </button>
                  </div>
                )}
              </div>

              {/* Question Text */}
              <div className="mb-4">
                <label className="text-xs font-medium text-slate-500 mb-2 block">
                  Pertanyaan
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.teks_pertanyaan}
                    onChange={(e) =>
                      setEditData({ ...editData, teks_pertanyaan: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-slate-700">{question.teks_pertanyaan}</p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 mb-4">
                <label className="text-xs font-medium text-slate-500 mb-2 block">
                  Pilihan Jawaban
                </label>
                {["a", "b", "c", "d"].map((key) => {
                  const isCorrect = isEditing 
                    ? editData.jawaban_benar === key 
                    : question.jawaban_benar === key;

                  return (
                    <div
                      key={key}
                      className={`flex items-start gap-3 rounded-lg border p-3 ${
                        isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      {isEditing && (
                        <input
                          type="radio"
                          name={`correct-${question.id_pertanyaan}`}
                          checked={editData.jawaban_benar === key}
                          onChange={() =>
                            setEditData({ ...editData, jawaban_benar: key })
                          }
                          className="mt-0.5"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase text-slate-600">
                            {key}.
                          </span>
                          {isCorrect && !isEditing && (
                            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                              <LuCheck size={14} />
                              Jawaban Benar
                            </span>
                          )}
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            value={pilihan[key]}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                pilihan: { ...pilihan, [key]: e.target.value },
                              })
                            }
                            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-sm text-slate-700">{pilihan[key]}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Edit Actions */}
              {isEditing && (
                <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <LuX size={16} />
                    Batal
                  </button>
                  <button
                    onClick={() => handleSave(question.id_pertanyaan)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <LuSave size={16} />
                    Simpan
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}
