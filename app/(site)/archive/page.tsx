import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, GitBranch } from 'lucide-react'
import { getByType } from '@/lib/content'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ArchiveEraMotif } from '@/components/archive-motif'
import { entryHref } from '@/lib/paths'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Thesis Archive',
  description:
    'A dated public record of original investment thinking, with retrospective commentary on what proved correct, what was underestimated, and what was learned.',
  alternates: { canonical: '/archive' },
}

export default async function ArchiveIndex() {
  const entries = await getByType('ARCHIVE')
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Thesis Archive' }]} />
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Thesis Archive</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          The most useful investment ideas are easier to evaluate when the original thinking is
          preserved. This archive keeps dated theses intact&mdash;alongside retrospective commentary on
          what happened, what proved correct, what was underestimated, and what was learned. Original
          material is never rewritten to appear more prescient.
        </p>
      </header>

      {entries.length > 0 ? (
        <div className="mt-12 space-y-5">
          {entries.map((e) => (
            <Link
              key={e.id}
              href={entryHref(e)}
              className="group block rounded-sm border border-border bg-card p-8 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex shrink-0 items-center gap-4 sm:w-32 sm:flex-col sm:items-start sm:gap-3">
                  <ArchiveEraMotif
                    slug={e.slug}
                    categoryName={e.category?.name}
                    className="h-11 w-11 shrink-0 text-primary/80 transition-colors group-hover:text-primary"
                  />
                  <div>
                    <div className="font-display text-4xl font-semibold leading-none text-primary" suppressHydrationWarning>
                      {e.originalPublicationDate ? formatDate(e.originalPublicationDate, { year: 'numeric' }) : ''}
                    </div>
                    {e.category && (
                      <div className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {e.category.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1 sm:border-l sm:border-border sm:pl-8">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary">{e.title}</h2>
                  {e.summary && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.summary}</p>}
                  {e.processContribution && (
                    <div className="mt-4 border-l-2 border-primary/30 pl-4">
                      <div className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary/80">
                        What It Added to My Process
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/80">{e.processContribution}</p>
                    </div>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read the thesis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-muted-foreground">Archive entries are being prepared and will appear here soon.</p>
      )}

      <div className="mt-14 rounded-sm border border-border bg-secondary/40 p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary">
              <GitBranch className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em]">See the through-line</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
              Evolution of an Investment Philosophy
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              How these dated observations compounded over time into the frameworks used today.
            </p>
          </div>
          <Link
            href="/frameworks/evolution-of-an-investment-philosophy"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View the Evolution <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
