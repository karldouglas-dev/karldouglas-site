import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, AlertTriangle, GraduationCap, Eye, Compass, History } from 'lucide-react'
import { getBySlug } from '@/lib/content'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Markdown } from '@/lib/markdown'
import { DisclosureBlock } from '@/components/disclosure-block'
import { PlaceholderNote } from '@/components/placeholder-note'
import { JsonLd } from '@/components/jsonld'
import { entryHref } from '@/lib/paths'
import { formatDate, isForthcoming } from '@/lib/format'
import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/site'
import { ArchiveEraMotif } from '@/components/archive-motif'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entry = await getBySlug(params.slug)
  if (!entry) return { title: 'Not found' }
  return {
    title: entry.seoTitle || entry.title,
    description: entry.metaDescription || entry.summary || undefined,
    alternates: { canonical: `/archive/${entry.slug}` },
    openGraph: { title: entry.title, description: entry.summary || undefined, type: 'article', url: `/archive/${entry.slug}` },
  }
}

function Retrospective({
  icon: Icon, label, value,
}: { icon: typeof CheckCircle2; label: string; value: string | null }) {
  return (
    <div className="rounded-sm border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{label}</h3>
      </div>
      <div className="mt-3">
        {isForthcoming(value) ? (
          <p className="text-sm italic text-muted-foreground">Retrospective commentary forthcoming.</p>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">{value}</p>
        )}
      </div>
    </div>
  )
}

export default async function ArchivePage({ params }: { params: { slug: string } }) {
  const entry = await getBySlug(params.slug)
  if (!entry || entry.type !== 'ARCHIVE') notFound()
  const related = [...(entry.relatedTo ?? []), ...(entry.relatedFrom ?? [])]
  const complianceHold = entry.complianceLevel === 'RED'

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: entry.title,
          url: absoluteUrl(`/archive/${entry.slug}`),
          mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/archive/${entry.slug}`) },
          author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: entry.author, url: SITE_URL },
          publisher: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME },
          datePublished: entry.originalPublicationDate ? new Date(entry.originalPublicationDate).toISOString() : undefined,
          description: entry.summary || undefined,
        }}
      />
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Thesis Archive', href: '/archive' }, { label: entry.title }]}
      />

      <div className="flex items-center gap-3 rounded-sm border border-border bg-secondary/50 px-4 py-2.5">
        <ArchiveEraMotif
          slug={entry.slug}
          categoryName={entry.category?.name}
          className="h-6 w-6 shrink-0 text-primary"
        />
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary">From the Archive</span>
        {entry.originalPublicationDate && (
          <span className="text-xs text-muted-foreground" suppressHydrationWarning>
            Originally written in {formatDate(entry.originalPublicationDate, { year: 'numeric' })}
          </span>
        )}
      </div>
      <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-[2.75rem]">
        {entry.title}
      </h1>

      {complianceHold && (
        <div className="mt-6 flex items-start gap-3 rounded-sm border border-amber-500/40 bg-amber-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Historical source &mdash; compliance review pending</p>
            <p className="mt-1 text-sm leading-relaxed text-amber-900/80">
              The full original article is retained internally and is not reproduced publicly while it
              undergoes compliance review. Only a compliance-safe thesis summary and historical context
              appear below. No performance figures, return comparisons, or investment guidance are published here.
            </p>
          </div>
        </div>
      )}

      {/* Original Publication */}
      <h2 className="mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Original Publication</h2>
      <dl className="mt-4 grid gap-4 rounded-sm border border-border bg-secondary/40 p-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Original date</dt>
          <dd className="mt-1 font-mono text-sm text-foreground" suppressHydrationWarning>
            {entry.originalPublicationDate ? formatDate(entry.originalPublicationDate, { year: 'numeric' }) : 'Forthcoming'}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Original source</dt>
          <dd className="mt-1 text-sm text-foreground">
            {isForthcoming(entry.originalSource) ? (
              <span className="italic text-muted-foreground">Forthcoming</span>
            ) : entry.externalSourceLink ? (
              <a href={entry.externalSourceLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:text-foreground">
                {entry.originalSource} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              entry.originalSource
            )}
          </dd>
        </div>
      </dl>

      {/* Original Article */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {complianceHold ? 'Thesis Summary & Historical Context' : 'Original Article'}
        </h2>
        <div className="mt-4">
          {entry.originalThesis && !isForthcoming(entry.originalThesis) ? (
            <Markdown content={entry.originalThesis} />
          ) : (
            <PlaceholderNote title="Original article forthcoming" description="The original text of this article is being prepared for the archive." />
          )}
        </div>
      </section>

      {/* What it added to my process */}
      {entry.processContribution && !isForthcoming(entry.processContribution) && (
        <section className="mt-12 rounded-sm border-l-2 border-primary bg-secondary/30 py-5 pl-6 pr-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">What It Added to My Process</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">{entry.processContribution}</p>
        </section>
      )}

      {/* Retrospective */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">2026 Retrospective</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Later commentary is kept distinct from the original material. The original thesis is never
          rewritten to appear more prescient. These reflections are being finalized and will be
          published as they are completed.
        </p>
        {!isForthcoming(entry.retrospectiveContext) && (
          <div className="mt-6"><Markdown content={entry.retrospectiveContext as string} /></div>
        )}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Retrospective icon={Eye} label="What I Saw" value={entry.retrospectiveWhatSaw} />
          <Retrospective icon={Compass} label="Why I Thought It Mattered" value={entry.retrospectiveWhyMattered} />
          <Retrospective icon={History} label="What Happened" value={entry.retrospectiveWhatHappened} />
          <Retrospective icon={CheckCircle2} label="What I Got Right" value={entry.retrospectiveWhatRight} />
          <Retrospective icon={AlertTriangle} label="What I Misjudged or Overestimated" value={entry.retrospectiveUnderestimated} />
          <Retrospective icon={GraduationCap} label="What Entered My Process" value={entry.retrospectiveLearned} />
        </div>
      </section>

      {entry.tags?.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {entry.tags.map((t) => (
            <span key={t.id} className="rounded-sm border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">{t.name}</span>
          ))}
        </div>
      )}

      <DisclosureBlock text={entry.disclosureText} />

      {related.length > 0 && (
        <section className="mt-14 border-t border-border pt-8">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Related</h2>
          <ul className="mt-4 space-y-3">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={entryHref(r)} className="group inline-flex items-center gap-1.5 text-primary hover:text-foreground">
                  {r.title}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
