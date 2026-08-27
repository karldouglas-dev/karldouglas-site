'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/thinking', label: 'Thinking' },
  { href: '/frameworks', label: 'Frameworks' },
  { href: '/archive', label: 'Thesis Archive' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/watch', label: 'Watch' },
]

export function SiteHeader() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
          Karl B. Douglas
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-foreground ${
                isActive(item.href)
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-sm p-2 text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/70 bg-background md:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-2 sm:px-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-border/50 py-3 text-sm last:border-0 ${
                  isActive(item.href) ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
