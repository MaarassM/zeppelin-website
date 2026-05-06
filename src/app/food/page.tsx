import type { Metadata } from "next";
import Image from "next/image";
import { foodMenu } from "@/data/food";

export const metadata: Metadata = {
  title: "Jelovnik | Hrana na Plaži Pula | Zeppelin Beach",
  description:
    "Jelovnik Zeppelin Beacha — fast food, gelato, burgeri, sendviči, sladoled. Saccorgiana plaža, Pula.",
  keywords: ["jelovnik pula", "hrana plaža pula", "fast food pula", "sladoled pula", "zeppelin jelovnik"],
  alternates: { canonical: "https://zeppelinbar.com/food" },
  openGraph: {
    title: "Jelovnik | Hrana na Plaži Pula | Zeppelin Beach",
    description: "Jelovnik Zeppelin Beacha — fast food, gelato, burgeri, sendviči i sladoled. Saccorgiana plaža, Pula.",
    url: "https://zeppelinbar.com/food",
    siteName: "Zeppelin Beach Complex",
    images: [{ url: "https://zeppelinbar.com/assets/hero.jpg", width: 1280, height: 853, alt: "Jelovnik — Zeppelin Beach Pula" }],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jelovnik | Hrana na Plaži Pula | Zeppelin Beach",
    description: "Jelovnik Zeppelin Beacha — burgeri, sendviči, sladoled. Saccorgiana, Pula.",
    images: ["https://zeppelinbar.com/assets/hero.jpg"],
  },
};

export default function FoodPage() {
  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Hero */}
      <div className="bg-red px-6 py-14 text-center relative">
        <a
          href="/#gastro"
          className="absolute left-6 top-1/2 -translate-y-1/2 font-display text-white/60 text-[11px] tracking-[0.25em] uppercase hover:text-white transition-colors"
        >
          ← Natrag
        </a>
        <p className="font-display text-white/50 text-[11px] tracking-[0.35em] uppercase mb-3">
          Zeppelin Beach
        </p>
        <h1 className="font-display text-white text-5xl lg:text-6xl tracking-wide">
          JELOVNIK
        </h1>
      </div>

      {/* Sticky category nav */}
      <nav className="sticky top-16 bg-cream border-b border-border z-10">
        <div className="flex overflow-x-auto scrollbar-none px-6 lg:justify-center lg:px-10">
          {foodMenu.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="shrink-0 px-5 py-4 font-display text-[11px] tracking-[0.25em] uppercase text-muted hover:text-red border-b-2 border-transparent hover:border-red transition-colors whitespace-nowrap"
            >
              {cat.label_hr}
            </a>
          ))}
        </div>
      </nav>

      {/* Food sections */}
      <div className="py-12 max-w-2xl mx-auto flex flex-col gap-16">
        {foodMenu.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-32">
            {/* Category banner photo */}
            {cat.photo && (
              <div className="relative w-full h-52 lg:h-72 mb-6">
                <Image
                  src={cat.photo}
                  alt={cat.label_hr}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <h2 className="absolute bottom-5 left-6 font-display text-white text-4xl">
                  {cat.label_hr}
                </h2>
              </div>
            )}

            {!cat.photo && (
              <h2 className="font-display text-dark text-4xl mb-6 px-6 lg:px-0">
                {cat.label_hr}
              </h2>
            )}

            {/* Item grid */}
            <div className="grid grid-cols-2 gap-3 px-6 lg:px-0">
              {cat.items.map((item) => (
                <div
                  key={item.name_hr}
                  className="flex flex-col rounded-2xl overflow-hidden border border-border bg-white"
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/3] bg-border/15">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name_hr}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 320px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-[10px] tracking-widest uppercase text-border/70">
                          Foto
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name + price */}
                  <div className="px-4 py-3 flex items-end justify-between gap-2">
                    <span className="text-dark text-xs font-semibold leading-snug">
                      {item.name_hr}
                    </span>
                    <span className="font-display text-red text-xl shrink-0">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="border-t border-border py-10 text-center">
        <a
          href="/#gastro"
          className="font-display text-[11px] tracking-[0.3em] uppercase text-muted hover:text-dark transition-colors"
        >
          ← Natrag
        </a>
      </div>
    </div>
  );
}
