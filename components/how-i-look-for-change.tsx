import { ArrowRight, ArrowDown } from 'lucide-react'

/**
 * "How I Look for Change" — a restrained editorial framework graphic that
 * traces the sequence Karl watches when structural change becomes investable.
 * Horizontal on wide screens, vertical on narrow ones. No client JS.
 */

const STAGES = [
  {
    n: '01',
    title: 'Technology',
    text: 'A capability improves fast enough to change what is possible.',
  },
  {
    n: '02',
    title: 'Capital',
    text: 'Money begins to move toward the change—often quietly, then in size.',
  },
  {
    n: '03',
    title: 'Institutions',
    text: 'Credible, sequential commitment signals the shift is being taken seriously.',
  },
  {
    n: '04',
    title: 'Market Structure',
    text: 'The economics of an industry—who wins, who pays—start to reorganize.',
  },
]

export function HowILookForChange() {
  return (
    <figure className="relative overflow-hidden rounded-sm border border-border bg-secondary/40 paper-texture">
      <div className="p-6 sm:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          {STAGES.map((s, i) => (
            <div key={s.n} className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 rounded-sm border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
                <span className="font-mono text-xs tracking-[0.2em] text-primary">{s.n}</span>
                <h3 className="mt-2 font-display text-lg leading-tight text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
              <div className="flex shrink-0 items-center justify-center text-primary" aria-hidden="true">
                <ArrowRight className="hidden h-5 w-5 md:block" />
                <ArrowDown className="h-5 w-5 md:hidden" />
              </div>
            </div>
          ))}

          {/* Terminal node — the payoff of the sequence, emphasized in accent */}
          <div className="flex-1 rounded-sm border-2 border-primary bg-primary/[0.06] p-5">
            <span className="font-mono text-xs tracking-[0.2em] text-primary">05</span>
            <h3 className="mt-2 font-display text-lg leading-tight text-primary">
              Investable Inflection Point
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              The moment the change is observable, validated, and structural&mdash;no longer a
              forecast, and not yet consensus.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-border px-6 py-3 text-xs text-muted-foreground sm:px-10">
        How I look for change &mdash; the sequence I watch before conviction.
      </figcaption>
    </figure>
  )
}
