import Link from 'next/link'
import { COVENANT_URL, LINKEDIN_URL, YOUTUBE_URL, SITE_DISCLAIMER } from '@/lib/site'

// Renders an external item as a link when a real URL is supplied, otherwise as
// plain, non-clickable text so nothing points to an incorrect destination.
function ExternalItem({ href, label }: { href: string; label: string }) {
  if (!href) {
    return <span className="text-foreground/60">{label}</span>
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground/80 transition-colors hover:text-primary"
    >
      {label}
    </a>
  )
}

export function SiteFooter() {
  const year = 2026
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-semibold tracking-tight text-foreground">
              Karl B. Douglas
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Investing, technology, markets, and consequential change.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/thinking" className="text-foreground/80 transition-colors hover:text-primary">Thinking</Link></li>
                <li><Link href="/frameworks" className="text-foreground/80 transition-colors hover:text-primary">Frameworks</Link></li>
                <li><Link href="/archive" className="text-foreground/80 transition-colors hover:text-primary">Thesis Archive</Link></li>
                <li><Link href="/watch" className="text-foreground/80 transition-colors hover:text-primary">Watch</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Elsewhere</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><ExternalItem href={COVENANT_URL} label="Covenant" /></li>
                <li><ExternalItem href={LINKEDIN_URL} label="LinkedIn" /></li>
                <li>
                  {YOUTUBE_URL ? (
                    <ExternalItem href={YOUTUBE_URL} label="YouTube" />
                  ) : (
                    <span className="text-foreground/60">YouTube <span className="text-muted-foreground">(when live)</span></span>
                  )}
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Site</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/about" className="text-foreground/80 transition-colors hover:text-primary">About</Link></li>
                <li><Link href="/disclosures" className="text-foreground/80 transition-colors hover:text-primary">Disclosures</Link></li>
                <li><Link href="/privacy" className="text-foreground/80 transition-colors hover:text-primary">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Site-wide personal-opinion / no-advice / Covenant-independence disclaimer */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="max-w-4xl text-xs leading-relaxed text-muted-foreground">
            {SITE_DISCLAIMER}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>© {year} Karl B. Douglas. All rights reserved.</p>
          <p>Investor. Strategist. Student of consequential change.</p>
        </div>
      </div>
    </footer>
  )
}
