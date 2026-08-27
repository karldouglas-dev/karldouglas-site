import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const safe = items ?? []
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {safe.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/70">{item.label}</span>
            )}
            {i < safe.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
