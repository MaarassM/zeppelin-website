'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import hr from '@/messages/hr.json'
import en from '@/messages/en.json'

type Locale = 'hr' | 'en'
type Messages = typeof hr

interface LocaleContextValue {
  locale: Locale
  t: Messages
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const messages: Record<Locale, Messages> = { hr, en }

export function LocaleProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [locale, setLocaleState] = useState<Locale>('hr')

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored === 'hr' || stored === 'en') setLocaleState(stored)
  }, [])

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
