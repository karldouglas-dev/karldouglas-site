import type { EntryFormData } from '@/app/admin/entry-form'

function dateInput(d: Date | string | null | undefined): string {
  if (!d) return ''
  const date = typeof d === 'string' ? new Date(d) : d
  if (isNaN(date.getTime())) return ''
  return date.toISOString().slice(0, 10)
}

export function emptyFormData(): EntryFormData {
  return {
    type: 'ESSAY',
    status: 'DRAFT',
    title: '',
    subtitle: '',
    slug: '',
    summary: '',
    body: '',
    bodyPlaceholder: false,
    author: 'Karl B. Douglas',
    publicationDate: '',
    originalPublicationDate: '',
    categoryId: '',
    tagIds: [],
    featuredImage: '',
    readingTime: '',
    videoEmbedUrl: '',
    transcript: '',
    externalSourceLink: '',
    externalSourceName: '',
    disclosureText: '',
    complianceLevel: 'GREEN',
    seoTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    ogImage: '',
    sortOrder: '0',
    featured: false,
    originalSource: '',
    originalThesis: '',
    retrospectiveContext: '',
    retrospectiveWhatRight: '',
    retrospectiveUnderestimated: '',
    retrospectiveLearned: '',
  }
}

export function entryToFormData(e: any): EntryFormData {
  return {
    id: e?.id,
    type: e?.type ?? 'ESSAY',
    status: e?.status ?? 'DRAFT',
    title: e?.title ?? '',
    subtitle: e?.subtitle ?? '',
    slug: e?.slug ?? '',
    summary: e?.summary ?? '',
    body: e?.body === '__FORTHCOMING__' ? '' : e?.body ?? '',
    bodyPlaceholder: Boolean(e?.bodyPlaceholder),
    author: e?.author ?? 'Karl B. Douglas',
    publicationDate: dateInput(e?.publicationDate),
    originalPublicationDate: dateInput(e?.originalPublicationDate),
    categoryId: e?.categoryId ?? '',
    tagIds: Array.isArray(e?.tags) ? e.tags.map((t: { id: string }) => t.id) : [],
    featuredImage: e?.featuredImage ?? '',
    readingTime: e?.readingTime != null ? String(e.readingTime) : '',
    videoEmbedUrl: e?.videoEmbedUrl ?? '',
    transcript: e?.transcript === '__FORTHCOMING__' ? '' : e?.transcript ?? '',
    externalSourceLink: e?.externalSourceLink ?? '',
    externalSourceName: e?.externalSourceName ?? '',
    disclosureText: e?.disclosureText ?? '',
    complianceLevel: e?.complianceLevel ?? 'GREEN',
    seoTitle: e?.seoTitle ?? '',
    metaDescription: e?.metaDescription ?? '',
    canonicalUrl: e?.canonicalUrl ?? '',
    ogImage: e?.ogImage ?? '',
    sortOrder: e?.sortOrder != null ? String(e.sortOrder) : '0',
    featured: Boolean(e?.featured),
    originalSource: e?.originalSource ?? '',
    originalThesis: e?.originalThesis ?? '',
    retrospectiveContext: e?.retrospectiveContext ?? '',
    retrospectiveWhatRight: e?.retrospectiveWhatRight ?? '',
    retrospectiveUnderestimated: e?.retrospectiveUnderestimated ?? '',
    retrospectiveLearned: e?.retrospectiveLearned ?? '',
  }
}
