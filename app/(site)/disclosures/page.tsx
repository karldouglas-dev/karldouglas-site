import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Disclosures',
  description:
    'Important disclosures regarding the informational nature of the content published on this website.',
  alternates: { canonical: '/disclosures' },
}

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: 'Informational purpose only',
    body: [
      'The content published on this website—including essays, frameworks, thesis archive entries, videos, and commentary—is provided for general informational and educational purposes only. It reflects the personal views and experience of Karl B. Douglas and does not constitute investment, legal, tax, accounting, or other professional advice.',
    ],
  },
  {
    heading: 'Not an offer or solicitation',
    body: [
      'Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security, fund interest, or investment product, nor a recommendation to adopt any investment strategy. No content should be relied upon as the basis for any investment decision. Any such decision should be made only after consulting your own qualified advisers and considering your particular circumstances.',
    ],
  },
  {
    heading: 'No performance claims or guarantees',
    body: [
      'References to past activities, market events, historical positions, or investment themes are provided for context and discussion. They do not imply any particular result, are not performance claims, and are not track-record presentations. Past experience is not indicative of future results, and all investing involves risk, including the possible loss of principal.',
    ],
  },
  {
    heading: 'Forward-looking statements',
    body: [
      'Some content discusses expectations about technology, markets, and the broader economy. Such forward-looking statements are inherently uncertain, may prove incorrect, and reflect judgments as of the date written. No obligation is assumed to update any statement in light of new information or events.',
    ],
  },
  {
    heading: 'Third-party references',
    body: [
      'References to companies, individuals, publications, or external sources are for illustrative and educational purposes and do not constitute endorsements. Links to third-party websites are provided for convenience; their content is not controlled here and is not adopted or verified.',
    ],
  },
  {
    heading: 'Affiliation',
    body: [
      'Karl B. Douglas serves as Chairman & Chief Investment Officer of Covenant. Views expressed on this personal website are his own and, unless expressly stated, should not be attributed to Covenant or any other organization.',
    ],
  },
]

export default function DisclosuresPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Disclosures' }]} />
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">Legal</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Disclosures
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          Please read the following important information about the content published here.
        </p>
      </header>

      <div className="mt-12 max-w-2xl space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">{s.heading}</h2>
            <div className="mt-3 space-y-4">
              {s.body.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
