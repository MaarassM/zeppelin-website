import type { Metadata } from "next";
import { barMenu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Bar Menu | Zeppelin Beach",
  description:
    "Digitalni menu Zeppelin beach bara — kokteli, pivo, bezalkoholna pića i kava.",
};

export default function MenuPage() {
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
          BAR MENU
        </h1>
      </div>

      {/* Sticky category nav */}
      <nav className="sticky top-16 bg-cream border-b border-border z-10">
        <div className="flex overflow-x-auto px-6 lg:justify-center lg:px-10 scrollbar-none">
          {barMenu.map((cat) => (
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

      {/* Menu sections */}
      <div className="px-6 lg:px-10 py-12 max-w-xl mx-auto flex flex-col gap-14">
        {barMenu.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-32">
            <h2 className="font-display text-dark text-4xl mb-6">
              {cat.label_hr}
            </h2>
            <div className="flex flex-col divide-y divide-border/50">
              {cat.items.map((item) => (
                <div
                  key={item.name_hr}
                  className="flex items-center justify-between py-4 gap-4"
                >
                  <span className="text-dark text-sm leading-snug">
                    {item.name_hr}
                  </span>
                  <span className="font-display text-red text-xl shrink-0">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="border-t border-border py-10 text-center">
        <a
          href="./"
          className="font-display text-[11px] tracking-[0.3em] uppercase text-muted hover:text-dark transition-colors"
        >
          ← Nazad na stranicu
        </a>
      </div>
    </div>
  );
}
