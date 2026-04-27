import type { Metadata } from "next";
import { CareersForm } from "@/components/forms/CareersForm";

export const metadata: Metadata = {
  title: "Karijere | Zeppelin Beach",
  description: "Prijavi se za sezonu i radi na najljepšoj plaži u Puli.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Hero */}
      <div className="bg-red px-6 py-14 text-center relative">
        <a
          href="./"
          className="absolute left-6 top-1/2 -translate-y-1/2 font-display text-white/60 text-[11px] tracking-[0.25em] uppercase hover:text-white transition-colors"
        >
          ← Natrag
        </a>
        <p className="font-display text-white/50 text-[11px] tracking-[0.35em] uppercase mb-3">
          Zeppelin Beach
        </p>
        <h1 className="font-display text-white text-5xl lg:text-6xl tracking-wide">
          KARIJERE
        </h1>
      </div>

      {/* Form */}
      <div className="px-6 py-12 max-w-[680px] mx-auto">
        <CareersForm />
      </div>
    </div>
  );
}
