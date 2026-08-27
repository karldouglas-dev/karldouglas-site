'use client'

import { useEffect, useRef } from 'react'

/**
 * ScrollReveal — a restrained, structure-communicating reveal. The element is only
 * hidden when JS is present AND the user has not requested reduced motion (guarded in
 * globals.css under `.js` + a no-preference media query), so it degrades to fully
 * visible with no flash when JS is off or motion is reduced.
 */
export function ScrollReveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode
  className?: string
  delayMs?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            io.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className ?? ''}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}
