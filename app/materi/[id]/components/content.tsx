"use client";

import { LuVolume2 } from "react-icons/lu";
import { MaterialDetail } from "../types";
import { LucideCheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ContentProps {
  material: MaterialDetail;
}

export default function Content({ material }: ContentProps) {
  const handleTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(material.konten);
      utterance.lang = "id-ID";
      speechSynthesis.speak(utterance);
    } else {
      alert("Browser tidak mendukung Text-to-Speech");
    }
  };

  return (
    <>
      {/* Main Content */}
      <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-heading text-lg font-semibold">Konten Materi</h2>
          <button
            onClick={handleTextToSpeech}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-100"
          >
            <LuVolume2 size={16} />
            Dengarkan
          </button>
        </div>

        <article className="prose prose-slate prose-headings:text-heading prose-p:text-text-secondary prose-a:text-primary prose-strong:text-heading prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm max-w-none">
          <ReactMarkdown>{material.konten}</ReactMarkdown>
        </article>
      </section>

      {/* Action Section */}
      <section className="mx-6 my-6">
        <button className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg">
          <LucideCheckCircle size={18} />
          Tandai Selesai
        </button>
      </section>
    </>
  );
}
