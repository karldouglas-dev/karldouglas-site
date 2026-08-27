// Central site configuration for external links and legal copy.
//
// IMPORTANT (per revision brief): do NOT guess these URLs. They are left empty
// until Karl supplies the correct addresses. Components render these links only
// when a real URL is present, so nothing points to an incorrect destination.
export const COVENANT_URL = '' // Covenant Venture Capital / Covenant — supplied by Karl
export const LINKEDIN_URL = 'https://www.linkedin.com/in/karldouglasp85/' // Karl's LinkedIn profile
export const YOUTUBE_URL = '' // YouTube channel — add when the channel is live

// Site-wide personal-opinion / no-advice / Covenant-independence disclaimer.
// Verbatim per the revision brief (§9). Reviewable by Covenant compliance before
// the public site is finalized.
export const SITE_DISCLAIMER =
  'The content on this website reflects my personal views and is provided for informational and educational purposes only. It should not be construed as investment, financial, legal, or tax advice. The views expressed are my own and do not necessarily reflect the views or opinions of Covenant Venture Capital, LLC, Covenant Investment Management, LLC, or any company affiliated with Covenant.'

// ---------------------------------------------------------------------------
// Canonical production domain.
//
// SEO/AEO requirement: every canonical tag, sitemap URL, robots host, Open
// Graph URL and structured-data reference must resolve to the SAME fixed
// production domain, independent of which host actually served the request.
// This is what stops the *.abacusai.app deployment from competing with
// karlbdouglas.com for indexing: even when a page is served from the
// abacusai.app host, its canonical, OG and schema URLs still point search
// engines to karlbdouglas.com, consolidating authority there.
// Do NOT derive this from process.env.NEXTAUTH_URL / request headers.
export const SITE_URL = 'https://karlbdouglas.com'
export const SITE_NAME = 'Karl B. Douglas'

// Build an absolute URL on the canonical domain from a site-relative path.
// Pass-through for values that are already absolute.
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${suffix}`
}

// schema.org sameAs / entity-disambiguation links. Only real, supplied URLs are
// emitted (empty placeholders are filtered out so we never publish a dead link).
export function personSameAs(): string[] {
  return [LINKEDIN_URL, YOUTUBE_URL, COVENANT_URL].filter((u) => Boolean(u))
}
