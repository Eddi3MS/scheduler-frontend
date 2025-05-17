'use client'

import { useEffect, useState, useRef, type RefObject } from 'react'

type IntersectionObserverOptions = {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [RefObject<HTMLDivElement | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)

        if (entry.isIntersecting && triggerOnce && ref.current) {
          observer.unobserve(ref.current)
        }
      },
      { threshold, rootMargin }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isIntersecting]
}
