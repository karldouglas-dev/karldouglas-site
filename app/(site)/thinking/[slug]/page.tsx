import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getBySlug } from '@/lib/content'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Markdown } from '@/lib/markdown'
import { DisclosureBlock } from '@/components/disclosure-block'
import { PlaceholderNote } from '@/components/placeholder-note'
import { JsonLd } from '@/components/jsonld'
import { entryHref } from '@/lib/paths'
import { formatDate, CONTENT_TYPE_LABEL } from '@/lib/format'
import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entry = await getBySlug(params.slug)
  if (!entry) return { title: 'Not found' }
  return {
    title: entry.seoTitle || entry.title,
    description: entry.metaDescription || entry.summary || undefined,
    alternates: { canonical: `/thinking/${entry.slug}` },
    openGraph: { title: entry.title, description: entry.summary || undefined, type: 'article', url: `/thinking/${entry.slug}` },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const entry = await getBySlug(params.slug)
  if (!entry || !['ESSAY', 'INTERVIEW', 'COMMENTARY'].includes(entry.type)) notFound()

  const date = entry.publicationDate ?? entry.originalPublicationDate
  const related = [...(entry.relatedTo ?? []), ...(entry.relatedFrom ?? [])]

  const canonicalUrl = absoluteUrl(`/thinking/${entry.slug}`)
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: entry.author, url: SITE_URL },
    publisher: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME },
    datePublished: date ? new Date(date).toISOString() : undefined,
    dateModified: entry.lastUpdated ? new Date(entry.lastUpdated).toISOString() : undefined,
    description: entry.summary || undefined,
    articleSection: entry.category?.name,
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <JsonLd data={articleLd} />
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Thinking', href: '/thinking' }, { label: entry.title }]}
      />

      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
        {CONTENT_TYPE_LABEL[entry.type]}{entry.category?.name ? ` · ${entry.category.name}` : ''}
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-[2.75rem]">
        {entry.title}
      </h1>
      {entry.subtitle && <p className="mt-3 text-xl italic text-muted-foreground">{entry.subtitle}</p>}

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border pb-6 text-sm text-muted-foreground">
        <span>By {entry.author}</span>
        {date && (<><span aria-hidden>·</span><span suppressHydrationWarning>{formatDate(date)}</span></>)}
        {entry.readingTime && (<><span aria-hidden>·</span><span>{entry.readingTime} min read</span></>)}
      </div>

      {entry.summary && (
        <p className="mt-8 font-display text-xl leading-relaxed text-foreground/90">{entry.summary}</p>
      )}

      <div className="mt-8">
        {entry.bodyPlaceholder || !entry.body ? (
          <PlaceholderNote description="The full text of this essay is being prepared and will be published here. In the meantime, the summary above outlines its central idea." />
        ) : (
          <Markdown content={entry.body} />
        )}
      </div>

      {entry.externalSourceLink && (
        <a
          href={entry.externalSourceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground"
        >
          {entry.externalSourceName || 'View original source'} <ArrowUpRight className="h-4 w-4" />
        </a>
      )}

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
