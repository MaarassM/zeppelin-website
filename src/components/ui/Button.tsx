import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'outline-dark' | 'solid-red' | 'cream' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, as: Tag = 'button', href, ...props }, ref) => {
    const base = 'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display tracking-widest transition-all duration-300 ease-out-expo cursor-pointer active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    const sizes = {
      sm: 'h-10 px-5 text-xs',
      md: 'h-12 px-7 text-sm',
      lg: 'h-14 px-9 text-sm lg:text-base',
    }
    const variants = {
      primary:        'bg-white text-red hover:bg-cream',
      outline:        'border-2 border-white text-white hover:bg-white hover:text-red',
      'outline-dark': 'border-2 border-red text-red hover:bg-red hover:text-white',
      'solid-red':    'bg-red text-white shadow-[0_10px_30px_-10px_rgba(214,31,60,0.7)] hover:bg-red-dark',
      cream:          'bg-cream text-red hover:bg-white',
      glass:          'bg-white/10 text-white ring-1 ring-inset ring-white/45 backdrop-blur-md hover:bg-white/20 hover:ring-white',
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
