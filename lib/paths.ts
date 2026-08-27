import { ContentType } from '@prisma/client'

export function entryHref(entry: { type: ContentType; slug: string }): string {
  switch (entry?.type) {
    case 'ESSAY':
    case 'INTERVIEW':
    case 'COMMENTARY':
      return `/thinking/${entry.slug}`
    case 'FRAMEWORK':
      return `/frameworks/${entry.slug}`
    case 'ARCHIVE':
      return `/archive/${entry.slug}`
    case 'RESEARCH':
      return `/research/${entry.slug}`
    case 'VIDEO':
      return `/watch/${entry.slug}`
    default:
      return `/thinking/${entry?.slug ?? ''}`
  }
}
