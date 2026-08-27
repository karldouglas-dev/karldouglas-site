import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { prisma } from '@/lib/db'
import { EntryForm } from '../entry-form'
import { entryToFormData } from '@/lib/admin-form'

export const dynamic = 'force-dynamic'

async function getData(id: string) {
  try {
    const [entry, categories, tags] = await Promise.all([
      prisma.contentEntry.findUnique({ where: { id }, include: { tags: true } }),
      prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
      prisma.tag.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    ])
    return { entry, categories, tags }
  } catch {
    return { entry: null, categories: [], tags: [] }
  }
}

export default async function EditEntryPage({ params }: { params: { id: string } }) {
  const { entry, categories, tags } = await getData(params.id)
  if (!entry) notFound()

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back to content
      </Link>
      <h1 className="mb-1 font-display text-3xl font-semibold tracking-tight text-foreground">Edit entry</h1>
      <p className="mb-6 text-sm text-muted-foreground">{entry.title}</p>
      <EntryForm mode="edit" initial={entryToFormData(entry)} categories={categories} tags={tags} />
    </div>
  )
}
