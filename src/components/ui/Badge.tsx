import clsx from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'orange' | 'purple' | 'green' | 'gray'
  className?: string
}

export default function Badge({ children, variant = 'gray', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        {
          'bg-[#FF6B35]/20 text-[#FF6B35]': variant === 'orange',
          'bg-[#7B2FBE]/20 text-[#7B2FBE]': variant === 'purple',
          'bg-[#00D68F]/20 text-[#00D68F]': variant === 'green',
          'bg-[#1E1E2E] text-gray-400': variant === 'gray',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
