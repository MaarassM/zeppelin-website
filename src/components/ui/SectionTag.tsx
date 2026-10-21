import { cn } from '@/lib/utils'

interface SectionTagProps {
  children: string
  light?: boolean
  className?: string
}

export function SectionTag({ children, light = false, className }: SectionTagProps) {
  return (
    <p className={cn(
      'inline-flex self-start items-center rounded-full px-3.5 py-1.5 font-display text-[11px] tracking-[0.22em] uppercase',
      light ? 'bg-white/12 text-white ring-1 ring-inset ring-white/20' : 'bg-red/10 text-red',
      className
    )}>
      {children}
    </p>
  )
}
