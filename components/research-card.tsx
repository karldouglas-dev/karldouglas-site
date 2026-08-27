import Link from 'next/link'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { EntryCard } from '@/lib/content'
import { entryHref } from '@/lib/paths'
import { formatDate } from '@/lib/format'

// Compact publication-card layout for Research. Deliberately lighter than the
// premium ContentCard used for original Thinking pieces, so the two content
// tiers read as visually distinct.
export function ResearchCard({ entry }: { entry: EntryCard }) {
  if (!entry) return null
  const href = entryHref(entry)
  const inDevelopment = entry.bodyPlaceholder
  const date = entry.publicationDate ?? entry.originalPublicationDate

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-sm border border-border border-l-2 border-l-primary/50 bg-card px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:border-l-primary hover:shadow-[var(--shadow-sm)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-primary">
          Research{entry.category?.name ? ` · ${entry.category.name}` : ''}
        </span>
        {!inDevelopment && date && (
          <span className="shrink-0 text-xs text-muted-foreground" suppressHydrationWarning>
            {formatDate(date, { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
        {entry.title}
      </h3>

      {entry.summary && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {entry.summary}
        </p>
      )}

      {entry.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.slice(0, 3).map((t) => (
            <span
              key={t.id}
              className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[0.68rem] text-muted-foreground"
            >
              {t.name}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/70 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary/70" aria-hidden="true" />
          Reviewed by Karl B. Douglas
        </span>
        {inDevelopment ? (
          <span className="shrink-0 text-[0.68rem] font-medium uppercase tracking-wider text-muted-foreground">
            In development
          </span>
        ) : (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        )}
      </div>
    </Link>
  )
}
