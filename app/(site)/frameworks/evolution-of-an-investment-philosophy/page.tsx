import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Evolution of an Investment Philosophy',
  description:
    'How decades of observation across commodities, biotechnology, capital markets, family offices and artificial intelligence compounded into a set of repeatable investment frameworks.',
  alternates: { canonical: '/frameworks/evolution-of-an-investment-philosophy' },
}

type Stage = {
  observed: string
  period?: string
  detail: string
  evolved: string
  frameworkHref?: string
}

const STAGES: Stage[] = [
  {
    observed: 'Commodities & Chinese industrial demand',
    period: '2003–2015',
    detail:
      'Large secular forces and persistent demand shifts can be observed early and acted on with patience rather than prediction.',
    evolved: 'Super Tanker Trades',
    frameworkHref: '/frameworks/super-tanker-trades',
  },
  {
    observed: 'Biotechnology & CRISPR',
    period: '2015–2016',
    detail:
      'The convergence of enabling technologies and changing productive capacity can reset the economics of an entire field.',
    evolved: 'Pattern Recognition',
    frameworkHref: '/frameworks/pattern-recognition',
  },
  {
    observed: 'Coal, PIPEs & raising capital',
    period: '2016–2017',
    detail:
      'Balance sheets, leverage, financing structure, governance and sponsorship determine outcomes.',
    evolved: 'Risk Decomposition & Institutional Validation',
  },
  {
    observed: 'Family offices',
    period: '2018',
    detail:
      'Capital access depends on understanding who controls the money and how decisions are made.',
    evolved: 'Access as an Investment Skill',
  },
  {
    observed: 'Artificial intelligence & the Fourth Industrial Revolution',
    period: '2019',
    detail:
      'A general-purpose technology can reorganize multiple industries at once, while significant value accumulates in the enabling infrastructure.',
    evolved: 'The Computational Economy',
    frameworkHref: '/frameworks/computational-economy',
  },
  {
    observed: 'Private markets',
    period: '2022',
    detail:
      'Much of the value creation in emerging technology companies occurs before public-market entry, while access to top venture funds is highly constrained.',
    evolved: 'Institutional Validation & Disciplined Private-Market Access',
  },
  {
    observed: 'A formal private-company framework',
    detail:
      'The prior observations cohered into a single, repeatable process for evaluating and accessing private-company opportunities.',
    evolved: 'Three Trigger Methodology',
    frameworkHref: '/frameworks/three-trigger-methodology',
  },
]

export default function EvolutionPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Frameworks', href: '/frameworks' },
          { label: 'Evolution of an Investment Philosophy' },
        ]}
      />
      <header className="max-w-3xl">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">The through-line</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Evolution of an Investment Philosophy
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          The frameworks used today were not designed in advance. They emerged from decades of
          investing across market cycles and technology transitions&mdash;each period contributing an
          observation that later hardened into a repeatable discipline.
        </p>
      </header>

      <div className="mt-12 space-y-4">
        {STAGES.map((s, i) => (
          <div
            key={i}
            className="rounded-sm border border-border bg-card p-6 shadow-[var(--shadow-sm)] sm:p-8"
          >
            <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
              <div>
                {s.period && (
                  <div className="font-mono text-xs uppercase tracking-wider text-primary">{s.period}</div>
                )}
                <h2 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-foreground">
                  {s.observed}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </div>
              <div className="flex items-center justify-center text-primary/50">
                <ArrowRight className="hidden h-6 w-6 sm:block" aria-hidden="true" />
                <ArrowDown className="h-6 w-6 sm:hidden" aria-hidden="true" />
              </div>
              <div className="sm:border-l sm:border-border sm:pl-5">
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Evolved into
                </div>
                <div className="mt-1.5 font-display text-xl font-semibold tracking-tight text-primary">
                  {s.evolved}
                </div>
                {s.frameworkHref && (
                  <Link
                    href={s.frameworkHref}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
                  >
                    Read the framework
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-sm border border-border bg-secondary/40 p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">A note on naming.</span> The framework names on
          the right&mdash;such as &ldquo;Super Tanker Trades,&rdquo; &ldquo;Pattern Recognition,&rdquo; and &ldquo;The
          Computational Economy&rdquo;&mdash;are a present-day retrospective lens used to describe how the
          thinking developed. They were not necessarily the labels used at the time each observation
          was first made.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/archive"
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          Explore the Thesis Archive
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/frameworks"
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          All Frameworks
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          About Karl
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
