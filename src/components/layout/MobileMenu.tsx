'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { ArrowUpRight, X } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { trackOutbound } from '@/lib/analytics'
import { NAV_ITEMS } from './Header'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useT()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-dark/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-red shadow-2xl transition-[translate,visibility] duration-500 ease-out-expo ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Image src="/assets/logo-wordmark.png" alt="Zeppelin Beach & Lounge Bar" width={900} height={344} sizes="120px" className="h-10 w-auto" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-4 pt-8 sm:px-6">
          {NAV_ITEMS.map(({ key, href }, i) => (
            <a
              key={key}
              href={href}
              onClick={onClose}
              style={{ transitionDelay: open ? `${120 + i * 50}ms` : '0ms' }}
              className={`border-b border-white/15 py-4 font-display text-[40px] leading-none text-white transition-all duration-500 ease-out-expo hover:text-cream ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
              }`}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="mt-auto px-4 pb-8 sm:px-6">
          <a
            href="https://www.zeppelin-adventure.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { trackOutbound('header-cta'); onClose() }}
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-white font-display text-sm tracking-widest text-red transition-transform active:scale-[0.98]"
          >
            {t.nav.rezerviraj.toUpperCase()}
            <ArrowUpRight size={18} strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </>
  )
}
