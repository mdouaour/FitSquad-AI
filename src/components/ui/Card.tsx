import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  glow?: 'orange' | 'purple' | 'green' | null
}

export default function Card({ children, glow, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-[#13131A] border border-[#1E1E2E] rounded-2xl',
        {
          'shadow-[0_0_20px_rgba(255,107,53,0.15)]': glow === 'orange',
          'shadow-[0_0_20px_rgba(123,47,190,0.15)]': glow === 'purple',
          'shadow-[0_0_20px_rgba(0,214,143,0.15)]': glow === 'green',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
