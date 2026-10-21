'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import hr from '@/messages/hr.json'
import en from '@/messages/en.json'
import it from '@/messages/it.json'
import de from '@/messages/de.json'

export const LOCALES = [
  { code: 'hr', label: 'Hrvatski' },
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' },
  { code: 'de', label: 'Deutsch' },
] as const

export type Locale = (typeof LOCALES)[number]['code']
type Messages = typeof hr

interface LocaleContextValue {
  locale: Locale
  t: Messages
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const messages: Record<Locale, Messages> = { hr, en, it, de }

function isLocale(value: string | null): value is Locale {
  return LOCALES.some(l => l.code === value)
}

export function LocaleProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [locale, setLocaleState] = useState<Locale>('hr')

  useEffect(() => {
    const stored = localStorage.getItem('locale')
    if (isLocale(stored)) setLocaleState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem('locale', l)
  }

  return (
    <LocaleContext.Provider value={{ locale, t: messages[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useT() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useT must be used inside LocaleProvider')
  return ctx
}
