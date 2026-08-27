import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'
import { entryHref } from '@/lib/paths'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Always emit canonical-domain URLs, regardless of the serving host, so the
  // sitemap only ever submits karlbdouglas.com URLs for indexing.
  const base = SITE_URL
  const staticRoutes = [
    '', '/thinking', '/frameworks', '/frameworks/evolution-of-an-investment-philosophy',
    '/archive', '/research', '/about', '/watch', '/disclosures', '/privacy',
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))

  let dynamicEntries: MetadataRoute.Sitemap = []
  try {
    const rows = await prisma.contentEntry.findMany({
      // Research articles are published via the Soro embed (client-rendered) and
      // are not stored as content entries, so exclude any RESEARCH placeholders.
      where: { status: 'PUBLISHED', type: { not: 'RESEARCH' } },
      select: { type: true, slug: true, lastUpdated: true, publicationDate: true },
    })
    dynamicEntries = rows.map((r) => ({
      url: `${base}${entryHref({ type: r.type, slug: r.slug })}`,
      lastModified: r.lastUpdated ?? r.publicationDate ?? new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch {
    dynamicEntries = []
  }

  return [...staticEntries, ...dynamicEntries]
}
