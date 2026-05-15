"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface PdfModalProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function PdfModal({ src, isOpen, onClose, title = "Menu" }: PdfModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full h-full max-w-3xl mx-auto my-6 lg:my-10 bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-red shrink-0">
          <span className="font-display text-white tracking-widest text-sm uppercase">
            {title}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* PDF viewer */}
        <iframe
          src={src}
          className="flex-1 w-full border-none"
          title={`${title} PDF`}
        />
      </div>
    </div>
  );
}
