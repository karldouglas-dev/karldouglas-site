import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Portrait } from '@/components/portrait'
import { JsonLd } from '@/components/jsonld'
import { DisclosureBlock } from '@/components/disclosure-block'
import { COVENANT_URL, SITE_URL, absoluteUrl, personSameAs } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Karl Douglas has spent approximately four decades investing through technological transitions, financial crises, and major changes in global capital markets. An intellectual progression from markets and risk to technology, private markets, and AI.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Karl B. Douglas',
    description:
      'Approximately four decades investing through technological transitions, financial crises, and structural change in global capital markets.',
    type: 'profile',
    url: '/about',
  },
}

// The central storyline, per the intellectual-progression narrative. Each phase
// pairs a period of Karl's work with the recurring question he was asking of a
// system undergoing change. Career facts are drawn from source material; no
// performance outcomes or embellishments are added.
const ARC: { era: string; heading: string; body: string[] }[] = [
  {
    era: 'Markets',
    heading: 'Learning markets from the inside',
    body: [
      'Karl became a wealth manager at Integrated Resources at the age of twenty-five. It was an early, close-range education in how capital is allocated, how clients think about risk, and how quickly confidence can turn.',
      'The 1987 market crash was a formative experience. Watching a violent repricing unfold in real time left a lasting impression: markets are systems, and systems can move faster than the narratives built to explain them.',
    ],
  },
  {
    era: 'Risk',
    heading: 'Risk as a discipline, not a slogan',
    body: [
      'Senior technology roles followed at Bear Stearns (1992–1994), J.P. Morgan & Co. (1994–1998), and Merrill Lynch & Co. (1998–1999)—institutions where risk was measured, priced, and argued over daily, and where the systems that made that possible were themselves being built and rebuilt.',
      'At Merrill Lynch, as a senior strategic technology manager, Karl worked on balance-sheet-risk mitigation technology in the aftermath of the Russian financial crisis and LTCM-era institutional stress. The problem was practical and the lesson was durable: risk is something you can model, structure, and manage, but never fully eliminate.',
    ],
  },
  {
    era: 'Technology',
    heading: 'Watching the machinery of finance change',
    body: [
      'Across those years he watched financial computing evolve from mainframe to client-server to cloud. The infrastructure beneath markets was itself an inflection point—one that reshaped what was measurable, tradable, and possible.',
      'Around 2000 he read Michael Lewis’s The New New Thing and was influenced by the stories of Jim Clark and Marc Andreessen. Technology was no longer just a tool for finance; it was becoming the thing worth financing.',
    ],
  },
  {
    era: 'Entrepreneurship',
    heading: 'Building and leading for the first time',
    body: [
      'Beginning in December 1999, Karl became Chief Executive Officer and a director of a network technology company, and by 2002 served as President, Chief Executive Officer, and a Director of WARP Technology Holdings. He learned startup capital formation firsthand and pitched venture firms on Sand Hill Road—on the other side of the table from the investors he had spent his career among.',
      'Serving as a first-time CEO was one of the most demanding experiences of Karl’s career. The role provided firsthand exposure to startup capital formation, technology commercialization, leadership, execution risk, and venture financing.',
    ],
  },
  {
    era: 'Commodities',
    heading: 'Reading a secular trend in the real economy',
    body: [
      'Karl recognized rising Chinese demand for commodities as a secular trend. From roughly 2003 to 2011 he was involved in coal investing, acquisitions, and consolidation, and then in iron ore and copper investing through approximately 2015.',
      'Hard assets and heavy industry offered a different classroom than trading desks and startups: cycles measured in years, capital structures that could not be unwound quickly, and the unforgiving arithmetic of leverage.',
    ],
  },
  {
    era: 'Private Equity',
    heading: 'Leverage, capital structure, and adaptation',
    body: [
      'Through that period Karl learned extensively about leverage, capital structure, risk, and adaptation—often the way such lessons are actually learned, through experience that includes both successes and failures.',
      'These were practical lessons, learned in businesses where capital structures could not be unwound quickly and where adapting to changing conditions mattered as much as the original thesis.',
    ],
  },
  {
    era: 'Biotechnology',
    heading: 'A new frontier of investable science',
    body: [
      'In 2015 Karl published biotech investment thinking, extending his attention to a domain where scientific change and capital-market change intersect. Biology was becoming, in its own way, a computational and investable frontier.',
    ],
  },
  {
    era: 'Capital & Institutions',
    heading: 'Capital, Institutions & AI \u2014 2016\u20132019',
    body: [
      'During the following years, Karl wrote extensively about capital structure, institutional sponsorship, family offices and emerging technology. Those themes increasingly converged: who controlled capital, how markets provided access, how financing structure affected outcomes, and how enabling technologies could reshape entire industries. By 2019, he was writing about artificial intelligence and the Fourth Industrial Revolution as an economy-wide investment transition.',
    ],
  },
  {
    era: 'Private Markets',
    heading: 'Where value increasingly lives',
    body: [
      'Karl developed private-market and secondary-market investing expertise, and, over time, the Three Trigger Methodology—a framework for judging when structural change has become investable rather than merely interesting.',
      'As more value is created and held in private companies for longer, the questions he had been asking for decades found a new and larger arena.',
    ],
  },
  {
    era: 'AI',
    heading: 'The Computational Economy',
    body: [
      'Today Karl serves as Chairman & Chief Investment Officer of Covenant. His current focus is artificial intelligence and what he calls the Computational Economy—the expansion of computation beyond numerical processing into cognition, biology, robotics, and steadily broader areas of economic activity.',
      'It is the same inquiry that began at twenty-five, now pointed at the largest system change of his career.',
    ],
  },
]

export default function AboutPage() {
  const sameAs = personSameAs()
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absoluteUrl('/about'),
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Karl B. Douglas',
      url: SITE_URL,
      image: absoluteUrl('/karl-douglas-portrait.jpg'),
      jobTitle: 'Chairman & Chief Investment Officer',
      worksFor: { '@type': 'Organization', name: 'Covenant', ...(COVENANT_URL ? { url: COVENANT_URL } : {}) },
      ...(sameAs.length ? { sameAs } : {}),
      description:
        'Investor and writer focused on technological, economic, and capital-market inflection points, and on artificial intelligence and the Computational Economy.',
      knowsAbout: [
        'Investment philosophy',
        'Capital markets',
        'Private markets',
        'Commodities',
        'Biotechnology',
        'Artificial intelligence',
        'The Computational Economy',
      ],
    },
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <JsonLd data={personLd} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      {/* Intro */}
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <header className="max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">About Karl</p>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            An intellectual progression, not a résumé
          </h1>
          <p className="mt-6 font-display text-xl leading-relaxed text-foreground/90 text-pretty">
            Karl Douglas has spent approximately four decades investing through technological
            transitions, financial crises, and major changes in global capital markets.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
            His career is best understood not as a sequence of jobs but as recurring exposure to
            systems undergoing change&mdash;and a single question asked of each of them.
          </p>
          <blockquote className="mt-8 border-l-2 border-primary pl-5">
            <p className="font-display text-xl italic leading-relaxed text-foreground text-pretty">
              Where is the system changing, what does that change mean for risk and value, and
              where should capital be positioned as a result?
            </p>
          </blockquote>
        </header>

        <div className="lg:pt-2">
          <Portrait className="aspect-[4/5] w-full" />
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Karl B. Douglas &mdash; Chairman &amp; Chief Investment Officer, Covenant.
          </p>
        </div>
      </div>

      {/* Storyline label */}
      <div className="mt-20 border-t border-border pt-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">The through-line</p>
        <p className="mt-3 max-w-3xl font-display text-2xl leading-snug text-foreground text-pretty">
          Markets &rarr; Risk &rarr; Technology &rarr; Entrepreneurship &rarr; Commodities &rarr;
          Private Equity &rarr; Biotechnology &rarr; Private Markets &rarr; AI
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          Each phase added a different vantage point on the same problem. The domains changed; the
          discipline of watching for structural change did not.
        </p>
      </div>

      {/* The arc */}
      <div className="mt-14 space-y-14">
        {ARC.map((phase, i) => (
          <section key={phase.era} className="grid gap-4 sm:grid-cols-[10rem_1fr] sm:gap-10">
            <div className="sm:pt-1">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {String(i + 1).padStart(2, '0')} &middot; {phase.era}
              </p>
            </div>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {phase.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {phase.body.map((p, j) => (
                  <p key={j} className="text-base leading-relaxed text-muted-foreground text-pretty">
                    {p}
                  </p>
                ))}
              </div>
              {phase.era === 'Capital & Institutions' && (
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  <Link
                    href="/archive"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
                  >
                    Explore the Thesis Archive
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/frameworks/evolution-of-an-investment-philosophy"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
                  >
                    See the Evolution of an Investment Philosophy
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* In the public record — The Wall Street Transcript (2003) */}
      <div className="mt-20 border-t border-border pt-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">In the public record</p>
        <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
          An independent account of Karl’s technology career
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          In 2003, Karl was interviewed by The Wall Street Transcript as the chief executive of a
          technology company. The interview documents an earlier chapter of his career&mdash;spent
          managing large-scale technology inside major financial institutions&mdash;independent of
          this site.
        </p>
        <div className="mt-6 max-w-3xl rounded-sm border border-border bg-secondary/40 p-6 sm:p-8">
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary">
            <li>More than 15 years managing enterprise-level technology systems and departments for Fortune 500 institutions.</li>
            <li>Senior technology roles at Bear Stearns, J.P. Morgan, and Merrill Lynch.</li>
            <li>Managed a technology portfolio of approximately $105 million.</li>
            <li>Managed roughly 125 technology professionals at J.P. Morgan.</li>
            <li>Served as Senior Strategic Technology Manager at Merrill Lynch.</li>
            <li>Chief Executive Officer and a Director of WARP Technology Holdings at the time of the interview.</li>
          </ul>
          <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            Source: The Wall Street Transcript &mdash; Karl B. Douglas, Chief Executive Officer, WARP Technology Holdings (2003).
          </p>
        </div>
      </div>

      {/* Closing + CTAs */}
      <div className="mt-20 border-t border-border pt-12">
        <div className="max-w-2xl">
          <p className="font-display text-xl leading-relaxed text-foreground text-pretty">
            The emphasis throughout has been on learning and on evolving a process&mdash;one built to
            acknowledge that experience includes both successes and failures.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/thinking"
            className="group inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore My Thinking
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/frameworks"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            View the Frameworks
          </Link>
        </div>
      </div>

      <DisclosureBlock text="This page describes Karl B. Douglas’s professional background and investment philosophy for general informational purposes. It reflects personal experience and opinion, is not investment advice, and is not an offer or solicitation to buy or sell any security or to invest in any fund or strategy. Descriptions of past activities do not imply any particular result and should not be read as performance claims." />
    </div>
  )
}
