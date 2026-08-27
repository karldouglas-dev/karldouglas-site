import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Returns the session if the request is from an authenticated admin, else null.
export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null
  return session
}

const CONTENT_TYPES = ['ESSAY', 'FRAMEWORK', 'ARCHIVE', 'VIDEO', 'INTERVIEW', 'COMMENTARY', 'ABOUT'] as const
const STATUSES = ['DRAFT', 'PUBLISHED'] as const
const COMPLIANCE = ['GREEN', 'YELLOW', 'RED'] as const

function toStr(v: unknown): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim()
  return t.length ? t : null
}

function toDate(v: unknown): Date | null {
  const s = toStr(v)
  if (!s) return null
  const d = new Date(s)
  return isNaN(d.getTime()) ? null : d
}

function toInt(v: unknown): number | null {
  if (v === null || v === undefined || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? Math.trunc(n) : null
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

// Builds a Prisma-ready data object from a raw request body. `tagIds` and
// `relatedIds` are returned separately for relation handling by the caller.
export function parseEntryPayload(body: Record<string, unknown>) {
  const title = toStr(body?.title) ?? 'Untitled'
  let slug = toStr(body?.slug)
  if (!slug) slug = slugify(title)
  else slug = slugify(slug)

  const type = CONTENT_TYPES.includes(body?.type as never) ? (body?.type as string) : 'ESSAY'
  const status = STATUSES.includes(body?.status as never) ? (body?.status as string) : 'DRAFT'
  const complianceLevel = COMPLIANCE.includes(body?.complianceLevel as never)
    ? (body?.complianceLevel as string)
    : 'GREEN'

  const data: Record<string, unknown> = {
    type,
    status,
    title,
    slug,
    subtitle: toStr(body?.subtitle),
    summary: toStr(body?.summary),
    body: toStr(body?.body),
    bodyPlaceholder: Boolean(body?.bodyPlaceholder),
    author: toStr(body?.author) ?? 'Karl B. Douglas',
    publicationDate: toDate(body?.publicationDate),
    originalPublicationDate: toDate(body?.originalPublicationDate),
    featuredImage: toStr(body?.featuredImage),
    readingTime: toInt(body?.readingTime),
    videoEmbedUrl: toStr(body?.videoEmbedUrl),
    transcript: toStr(body?.transcript),
    externalSourceLink: toStr(body?.externalSourceLink),
    externalSourceName: toStr(body?.externalSourceName),
    disclosureText: toStr(body?.disclosureText),
    complianceLevel,
    seoTitle: toStr(body?.seoTitle),
    metaDescription: toStr(body?.metaDescription),
    canonicalUrl: toStr(body?.canonicalUrl),
    ogImage: toStr(body?.ogImage),
    sortOrder: toInt(body?.sortOrder) ?? 0,
    featured: Boolean(body?.featured),
    originalSource: toStr(body?.originalSource),
    originalThesis: toStr(body?.originalThesis),
    retrospectiveContext: toStr(body?.retrospectiveContext),
    retrospectiveWhatRight: toStr(body?.retrospectiveWhatRight),
    retrospectiveUnderestimated: toStr(body?.retrospectiveUnderestimated),
    retrospectiveLearned: toStr(body?.retrospectiveLearned),
  }

  const categoryId = toStr(body?.categoryId)
  const tagIds = Array.isArray(body?.tagIds) ? (body?.tagIds as unknown[]).filter((x) => typeof x === 'string') as string[] : []

  return { data, categoryId, tagIds }
}
