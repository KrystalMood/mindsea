"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuVolume2,
  LuLoader,
} from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import { MaterialDetail } from "../types";
import { LucideCheckCircle } from "lucide-react";

interface SlideContentProps {
  material: MaterialDetail;
}

function parseIntoSlides(markdown: string): string[] {
  const lines = markdown.split("\n");
  const slides: string[] = [];
  let currentSlide = "";
  let foundFirstHeader = false;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentSlide.trim()) {
        slides.push(currentSlide.trim());
      }
      currentSlide = line;
      foundFirstHeader = true;
    } else if (line.startsWith("# ") && !foundFirstHeader) {
      if (currentSlide.trim()) {
        slides.push(currentSlide.trim());
      }
      currentSlide = line;
      foundFirstHeader = true;
    } else {
      currentSlide += "\n" + line;
    }
  }

  if (currentSlide.trim()) {
    slides.push(currentSlide.trim());
  }

  return slides.length > 0 ? slides : [markdown];
}

export default function SlideContent({ material }: SlideContentProps) {
  const slides = parseIntoSlides(material.konten);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Check if already completed on mount
  useEffect(() => {
    const checkCompletion = async () => {
      try {
        const res = await fetch(`/api/student/materi/${material.id}/complete`);
        const data = await res.json();
        setIsCompleted(data.completed);
      } catch (error) {
        console.error("Error checking completion:", error);
      }
    };
    checkCompletion();
  }, [material.id]);

  const goNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, slides.length]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const handleTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const text = slides[currentSlide].replace(/[#*`]/g, "");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    } else {
      alert("Browser tidak mendukung Text-to-Speech");
    }
  };

  const handleMarkComplete = async () => {
    if (isCompleted || isCompleting) return;

    setIsCompleting(true);
    try {
      const res = await fetch(`/api/student/materi/${material.id}/complete`, {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok) {
        setIsCompleted(true);
        alert(data.message);
      } else {
        alert(data.error || "Gagal menandai selesai");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
      console.error("Error marking complete:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <section className="border-border mx-6 mt-6 rounded-xl border bg-white">
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <span className="text-text-secondary text-sm">
            Slide {currentSlide + 1} dari {slides.length}
          </span>
          <button
            onClick={handleTextToSpeech}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-100"
          >
            <LuVolume2 size={16} />
            Dengarkan
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary w-6"
                  : index < currentSlide
                    ? "bg-primary/50 w-2"
                    : "w-2 bg-gray-200"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide content */}
      <div className="relative min-h-[400px] overflow-hidden p-8">
        {/* Background */}
        <div className="from-primary/10 to-secondary/10 pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-tr from-orange-100 to-yellow-100 blur-2xl" />
        <div className="border-primary/10 pointer-events-none absolute top-1/2 right-8 h-24 w-24 -translate-y-1/2 rounded-full border" />
        <div className="border-secondary/10 pointer-events-none absolute bottom-8 left-1/4 h-16 w-16 rotate-45 rounded-lg border" />

        {/* Content frame */}
        <article className="prose prose-lg prose-slate prose-headings:text-heading prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-semibold prose-p:text-text-secondary prose-p:leading-relaxed prose-li:text-text-secondary prose-strong:text-heading prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 relative z-10 max-w-none rounded-2xl bg-white/80 p-6 backdrop-blur-sm">
          <ReactMarkdown>{slides[currentSlide]}</ReactMarkdown>
        </article>
      </div>

      {/* Navigation */}
      <div className="border-border flex items-center justify-between border-t p-4">
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <LuChevronLeft size={18} />
          Sebelumnya
        </button>

        <p className="text-text-secondary text-sm">
          Tekan ← → atau spasi untuk navigasi
        </p>

        {currentSlide === slides.length - 1 ? (
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted || isCompleting}
            className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              isCompleted
                ? "bg-emerald-100 text-emerald-700"
                : "bg-primary hover:bg-primary/90 text-white"
            } disabled:cursor-not-allowed`}
          >
            {isCompleting ? (
              <LuLoader size={18} className="animate-spin" />
            ) : (
              <LucideCheckCircle size={18} />
            )}
            {isCompleted ? "Sudah Selesai" : "Tandai Selesai"}
          </button>
        ) : (
          <button
            onClick={goNext}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition-all"
          >
            Selanjutnya
            <LuChevronRight size={18} />
          </button>
        )}
      </div>
    </section>
  );
}
