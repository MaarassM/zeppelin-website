'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { trackOutbound } from '@/lib/analytics'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { key: 'gastro' as const,   href: '/#gastro' },
  { key: 'beach' as const,    href: '/#action' },
  { key: 'lokacija' as const, href: '/#lokacija' },
  { key: 'karijere' as const, href: '/careers' },
]

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t, locale, setLocale } = useT()

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer — slides in from right */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-red flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-5 h-16">
          <Image src="/assets/logo.png" alt="Zeppelin Beach Complex" width={120} height={40} className="h-9 w-auto invert" />
          <button onClick={onClose} aria-label="Close menu" className="cursor-pointer">
            <X className="text-white" size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-5 pt-6">
          {NAV_ITEMS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={onClose}
              className="font-display text-white text-2xl py-3 border-b border-white/10 hover:opacity-75 transition-opacity"
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="mt-8 px-5 flex flex-col gap-4">
          <a
            href="https://www.zeppelin-adventure.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { trackOutbound('header-cta'); onClose() }}
            className="flex items-center justify-center h-12 border-2 border-white text-white font-display text-xs tracking-widest rounded-lg hover:bg-white/10 transition-colors"
          >
            {t.nav.rezerviraj.toUpperCase()}
          </a>
          <div className="flex gap-3">
            {(['hr', 'en'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`font-display text-sm px-3 py-1.5 rounded cursor-pointer transition-colors ${
                  locale === l ? 'bg-white text-red' : 'text-white/70 hover:text-white'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
