import { prisma } from '@/lib/db'
import { Prisma, ContentType } from '@prisma/client'

const entryInclude = {
  category: true,
  tags: true,
} satisfies Prisma.ContentEntryInclude

const entryDetailInclude = {
  category: true,
  tags: true,
  relatedTo: { include: { category: true } },
  relatedFrom: { include: { category: true } },
} satisfies Prisma.ContentEntryInclude

export type EntryCard = Prisma.ContentEntryGetPayload<{ include: typeof entryInclude }>
export type EntryDetail = Prisma.ContentEntryGetPayload<{ include: typeof entryDetailInclude }>

export async function getFeaturedThinking(limit = 3): Promise<EntryCard[]> {
  try {
    return await prisma.contentEntry.findMany({
      where: { status: 'PUBLISHED', featured: true, type: { in: ['ESSAY', 'FRAMEWORK', 'ARCHIVE'] } },
      include: entryInclude,
      orderBy: [{ sortOrder: 'asc' }, { publicationDate: 'desc' }],
      take: limit,
    })
  } catch {
    return []
  }
}

export async function getLatest(limit = 5): Promise<EntryCard[]> {
  try {
    return await prisma.contentEntry.findMany({
      // Only real, published, dated content appears in the "Latest" feed — never
      // placeholders or undated items. Until such content exists, the feed is empty
      // and the homepage section is hidden (no manufactured completeness).
      where: {
        status: 'PUBLISHED',
        bodyPlaceholder: false,
        publicationDate: { not: null },
        type: { in: ['ESSAY', 'ARCHIVE', 'VIDEO', 'INTERVIEW', 'COMMENTARY'] },
      },
      include: entryInclude,
      orderBy: [{ publicationDate: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    })
  } catch {
    return []
  }
}

export async function getResearch(): Promise<EntryCard[]> {
  try {
    return await prisma.contentEntry.findMany({
      where: { status: 'PUBLISHED', type: 'RESEARCH' },
      include: entryInclude,
      orderBy: [
        { featured: 'desc' },
        { sortOrder: 'asc' },
        { publicationDate: 'desc' },
        { createdAt: 'desc' },
      ],
    })
  } catch {
    return []
  }
}

export async function getByType(type: ContentType): Promise<EntryCard[]> {
  try {
    return await prisma.contentEntry.findMany({
      where: { status: 'PUBLISHED', type },
      include: entryInclude,
      orderBy: [{ sortOrder: 'asc' }, { publicationDate: 'desc' }, { originalPublicationDate: 'desc' }],
    })
  } catch {
    return []
  }
}

export async function getBySlug(slug: string): Promise<EntryDetail | null> {
  try {
    return await prisma.contentEntry.findUnique({
      where: { slug },
      include: entryDetailInclude,
    })
  } catch {
    return null
  }
}

export async function getSlugsByType(type: ContentType): Promise<string[]> {
  try {
    const rows = await prisma.contentEntry.findMany({
      where: { status: 'PUBLISHED', type },
      select: { slug: true },
    })
    return rows.map((r) => r.slug)
  } catch {
    return []
  }
}

export async function getAllEntries(): Promise<EntryCard[]> {
  try {
    return await prisma.contentEntry.findMany({
      include: entryInclude,
      orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
    })
  } catch {
    return []
  }
}
