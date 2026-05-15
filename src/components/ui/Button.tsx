import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'outline-dark' | 'solid-red' | 'cream'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, as: Tag = 'button', href, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-display tracking-widest transition-colors cursor-pointer rounded-lg'
    const sizes = {
      sm: 'px-5 py-2.5 text-xs',
      md: 'px-8 py-3.5 text-sm',
      lg: 'px-10 py-4 text-base',
    }
    const variants = {
      primary:        'bg-white text-red hover:bg-white/90',
      outline:        'border-2 border-white text-white hover:bg-white/10',
      'outline-dark': 'border-2 border-red text-red hover:bg-red hover:text-white',
      'solid-red':    'bg-red text-white hover:bg-red/90',
      cream:          'bg-cream text-red hover:bg-cream/90',
    }

    if (Tag === 'a') {
      return (
        <a
          href={href}
          className={cn(base, sizes[size], variants[variant], className)}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
