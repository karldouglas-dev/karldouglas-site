// Deterministic, SSR-safe date formatting (fixed locale + UTC timezone).
export function formatDate(
  date: Date | string | null | undefined,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d?.getTime?.() ?? NaN)) return ''
  return new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' }).format(d)
}

export function formatYear(date: Date | string | null | undefined): string {
  return formatDate(date, { year: 'numeric', timeZone: 'UTC' } as Intl.DateTimeFormatOptions)
}

export const CONTENT_TYPE_LABEL: Record<string, string> = {
  ESSAY: 'Essay',
  FRAMEWORK: 'Framework',
  ARCHIVE: 'Thesis Archive',
  RESEARCH: 'Research',
  VIDEO: 'Video',
  INTERVIEW: 'Interview',
  COMMENTARY: 'Commentary',
  ABOUT: 'About',
}

export const FORTHCOMING = '__FORTHCOMING__'
export function isForthcoming(value: string | null | undefined): boolean {
  return !value || value === FORTHCOMING
}
