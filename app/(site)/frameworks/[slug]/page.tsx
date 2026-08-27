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
import { FrameworkDiagram } from '@/components/framework-diagram'
import { ScrollReveal } from '@/components/scroll-reveal'
import { entryHref } from '@/lib/paths'
import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entry = await getBySlug(params.slug)
  if (!entry) return { title: 'Not found' }
  return {
    title: entry.seoTitle || entry.title,
    description: entry.metaDescription || entry.summary || undefined,
    alternates: { canonical: `/frameworks/${entry.slug}` },
    openGraph: { title: entry.title, description: entry.summary || undefined, type: 'article', url: `/frameworks/${entry.slug}` },
  }
}

export default async function FrameworkPage({ params }: { params: { slug: string } }) {
  const entry = await getBySlug(params.slug)
  if (!entry || entry.type !== 'FRAMEWORK') notFound()
  const related = [...(entry.relatedTo ?? []), ...(entry.relatedFrom ?? [])]

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: entry.title,
          url: absoluteUrl(`/frameworks/${entry.slug}`),
          mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/frameworks/${entry.slug}`) },
          author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: entry.author, url: SITE_URL },
          publisher: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME },
          description: entry.summary || undefined,
        }}
      />
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Frameworks', href: '/frameworks' }, { label: entry.title }]}
      />

      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Framework</p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-[2.75rem]">
        {entry.title}
      </h1>
      {entry.subtitle && <p className="mt-3 text-xl italic text-muted-foreground">{entry.subtitle}</p>}

      {entry.summary && (
        <p className="mt-8 border-l-2 border-primary pl-5 font-display text-xl leading-relaxed text-foreground/90">
          {entry.summary}
        </p>
      )}

      <ScrollReveal>
        <FrameworkDiagram slug={entry.slug} />
      </ScrollReveal>

      <div className="mt-10">
        {entry.body ? <Markdown content={entry.body} /> : <PlaceholderNote />}
      </div>

      <div className="mt-12">
        <PlaceholderNote
          title="In-depth essay forthcoming"
          description="An extended essay expanding this framework, with case studies, is in preparation and will be published here."
        />
      </div>

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
