import { cn } from '@/lib/utils'

interface SectionTagProps {
  children: string
  light?: boolean
  className?: string
}

export function SectionTag({ children, light = false, className }: SectionTagProps) {
  return (
    <p className={cn(
      'font-display text-[11px] tracking-[0.3em] uppercase',
      light ? 'text-white/65' : 'text-red',
      className
    )}>
      {children}
    </p>
  )
}
