import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getBySlug } from '@/lib/content'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { DisclosureBlock } from '@/components/disclosure-block'
import { PlaceholderNote } from '@/components/placeholder-note'
import { JsonLd } from '@/components/jsonld'
import { entryHref } from '@/lib/paths'
import { formatDate } from '@/lib/format'
import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entry = await getBySlug(params.slug)
  if (!entry) return { title: 'Not found' }
  return {
    title: entry.seoTitle || entry.title,
    description: entry.metaDescription || entry.summary || undefined,
    alternates: { canonical: `/watch/${entry.slug}` },
    openGraph: { title: entry.title, description: entry.summary || undefined, type: 'video.other', url: `/watch/${entry.slug}` },
  }
}

export default async function VideoPage({ params }: { params: { slug: string } }) {
  const entry = await getBySlug(params.slug)
  if (!entry || entry.type !== 'VIDEO') notFound()
  const related = [...(entry.relatedTo ?? []), ...(entry.relatedFrom ?? [])]

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: entry.title,
          description: entry.summary || undefined,
          url: absoluteUrl(`/watch/${entry.slug}`),
          uploadDate: entry.publicationDate ? new Date(entry.publicationDate).toISOString() : undefined,
          ...(entry.videoEmbedUrl ? { embedUrl: entry.videoEmbedUrl } : {}),
          publisher: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME },
        }}
      />
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Watch', href: '/watch' }, { label: entry.title }]}
      />

      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
        {entry.videoEmbedUrl ? 'Video' : 'Future Topic'}
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-[2.5rem]">
        {entry.title}
      </h1>
      {entry.publicationDate && (
        <p className="mt-3 text-sm text-muted-foreground" suppressHydrationWarning>{formatDate(entry.publicationDate)}</p>
      )}

      <div className="mt-8 overflow-hidden rounded-sm border border-border">
        {entry.videoEmbedUrl ? (
          <div className="relative aspect-video bg-secondary">
            <iframe
              src={entry.videoEmbedUrl}
              title={entry.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <div className="relative flex aspect-video items-center justify-center bg-secondary">
            <div className="absolute inset-0 paper-texture" />
            <span className="relative text-sm uppercase tracking-wider text-muted-foreground">Video forthcoming</span>
          </div>
        )}
      </div>

      {entry.summary && (
        <p className="mt-8 font-display text-xl leading-relaxed text-foreground/90">{entry.summary}</p>
      )}

      {!entry.videoEmbedUrl && (
        <div className="mt-8">
          <PlaceholderNote
            title="A future topic, not a published video"
            description="This is a subject Karl intends to discuss on camera. It has not yet been recorded or released."
          />
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Transcript</h2>
        <div className="mt-4">
          {entry.transcript ? (
            <div className="prose-editorial whitespace-pre-line">{entry.transcript}</div>
          ) : (
            <PlaceholderNote title="Transcript forthcoming" description="A full transcript will be published here for readability and discoverability." />
          )}
        </div>
      </section>

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
