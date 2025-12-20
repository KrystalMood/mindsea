"use client";

import { LuCopy, LuPencil } from "react-icons/lu";
import Link from "next/link";
import { Material, formatDate } from "../types";

interface ContentProps {
  material: Material;
}

export default function Content({ material }: ContentProps) {
  return (
    <>
      {/* Metadata Section */}
      <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
        <h2 className="text-heading mb-4 text-lg font-semibold">
          Informasi Materi
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Target Kelas:</span>
            <p className="text-heading font-medium">
              {material.audience || "Umum"}
            </p>
          </div>
          <div>
            <span className="text-text-secondary">Format:</span>
            <p className="text-heading font-medium">
              {material.format.toUpperCase()}
            </p>
          </div>
          <div>
            <span className="text-text-secondary">Model AI:</span>
            <p className="text-heading font-medium">{material.model}</p>
          </div>
          <div>
            <span className="text-text-secondary">Dibuat:</span>
            <p className="text-heading font-medium">
              {formatDate(material.created_at)}
            </p>
          </div>
        </div>

        <div className="border-border mt-4 border-t pt-4">
          <span className="text-text-secondary text-sm">Prompt:</span>
          <p className="text-heading mt-1 text-sm">{material.prompt}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
        <h2 className="text-heading mb-4 text-lg font-semibold">
          Konten Materi
        </h2>
        <pre className="border-border text-heading max-h-[500px] overflow-y-auto rounded-xl border bg-gray-50 p-4 text-sm whitespace-pre-wrap">
          {material.konten}
        </pre>
      </section>

      {/* Actions Section */}
      <section className="mx-6 my-6 flex gap-3">
        <button
          onClick={() => {
            navigator.clipboard.writeText(material.konten);
            alert("Konten berhasil disalin!");
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl shadow-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          <LuCopy size={16} />
          Salin Konten
        </button>
        <Link
          href={`/admin/materi/${material.id}/edit`}
          className="bg-primary hover:bg-primary/90 flex flex-1 items-center shadow-sm justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition-all hover:shadow-md"
        >
          <LuPencil size={16} />
          Edit Materi
        </Link>
      </section>
    </>
  );
}
