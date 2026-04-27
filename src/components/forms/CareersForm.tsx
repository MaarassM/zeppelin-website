'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, ArrowLeft, Wine, ChefHat, Waves, Anchor, Megaphone } from 'lucide-react'
import { useT } from '@/lib/i18n'

const POSITION_ICONS: Record<string, React.ReactNode> = {
  'Bar':                <Wine size={28} />,
  'Kuhinja':            <ChefHat size={28} />,
  'Kitchen':            <ChefHat size={28} />,
  'Sportski instruktor':<Waves size={28} />,
  'Sports instructor':  <Waves size={28} />,
  'Skipper':            <Anchor size={28} />,
  'Promocija':          <Megaphone size={28} />,
  'Promotion':          <Megaphone size={28} />,
}

const schema = z.object({
  name:  z.string().min(2, 'Obavezno'),
  phone: z.string().min(6, 'Obavezno'),
  email: z.string().email('Neispravan email'),
  notes: z.string().max(500).optional(),
})

type FormData = z.infer<typeof schema>

const inputCls = 'w-full h-12 px-4 bg-white border border-border rounded-lg text-sm text-dark focus:outline-none focus:ring-2 focus:ring-red/30'
const labelCls = 'text-xs font-semibold text-muted tracking-wide uppercase'

export function CareersForm() {
  const { t } = useT()
  const [position, setPosition] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(_data: FormData) {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <CheckCircle size={48} className="text-red" />
        <p className="font-display text-dark text-2xl text-center">{t.careers.success_msg}</p>
      </div>
    )
  }

  if (!position) {
    return (
      <div className="flex flex-col gap-6">
        <p className="text-xs font-semibold text-muted tracking-wide uppercase text-center">
          {t.careers.position_select_heading}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {t.careers.position_options.map((opt: string, i: number) => {
            const isLast = i === t.careers.position_options.length - 1
            const isOdd  = t.careers.position_options.length % 2 !== 0
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setPosition(opt)}
                className={`group flex flex-col items-center justify-center gap-3 bg-white border border-border rounded-2xl px-4 py-8 hover:border-red hover:shadow-md transition-all duration-200 cursor-pointer ${isLast && isOdd ? 'col-span-2' : ''}`}
              >
                <span className="text-muted group-hover:text-red transition-colors">
                  {POSITION_ICONS[opt] ?? <Wine size={28} />}
                </span>
                <span className="font-display text-dark text-base tracking-wide group-hover:text-red transition-colors leading-tight text-center">
                  {opt}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <button
        type="button"
        onClick={() => setPosition(null)}
        className="flex items-center gap-2 text-xs font-semibold text-muted tracking-wide uppercase hover:text-red transition-colors cursor-pointer w-fit"
      >
        <ArrowLeft size={14} />
        {t.careers.back_btn}
      </button>

      <div className="bg-red/8 border border-red/20 rounded-xl px-5 py-4">
        <p className="text-xs font-semibold text-muted tracking-wide uppercase mb-1">{t.careers.position_label}</p>
        <p className="font-display text-dark text-xl">{position}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>{t.careers.name_label}</label>
        <input {...register('name')} className={inputCls} />
        {errors.name && <p className="text-red text-xs">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>{t.careers.phone_label}</label>
          <input {...register('phone')} type="tel" className={inputCls} />
          {errors.phone && <p className="text-red text-xs">{errors.phone.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>{t.careers.email_label}</label>
          <input {...register('email')} type="email" className={inputCls} />
          {errors.email && <p className="text-red text-xs">{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>{t.careers.cv_label}</label>
        <input
          type="file"
          accept=".pdf"
          className="text-sm text-dark file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red file:text-white file:text-xs file:font-display file:cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>{t.careers.notes_label}</label>
        <textarea
          {...register('notes')}
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 bg-white border border-border rounded-lg text-sm text-dark resize-none focus:outline-none focus:ring-2 focus:ring-red/30"
        />
      </div>

      <button
        type="submit"
        className="h-14 bg-red text-white font-display text-sm tracking-widest rounded-lg hover:bg-red-dark transition-colors cursor-pointer mt-2"
      >
        {t.careers.submit_btn.toUpperCase()}
      </button>
    </form>
  )
}
