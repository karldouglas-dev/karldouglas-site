import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { EntryCard } from '@/lib/content'
import { entryHref } from '@/lib/paths'
import { formatDate, CONTENT_TYPE_LABEL } from '@/lib/format'

export function ContentCard({ entry, featured = false }: { entry: EntryCard; featured?: boolean }) {
  if (!entry) return null
  const href = entryHref(entry)
  const inDevelopment = entry.bodyPlaceholder
  const date = entry.publicationDate ?? entry.originalPublicationDate
  const meta: string[] = []
  if (entry.category?.name) meta.push(entry.category.name)
  // Never show a fabricated date for unpublished/in-development content.
  if (date && !inDevelopment)
    meta.push(
      entry.type === 'ARCHIVE'
        ? formatDate(date, { year: 'numeric' })
        : formatDate(date, { year: 'numeric', month: 'short', day: 'numeric' })
    )
  if (entry.readingTime && !inDevelopment) meta.push(`${entry.readingTime} min read`)

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-sm border border-border bg-card p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)]"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          {CONTENT_TYPE_LABEL[entry.type] ?? entry.type}
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <h3
        className={`mt-4 font-display font-semibold tracking-tight text-foreground ${
          featured ? 'text-2xl' : 'text-xl'
        }`}
      >
        {entry.title}
      </h3>

      {entry.summary && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
          {entry.summary}
        </p>
      )}

      {inDevelopment ? (
        <p className="mt-5">
          <span className="inline-flex items-center rounded-sm border border-dashed border-border bg-secondary/40 px-2 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
            In development
          </span>
        </p>
      ) : (
        meta.length > 0 && (
          <p className="mt-5 text-xs text-muted-foreground" suppressHydrationWarning>
            {meta.join('  ·  ')}
          </p>
        )
      )}
    </Link>
  )
}
