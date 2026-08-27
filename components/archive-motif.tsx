/**
 * ArchiveEraMotif — a small, restrained line-art glyph that varies by subject so the
 * archive reads as a documentary record rather than a uniform card grid. Thin strokes,
 * single accent (currentColor = cobalt via text-primary), no stock imagery.
 */

type Kind =
  | 'convergence'
  | 'helix'
  | 'survivor'
  | 'flow'
  | 'stack'
  | 'network'
  | 'publicprivate'
  | 'hub'

const SLUG_KIND: Record<string, Kind> = {
  '2015-biotech-investing': 'convergence',
  '2016-crispr-gene-editing': 'helix',
  '2016-coal-survivorship': 'survivor',
  '2016-india-us-capital-markets': 'flow',
  '2017-institutional-sponsorship': 'stack',
  '2017-private-public-joint-venture': 'publicprivate',
  '2018-family-offices': 'hub',
  '2019-artificial-intelligence-fourth-industrial-revolution': 'network',
  '2022-private-markets-three-trigger': 'publicprivate',
}

const CATEGORY_KIND: Record<string, Kind> = {
  Biotechnology: 'convergence',
  Commodities: 'survivor',
  'Private Markets': 'flow',
  'Market Risk': 'publicprivate',
  'Artificial Intelligence': 'network',
}

function resolveKind(slug?: string | null, categoryName?: string | null): Kind {
  if (slug && SLUG_KIND[slug]) return SLUG_KIND[slug]
  if (categoryName && CATEGORY_KIND[categoryName]) return CATEGORY_KIND[categoryName]
  return 'flow'
}

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

function Glyph({ kind }: { kind: Kind }) {
  switch (kind) {
    case 'convergence':
      // Independent signals converging to one conclusion
      return (
        <>
          <path {...S} d="M4 6 L34 24" />
          <path {...S} d="M4 24 L34 24" />
          <path {...S} d="M4 42 L34 24" />
          <circle {...S} cx="4" cy="6" r="2.4" />
          <circle {...S} cx="4" cy="24" r="2.4" />
          <circle {...S} cx="4" cy="42" r="2.4" />
          <circle cx="36" cy="24" r="3.2" fill="currentColor" />
        </>
      )
    case 'helix':
      // Gene editing — twin strands with a break
      return (
        <>
          <path {...S} d="M8 4 C 26 14, 26 34, 8 44" />
          <path {...S} d="M32 4 C 14 14, 14 34, 32 44" />
          <path {...S} d="M11 14 H29" />
          <path {...S} d="M11 34 H29" />
          <path {...S} d="M13 24 H18" />
          <path {...S} d="M22 24 H27" />
        </>
      )
    case 'survivor':
      // Balance-sheet survivorship — most bars fall, one stands
      return (
        <>
          <path {...S} d="M4 44 H40" />
          <rect {...S} x="6" y="30" width="6" height="14" />
          <rect {...S} x="16" y="36" width="6" height="8" />
          <rect x="26" y="12" width="6" height="32" fill="currentColor" />
          <rect {...S} x="36" y="38" width="6" height="6" />
        </>
      )
    case 'flow':
      // Cross-border / directed capital flow
      return (
        <>
          <circle {...S} cx="7" cy="24" r="3" />
          <circle cx="37" cy="24" r="3" fill="currentColor" />
          <path {...S} d="M11 20 C 22 12, 26 12, 34 21" />
          <path {...S} d="M34 28 C 24 36, 20 36, 11 28" />
          <path {...S} d="M31 18 L34 21 L31 24" />
          <path {...S} d="M13 30 L10 27 L13 25" />
        </>
      )
    case 'stack':
      // Capital stack — layered financing
      return (
        <>
          <rect {...S} x="8" y="8" width="30" height="8" />
          <rect {...S} x="8" y="20" width="30" height="8" />
          <rect x="8" y="32" width="30" height="8" fill="currentColor" />
        </>
      )
    case 'network':
      // Compute network — nodes and edges
      return (
        <>
          <path {...S} d="M10 12 L24 24 L38 10" />
          <path {...S} d="M10 36 L24 24 L38 38" />
          <path {...S} d="M10 12 L10 36" />
          <circle {...S} cx="10" cy="12" r="2.4" />
          <circle {...S} cx="10" cy="36" r="2.4" />
          <circle {...S} cx="38" cy="10" r="2.4" />
          <circle {...S} cx="38" cy="38" r="2.4" />
          <circle cx="24" cy="24" r="3.2" fill="currentColor" />
        </>
      )
    case 'hub':
      // Family office — hub-and-spoke allocation
      return (
        <>
          <circle cx="24" cy="24" r="3.4" fill="currentColor" />
          <path {...S} d="M24 24 L8 8" />
          <path {...S} d="M24 24 L40 8" />
          <path {...S} d="M24 24 L8 40" />
          <path {...S} d="M24 24 L40 40" />
          <circle {...S} cx="8" cy="8" r="2.2" />
          <circle {...S} cx="40" cy="8" r="2.2" />
          <circle {...S} cx="8" cy="40" r="2.2" />
          <circle {...S} cx="40" cy="40" r="2.2" />
        </>
      )
    case 'publicprivate':
      // Public vs private — two value-creation curves
      return (
        <>
          <path {...S} d="M4 40 H44" />
          <path {...S} strokeDasharray="3 3" d="M6 38 C 18 34, 30 30, 42 26" />
          <path d="M6 40 C 18 36, 26 18, 42 8" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
        </>
      )
  }
}

export function ArchiveEraMotif({
  slug,
  categoryName,
  className,
}: {
  slug?: string | null
  categoryName?: string | null
  className?: string
}) {
  const kind = resolveKind(slug, categoryName)
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <Glyph kind={kind} />
    </svg>
  )
}
