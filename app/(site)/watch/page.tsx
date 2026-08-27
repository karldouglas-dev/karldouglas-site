import type { Metadata } from 'next'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { getByType } from '@/lib/content'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { entryHref } from '@/lib/paths'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Watch',
  description:
    'Thoughtful discussions on investing, technology, and consequential change—presented in the measured style of a conversation in the CIO’s office.',
  alternates: { canonical: '/watch' },
}

export default async function WatchIndex() {
  const videos = await getByType('VIDEO')
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Watch' }]} />
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Watch</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          A video channel is in development. The topics below are subjects Karl intends to explore
          on camera&mdash;thoughtful, measured discussions in the feel of a conversation in the
          CIO&rsquo;s office rather than a broadcast. They are future topics, not published videos;
          each will include a transcript once recorded.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <Link
            key={v.id}
            href={entryHref(v)}
            className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)]"
          >
            <div className="relative flex aspect-video items-center justify-center bg-secondary">
              <div className="absolute inset-0 paper-texture" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80">
                <Play className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              {!v.videoEmbedUrl && (
                <span className="absolute bottom-3 right-3 rounded-sm bg-background/80 px-2 py-1 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  Future topic
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">{v.title}</h2>
              {v.summary && <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{v.summary}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
