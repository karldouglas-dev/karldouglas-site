import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getByType } from '@/lib/content'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { entryHref } from '@/lib/paths'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Frameworks',
  description:
    'Pillar pages for the core intellectual frameworks: Pattern Recognition, Super Tanker Trades, the Three Trigger Methodology, and the Computational Economy.',
  alternates: { canonical: '/frameworks' },
}

export default async function FrameworksIndex() {
  const frameworks = await getByType('FRAMEWORK')
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Frameworks' }]} />
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Frameworks</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          The core intellectual concepts behind the work&mdash;each a durable pillar meant to expand
          over time into deeper essays, case studies, and diagrams.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {frameworks.map((f) => (
          <Link
            key={f.id}
            href={entryHref(f)}
            className="group flex flex-col rounded-sm border border-border bg-card p-8 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)]"
          >
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{f.title}</h2>
            {f.subtitle && <p className="mt-1 text-sm italic text-primary">{f.subtitle}</p>}
            {f.summary && <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{f.summary}</p>}
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14 rounded-sm border border-border bg-secondary/40 p-8 sm:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">How These Ideas Developed</p>
        <p className="mt-4 max-w-3xl font-display text-xl leading-relaxed text-foreground sm:text-2xl">
          These frameworks were not created all at once. They evolved through several decades of
          investing across market cycles, technology transitions, private equity, capital markets and
          venture investing.
        </p>
        <Link
          href="/frameworks/evolution-of-an-investment-philosophy"
          className="mt-7 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-sm)] transition-all hover:opacity-90"
        >
          See the Evolution
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
