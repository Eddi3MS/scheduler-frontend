'use client'
import type { ReactNode } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'

type AnimateOnViewProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  asChild?: boolean
}

export function AnimateOnView({
  children,
  className,
  delay = 0,
  direction = 'up',
  asChild,
}: AnimateOnViewProps) {
  const Comp = asChild ? Slot : 'p'

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-10'
      case 'down':
        return 'translate-y-[-20px]'
      case 'left':
        return 'translate-x-[-20px] md:translate-x-10'
      case 'right':
        return 'translate-x-[-20px]'
      case 'none':
        return ''
      default:
        return 'translate-y-5'
    }
  }

  return (
    <Comp
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out ',
        isIntersecting
          ? 'opacity-100 transform-none'
          : `opacity-0 ${getDirectionClasses()}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  )
}
