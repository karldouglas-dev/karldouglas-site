import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  // Point crawlers at the canonical domain for both the sitemap and the
  // preferred host, independent of which host served robots.txt.
  const base = SITE_URL
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/signup', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
