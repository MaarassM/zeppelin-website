'use client'

import Image from 'next/image'
import { Camera, Phone, MessageCircle } from 'lucide-react'
import { useT } from '@/lib/i18n'

export function Footer() {
  const { t } = useT()

  return (
    <footer className="bg-red pt-12 pb-8 px-6 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10 border-b border-white/15">

          <div className="flex flex-col gap-4">
            <Image
              src="/assets/logo.png"
              alt="Zeppelin Beach Complex"
              width={140}
              height={48}
              className="h-10 w-auto invert self-start"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Beach & Lounge Bar<br />Saccorgiana Beach, Pula
            </p>
            <a
              href="https://instagram.com/zeppelinbar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <Camera size={16} />
              {t.footer.instagram}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white/50 text-xs tracking-widest font-semibold uppercase">
              {t.footer.hours_title}
            </p>
            <p className="text-white/85 text-sm leading-relaxed">
              {t.footer.hours_bar}<br />{t.footer.hours_sports}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white/50 text-xs tracking-widest font-semibold uppercase">
              {t.footer.contact_title}
            </p>
            <a href="tel:+385912545117" className="flex items-center gap-2 text-white/85 hover:text-white text-sm transition-colors">
              <Phone size={15} />
              {t.footer.phone}
            </a>
            <a href="https://wa.me/385912545117" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/85 hover:text-white text-sm transition-colors">
              <MessageCircle size={15} />
              {t.footer.whatsapp}
            </a>
          </div>

        </div>

        <p className="text-white/35 text-xs text-center pt-6">{t.footer.copyright}</p>
      </div>
    </footer>
  )
}
