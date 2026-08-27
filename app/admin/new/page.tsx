import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { prisma } from '@/lib/db'
import { EntryForm } from '../entry-form'
import { emptyFormData } from '@/lib/admin-form'

export const dynamic = 'force-dynamic'

async function getMeta() {
  try {
    const [categories, tags] = await Promise.all([
      prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
      prisma.tag.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    ])
    return { categories, tags }
  } catch {
    return { categories: [], tags: [] }
  }
}

export default async function NewEntryPage() {
  const { categories, tags } = await getMeta()
  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back to content
      </Link>
      <h1 className="mb-6 font-display text-3xl font-semibold tracking-tight text-foreground">New entry</h1>
      <EntryForm mode="new" initial={emptyFormData()} categories={categories} tags={tags} />
    </div>
  )
}
