import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, Eye, FileCheck, GitMerge, Landmark, KeyRound, Layers, RefreshCw, Hourglass,
} from 'lucide-react'
import { getFeaturedThinking, getLatest, getBySlug } from '@/lib/content'
import { ContentCard } from '@/components/content-card'
import { SectionHeading } from '@/components/section-heading'
import { Portrait } from '@/components/portrait'
import { HowILookForChange } from '@/components/how-i-look-for-change'
import { ArchiveEraMotif } from '@/components/archive-motif'
import { ScrollReveal } from '@/components/scroll-reveal'
import { JsonLd } from '@/components/jsonld'
import { entryHref } from '@/lib/paths'
import { formatDate, CONTENT_TYPE_LABEL } from '@/lib/format'
import { COVENANT_URL, SITE_URL, absoluteUrl, personSameAs } from '@/lib/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const PRINCIPLES = [
  { icon: Eye, title: 'Pattern Recognition', text: 'Recognizing structural change through repeated exposure to technological and market transitions.' },
  { icon: FileCheck, title: 'Evidence Over Prediction', text: 'Acting on observable evidence that the future is changing rather than forecasting an uncertain event.' },
  { icon: GitMerge, title: 'Convergence as Catalyst', text: 'Watching for independent technologies and forces that converge to alter an industry’s economics.' },
  { icon: Landmark, title: 'Institutional Validation', text: 'Treating sequential, credible institutional commitment as a meaningful signal.' },
  { icon: KeyRound, title: 'Access as an Investment Skill', text: 'Gaining entry to elite opportunities—often through private and secondary markets—is itself a discipline.' },
  { icon: Layers, title: 'Risk Decomposition', text: 'Separating a thesis into its component risks—management, product, financing, and structure.' },
  { icon: RefreshCw, title: 'Adaptability', text: 'Adjusting process as market regimes change, without abandoning conviction prematurely.' },
  { icon: Hourglass, title: 'Patience', text: 'Waiting, once a thesis is sufficiently validated, for structural forces to play out.' },
]

const TIMELINE = [
  { period: '1987', title: 'Market Crash', text: 'Early career as a wealth manager; the 1987 crash became a formative lesson in market risk and nonlinear repricing.' },
  { period: '1992–1998', title: 'Technology Inside the Banks', text: 'Senior technology roles at Bear Stearns (1992–1994) and J.P. Morgan & Co. (1994–1998), managing enterprise-scale systems for the institutions where risk was priced daily. At J.P. Morgan, Karl managed roughly 125 technology professionals and a technology portfolio of approximately $105 million.' },
  { period: '1998–1999', title: 'Balance-Sheet Risk & Technology', text: 'At Merrill Lynch & Co., as a senior strategic technology manager, worked on balance-sheet-risk mitigation technology in the aftermath of the Russian financial crisis and LTCM-era institutional stress.' },
  { period: '1999–2003', title: 'Technology Entrepreneur', text: 'Beginning in December 1999, served as Chief Executive Officer and a director of a network technology company, and by 2002 as President, Chief Executive Officer, and a Director of WARP Technology Holdings—learning startup capital formation firsthand and pitching Sand Hill Road venture firms.' },
  { period: '2003–2015', title: 'Super Tanker Trades / Commodities', text: 'Recognized China’s industrial expansion and structural commodity demand. Developed the concept of “Super Tanker Trades.” Invested across coal, iron ore, and copper, and learned private-equity investing through consolidation of coal companies.' },
  { period: '2015', title: 'Biotechnology & Computational Convergence', text: 'Published on how high-throughput screening, bioinformatics, genome sequencing, and cheap compute were changing drug discovery.' },
  { period: 'Private Markets', title: 'Private Markets & Secondaries', text: 'Developed experience using secondary markets to gain access to elite private companies and institutionally validated opportunities.' },
  { period: 'Methodology', title: 'Three Trigger Methodology', text: 'Formalized a repeatable framework emphasizing observable institutional validation.' },
  { period: 'Now', title: 'AI & the Computational Economy', text: 'Current focus on AI, compute, robotics, biological intelligence, infrastructure, and the broader transition toward a computational economy.' },
]

export default async function HomePage() {
  const ARCHIVE_HIGHLIGHTS = [
    {
      slug: '2015-biotech-investing',
      label: '2015 \u00b7 Biotechnology',
      subtitle: 'When computation began changing drug discovery',
    },
    {
      slug: '2017-institutional-sponsorship',
      label: '2017 \u00b7 Institutional Sponsorship',
      subtitle: 'Why who invests can matter almost as much as what they invest in',
    },
    {
      slug: '2019-artificial-intelligence-fourth-industrial-revolution',
      label: '2019 \u00b7 Artificial Intelligence',
      subtitle: 'Why AI looked like an economy-wide platform before it became consensus',
    },
  ]

  const [featured, latest, archiveEntries] = await Promise.all([
    getFeaturedThinking(4),
    getLatest(4),
    Promise.all(ARCHIVE_HIGHLIGHTS.map((h) => getBySlug(h.slug))),
  ])

  const archiveCards = ARCHIVE_HIGHLIGHTS.map((h, i) => ({ ...h, entry: archiveEntries[i] })).filter(
    (c) => c.entry,
  )

  const sameAs = personSameAs()
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: SITE_URL,
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Karl B. Douglas',
      url: SITE_URL,
      jobTitle: 'Chairman & Chief Investment Officer',
      image: absoluteUrl('/karl-douglas-portrait.jpg'),
      worksFor: { '@type': 'Organization', name: 'Covenant', ...(COVENANT_URL ? { url: COVENANT_URL } : {}) },
      description:
        'Investor and strategist who studies technological, economic, and capital-market inflection points—looking for patterns that reveal when structural change is becoming investable.',
      knowsAbout: [
        'Pattern Recognition', 'Three Trigger Methodology', 'Super Tanker Trades',
        'The Computational Economy', 'Private Markets', 'Artificial Intelligence', 'Biotechnology',
      ],
      ...(sameAs.length ? { sameAs } : {}),
    },
  }

  return (
    <>
      <JsonLd data={personLd} />

      {/* Section 1 — Hero */}
      <section className="paper-texture">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-32">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Investor &middot; Strategist
            </p>
            <h1 className="font-display text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground text-balance sm:text-7xl">
              Karl B. Douglas
            </h1>
            <p className="mt-6 font-display text-2xl italic leading-snug text-primary sm:text-[1.85rem]">
              Student of consequential change.
            </p>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              I study technological, economic, and capital-market inflection points&mdash;looking for
              patterns that reveal when structural change is becoming investable.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/thinking"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-sm)] transition-all hover:opacity-90"
              >
                Explore My Thinking
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                About Karl
              </Link>
            </div>
          </div>
          <div className="relative w-full max-w-md lg:ml-auto">
            <span
              className="pointer-events-none absolute -left-3 -top-3 hidden h-16 w-16 border-l-2 border-t-2 border-primary/50 lg:block"
              aria-hidden="true"
            />
            <Portrait className="aspect-[4/5] w-full" priority />
          </div>
        </div>
      </section>

      {/* Section 1a — Four-decade introduction */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8">
          <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            Four decades near consequential change
          </p>
          <p className="max-w-4xl font-display text-2xl leading-snug text-foreground text-pretty sm:text-[1.9rem] sm:leading-[1.3]">
            For four decades, I have worked across markets, technology, private capital, and
            investment management&mdash;often at moments when established systems were beginning to
            change. That experience has shaped the way I invest today: look for consequential shifts
            in technology, capital flows, market structure, and institutional behavior, then wait for
            enough observable evidence that the probability distribution has moved in your favor.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground text-pretty">
            My work today is focused on identifying those inflection points and understanding how
            structural change translates into risk, value, and investable opportunity.
          </p>
        </div>
      </section>

      {/* Section 1b — How I Look for Change */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">A way of seeing</p>
            <h2 className="font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              How I Look for Change
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              Structural change rarely announces itself. I watch it move through a sequence&mdash;from
              raw capability to the point where it reorganizes an industry and becomes investable.
            </p>
          </div>
          <ScrollReveal>
            <HowILookForChange />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2 — Featured Thinking */}
      {featured.length > 0 && (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8">
            <SectionHeading eyebrow="Start here" title="Featured Thinking" cta={{ href: '/thinking', label: 'All thinking' }} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((e) => (
                <ContentCard key={e.id} entry={e} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 3 — How I Think */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">How I Think</p>
            <p className="font-display text-2xl leading-snug text-foreground sm:text-[1.75rem]">
              Investing is not primarily about predicting the future. It is about recognizing when
              observable evidence suggests that the future is changing. I look for converging
              technologies, shifts in capital, institutional validation, and structural forces that
              can alter the economics of an industry or market.
            </p>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title}>
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-12">
            <Link href="/frameworks" className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground">
              Explore the Frameworks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial pull-quote moment */}
      <section className="border-t border-border bg-primary/[0.04]">
        <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-28">
          <span className="block h-px w-16 bg-primary" aria-hidden="true" />
          <blockquote className="mt-8 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-foreground text-balance sm:text-5xl sm:leading-[1.1]">
            Recognizing change before it becomes consensus.
          </blockquote>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            The value of an idea is highest in the window between when the evidence is observable and
            when it becomes obvious to everyone. That window is where I do my work.
          </p>
        </div>
      </section>

      {/* Section 4 — From the Archive */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8">
          <SectionHeading eyebrow="Historical provenance" title="From the Archive" cta={{ href: '/archive', label: 'All archive' }} />
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Dated theses, preserved intact, that trace how the thinking evolved&mdash;from computational
            change in biotechnology, to the role of capital and institutional sponsorship, to
            artificial intelligence as an economy-wide transition.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {archiveCards.map((c) => (
              <Link
                key={c.slug}
                href={entryHref(c.entry!)}
                className="group flex flex-col rounded-sm border border-border bg-card p-8 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)]"
              >
                <ArchiveEraMotif
                  slug={c.slug}
                  categoryName={c.entry!.category?.name}
                  className="mb-4 h-10 w-10 text-primary/80 transition-colors group-hover:text-primary"
                />
                <span className="text-xs font-medium uppercase tracking-wider text-primary">{c.label}</span>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
                  {c.subtitle}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{c.entry!.title}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read the thesis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/archive"
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-sm)] transition-all hover:opacity-90"
            >
              Explore the Full Thesis Archive
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5 — Career in Context */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">A Career Shaped by Inflection Points</p>
            <p className="font-display text-2xl leading-snug text-foreground sm:text-[1.75rem]">
              From the 1987 market crash to institutional balance-sheet risk, technology
              entrepreneurship, commodity cycles, biotechnology, private markets, and artificial
              intelligence, my career has repeatedly placed me near systems undergoing consequential
              change. The common thread has been learning how to recognize those transitions&mdash;and
              how to allocate capital around them.
            </p>
          </div>

          <ol className="mt-14 relative border-l border-border pl-6 sm:pl-8">
            {TIMELINE.map((m, i) => (
              <li key={i} className="relative pb-9 last:pb-0">
                <span className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-primary sm:-left-[calc(2rem+5px)]" aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-wider text-primary">{m.period}</p>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-foreground">{m.title}</h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <Link href="/about" className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground">
              Read the Full Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6 — Latest */}
      {latest.length > 0 && (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8">
            <SectionHeading title="Latest" />
            <div className="divide-y divide-border rounded-sm border border-border bg-card">
              {latest.map((e) => (
                <Link
                  key={e.id}
                  href={entryHref(e)}
                  className="group flex flex-col gap-2 px-6 py-5 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="w-40 shrink-0 text-xs text-muted-foreground" suppressHydrationWarning>
                    {(e.publicationDate || e.originalPublicationDate)
                      ? formatDate(e.publicationDate || e.originalPublicationDate, { year: 'numeric', month: 'short', day: 'numeric' })
                      : ''}
                    <span className="ml-2 uppercase tracking-wider text-primary">{CONTENT_TYPE_LABEL[e.type]}</span>
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-medium tracking-tight text-foreground group-hover:text-primary">{e.title}</h3>
                    {e.summary && <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">{e.summary}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 7 — Covenant */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8">
          <div className="rounded-sm border border-border bg-card p-8 sm:p-12">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">Covenant</p>
            <p className="max-w-3xl font-display text-xl leading-relaxed text-foreground sm:text-2xl">
              Karl is Chairman and Chief Investment Officer of Covenant, where his investment
              philosophy informs the firm&rsquo;s work across wealth management, private markets, and
              technology-oriented investing.
            </p>
            {COVENANT_URL && (
              <a
                href={COVENANT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Learn About Covenant
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
