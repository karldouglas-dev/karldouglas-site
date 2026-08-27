import type { ReactNode } from 'react'

// Restrained, editorial SVG diagrams for the framework pages. No animation, no
// client JS, no color literals beyond the site's semantic tokens (referenced via
// Tailwind arbitrary values so the diagrams track the palette automatically).

const PRIMARY = 'hsl(var(--primary))'
const BORDER = 'hsl(var(--border))'
const MUTED = 'hsl(var(--muted-foreground))'
const FG = 'hsl(var(--foreground))'

function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="my-10 overflow-hidden rounded-sm border border-border bg-card shadow-[var(--shadow-sm)]">
      <div className="relative bg-secondary/40 p-6 sm:p-8">
        <div className="absolute inset-0 paper-texture" aria-hidden="true" />
        <div className="relative">{children}</div>
      </div>
      <figcaption className="border-t border-border px-6 py-3 text-xs leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}

function PatternRecognitionDiagram() {
  const signals = [
    { y: 26, label: 'Technology' },
    { y: 74, label: 'Capital markets' },
    { y: 122, label: 'Economics' },
    { y: 170, label: 'Behavior' },
  ]
  const targetX = 300
  const targetY = 98
  return (
    <Figure caption="Multiple independent signals, observed across unrelated domains, converge toward a single investable inflection point. Conviction builds from agreement, not from any one data point.">
      <svg viewBox="0 0 460 196" className="h-auto w-full" role="img" aria-label="Independent signals converging toward an inflection point">
        {signals.map((s, i) => (
          <g key={i}>
            <line x1={16} y1={s.y} x2={targetX} y2={targetY} stroke={BORDER} strokeWidth={1.25} />
            <circle cx={16} cy={s.y} r={4} fill={PRIMARY} />
            <text x={26} y={s.y - 8} fontSize={11} fill={MUTED} className="font-sans">{s.label}</text>
          </g>
        ))}
        <circle cx={targetX} cy={targetY} r={9} fill={PRIMARY} />
        <circle cx={targetX} cy={targetY} r={16} fill="none" stroke={PRIMARY} strokeWidth={1} opacity={0.5} />
        <line x1={targetX + 20} y1={targetY} x2={444} y2={targetY} stroke={PRIMARY} strokeWidth={1.5} />
        <path d={`M444 ${targetY} l-9 -5 v10 z`} fill={PRIMARY} />
        <text x={targetX - 4} y={targetY + 40} fontSize={12} fill={FG} textAnchor="middle" className="font-sans" fontWeight={600}>Inflection point</text>
      </svg>
    </Figure>
  )
}

function SuperTankerDiagram() {
  return (
    <Figure caption="A large structural force cannot turn quickly. The opportunity is not in predicting the turn, but in recognizing it once the evidence of the turn becomes difficult to reverse.">
      <svg viewBox="0 0 460 170" className="h-auto w-full" role="img" aria-label="Uncertain direction, then an observable turn, then persistent structural movement">
        {/* Uncertain, wavering segment */}
        <path d="M16 60 q20 -22 40 0 q20 22 40 0 q20 -22 40 0" fill="none" stroke={BORDER} strokeWidth={1.5} strokeDasharray="4 4" />
        {/* The turn */}
        <path d="M136 60 q34 4 46 34" fill="none" stroke={PRIMARY} strokeWidth={1.75} />
        <circle cx={136} cy={60} r={4} fill={PRIMARY} />
        {/* Persistent movement */}
        <line x1={182} y1={94} x2={430} y2={94} stroke={PRIMARY} strokeWidth={2} />
        <path d="M444 94 l-12 -6 v12 z" fill={PRIMARY} />

        <text x={16} y={110} fontSize={11} fill={MUTED} className="font-sans">Uncertain direction</text>
        <text x={150} y={44} fontSize={11} fill={FG} className="font-sans" fontWeight={600}>Observable turn</text>
        <text x={300} y={82} fontSize={11} fill={MUTED} textAnchor="middle" className="font-sans">Persistent structural movement</text>
      </svg>
    </Figure>
  )
}

function ThreeTriggerDiagram() {
  const stages = [
    { n: '1', label: 'Elite venture participation' },
    { n: '2', label: 'Sequential institutional validation' },
    { n: '3', label: 'Large institutional commitment' },
  ]
  return (
    <Figure caption="Three observable stages of institutional validation used to screen opportunities and reduce uncertainty. A screen for evidence — never a guarantee of investment success.">
      <svg viewBox="0 0 460 156" className="h-auto w-full" role="img" aria-label="Three-stage institutional validation methodology">
        {stages.map((s, i) => {
          const x = 12 + i * 150
          return (
            <g key={i}>
              <rect x={x} y={22} width={128} height={96} rx={3} fill="none" stroke={BORDER} strokeWidth={1.25} />
              <circle cx={x + 20} cy={44} r={11} fill={PRIMARY} />
              <text x={x + 20} y={48} fontSize={12} fill="hsl(var(--primary-foreground))" textAnchor="middle" className="font-sans" fontWeight={700}>{s.n}</text>
              <text x={x + 12} y={72} fontSize={10.5} fill={FG} className="font-sans">
                {s.label.split(' ').reduce<string[][]>((rows, w) => {
                  const last = rows[rows.length - 1]
                  if (last && (last.join(' ') + ' ' + w).length <= 18) last.push(w)
                  else rows.push([w])
                  return rows
                }, []).map((row, ri) => (
                  <tspan key={ri} x={x + 12} dy={ri === 0 ? 0 : 13}>{row.join(' ')}</tspan>
                ))}
              </text>
              {i < stages.length - 1 && (
                <g>
                  <line x1={x + 128} y1={70} x2={x + 150} y2={70} stroke={PRIMARY} strokeWidth={1.5} />
                  <path d={`M${x + 150} 70 l-8 -4 v8 z`} fill={PRIMARY} />
                </g>
              )}
            </g>
          )
        })}
        <text x={230} y={142} fontSize={11} fill={MUTED} textAnchor="middle" className="font-sans">Screens for evidence and reduces uncertainty — not a guarantee of success</text>
      </svg>
    </Figure>
  )
}

function ComputationalEconomyDiagram() {
  const layers = [
    'Enterprise Applications',
    'Advanced Computation',
    'Biological Intelligence',
    'Physical Intelligence',
    'Financial Infrastructure',
    'Energy',
    'Compute',
  ]
  const rowH = 26
  const top = 12
  return (
    <Figure caption="A layered map of the computational economy. Compute and energy form the base; higher layers translate that capacity into activity across the economy. Each layer is intended to expand into its own detail over time.">
      <svg viewBox={`0 0 460 ${top * 2 + layers.length * rowH}`} className="h-auto w-full" role="img" aria-label="Layered map of the computational economy">
        {layers.map((l, i) => {
          const y = top + i * rowH
          const isBase = i >= layers.length - 2
          return (
            <g key={i}>
              <rect
                x={70}
                y={y}
                width={320}
                height={rowH - 6}
                rx={2}
                fill={isBase ? PRIMARY : 'none'}
                opacity={isBase ? 0.12 : 1}
                stroke={isBase ? PRIMARY : BORDER}
                strokeWidth={1.25}
              />
              <text x={230} y={y + rowH / 2 + 1} fontSize={11.5} fill={FG} textAnchor="middle" className="font-sans" fontWeight={isBase ? 600 : 400}>{l}</text>
            </g>
          )
        })}
        <text x={40} y={top + 10} fontSize={10} fill={MUTED} textAnchor="middle" className="font-sans">Applied</text>
        <text x={40} y={top + layers.length * rowH - 8} fontSize={10} fill={MUTED} textAnchor="middle" className="font-sans">Foundational</text>
        <line x1={40} y1={top + 18} x2={40} y2={top + layers.length * rowH - 20} stroke={BORDER} strokeWidth={1} />
      </svg>
    </Figure>
  )
}

const DIAGRAMS: Record<string, () => JSX.Element> = {
  'pattern-recognition': PatternRecognitionDiagram,
  'super-tanker-trades': SuperTankerDiagram,
  'three-trigger-methodology': ThreeTriggerDiagram,
  'computational-economy': ComputationalEconomyDiagram,
}

export function FrameworkDiagram({ slug }: { slug: string }) {
  const Diagram = DIAGRAMS[slug]
  if (!Diagram) return null
  return <Diagram />
}
