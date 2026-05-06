"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { Footer } from "@/components/layout/Footer";

export function PrivacyPageClient() {
  const { t } = useT();
  const p = t.privacy;

  return (
    <>
      <main className="bg-white min-h-screen pt-24 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[760px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm text-black/40 hover:text-black transition-colors"
            >
              ← Zeppelin Beach Complex
            </Link>
            <h1 className="font-display text-[34px] lg:text-[52px] leading-none text-black">
              {p.page_title}
            </h1>
            <p className="text-black/60 text-sm leading-relaxed">{p.intro}</p>
          </div>

          {[
            { heading: p.who_heading, body: p.who_body },
            { heading: p.data_heading, body: p.data_body },
            { heading: p.purpose_heading, body: p.purpose_body },
            { heading: p.retention_heading, body: p.retention_body },
            { heading: p.analytics_heading, body: p.analytics_body },
            { heading: p.cookies_heading, body: p.cookies_body },
            { heading: p.rights_heading, body: p.rights_body },
            { heading: p.contact_heading, body: p.contact_body },
          ].map(({ heading, body }) => (
            <section key={heading} className="flex flex-col gap-2">
              <h2 className="font-display text-[22px] leading-tight text-black">
                {heading}
              </h2>
              <p className="text-black/70 text-sm leading-relaxed">{body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
