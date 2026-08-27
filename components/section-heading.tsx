import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SectionHeading({
  eyebrow,
  title,
  cta,
}: {
  eyebrow?: string
  title: string
  cta?: { href: string; label: string }
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground sm:inline-flex"
        >
          {cta.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
