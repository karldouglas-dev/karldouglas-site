import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getByType } from '@/lib/content'
import { SoroBlog } from '@/components/soro-blog'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { absoluteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Topical research that expands on, applies, and tests Karl B. Douglas’s core investment frameworks—examining specific questions in depth as markets evolve. Each article is reviewed by Karl before publication.',
  alternates: { canonical: '/research' },
  openGraph: {
    title: 'Research — Karl B. Douglas',
    description:
      'Topical research that expands on, applies, and tests the core investment frameworks. Each article is reviewed by Karl before publication.',
    type: 'website',
    url: '/research',
  },
}

const THEMES = [
  'AI Infrastructure',
  'Private Markets',
  'Robotics',
  'Biotechnology',
  'Energy',
  'Enterprise Software',
  'Market Structure',
  'Capital Formation',
]

export default async function ResearchIndex() {
  const frameworks = await getByType('FRAMEWORK')

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Research',
    url: absoluteUrl('/research'),
    description:
      'Topical research that expands on, applies, and tests Karl B. Douglas’s core investment frameworks. Each article is reviewed by Karl before publication.',
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Research' }]} />

      {/* Hero / introductory paragraph */}
      <header className="max-w-3xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Reviewed by Karl B. Douglas
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Research
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
          Research explores the technologies, market structures, capital flows, and economic forces
          that sit around my core investment frameworks. These articles are developed to examine
          specific questions in greater depth, connect current developments to the broader theses
          presented elsewhere on this site, and test how those frameworks apply as markets evolve.
          Each article is reviewed by me before publication. The Research section is intended to
          extend the body of work&mdash;not replace or blur the distinction with my original essays,
          frameworks, and historical writings.
        </p>
      </header>

      {/* Research articles are generated and published through Soro and reviewed
          by Karl B. Douglas. The widget renders the article index and individual
          articles client-side into #soro-blog. */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Latest Research
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          New articles are published on an ongoing basis and organized by theme. Each is reviewed by
          Karl B. Douglas before publication.
        </p>
        <div className="mt-6">
          <SoroBlog />
        </div>
      </section>

      {/* Browse by Theme */}
      <section className="mt-16 rounded-sm border border-border bg-secondary/30 p-8">
        <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
          Browse by Theme
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Research is organized around the technologies and market forces that surround the core
          frameworks.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Related Frameworks */}
      {frameworks.length > 0 && (
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                The through-line
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
                Related Frameworks
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Every research article connects back to one of the core frameworks it expands on,
                applies, or tests.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {frameworks.map((f) => (
              <Link
                key={f.id}
                href={`/frameworks/${f.slug}`}
                className="group flex items-center justify-between gap-4 rounded-sm border border-border bg-card px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-sm)]"
              >
                <span>
                  <span className="font-display text-base font-semibold tracking-tight text-foreground group-hover:text-primary">
                    {f.title}
                  </span>
                  {f.subtitle && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">{f.subtitle}</span>
                  )}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
