import type { Metadata } from 'next'
import { getByType } from '@/lib/content'
import { ContentCard } from '@/components/content-card'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Thinking',
  description:
    'Essays on pattern recognition, evidence over prediction, convergence, and how structural change becomes investable.',
  alternates: { canonical: '/thinking' },
}

export default async function ThinkingIndex() {
  const essays = await getByType('ESSAY')
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Thinking' }]} />
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Thinking</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          Original essays on how technological, economic, and capital-market change becomes
          investable&mdash;pattern recognition, evidence over prediction, convergence, and the
          structural forces that reshape industries.
        </p>
      </header>

      {essays.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {essays.map((e) => (
            <ContentCard key={e.id} entry={e} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-muted-foreground">Essays are being prepared and will appear here soon.</p>
      )}
    </div>
  )
}
