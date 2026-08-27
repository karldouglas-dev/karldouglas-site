import Link from 'next/link'
import { Plus, Pencil, FileText } from 'lucide-react'
import { prisma } from '@/lib/db'
import { CONTENT_TYPE_LABEL, formatDate, isForthcoming } from '@/lib/format'
import { entryHref } from '@/lib/paths'

export const dynamic = 'force-dynamic'

const TYPE_ORDER = ['ESSAY', 'FRAMEWORK', 'ARCHIVE', 'VIDEO', 'INTERVIEW', 'COMMENTARY', 'ABOUT'] as const

async function getEntries() {
  try {
    return await prisma.contentEntry.findMany({
      include: { category: true },
      orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
    })
  } catch {
    return []
  }
}

export default async function AdminDashboard() {
  const entries = await getEntries()
  const grouped = TYPE_ORDER.map((type) => ({
    type,
    items: entries.filter((e) => e.type === type),
  })).filter((g) => g.items.length > 0)

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">Content</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} across the archive.
          </p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New entry
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="mt-12 rounded-sm border border-dashed border-border bg-secondary/30 px-6 py-16 text-center">
          <FileText className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-3 font-display text-lg text-foreground">No entries yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Create your first piece to get started.</p>
        </div>
      ) : (
        <div className="mt-10 space-y-10">
          {grouped.map((group) => (
            <section key={group.type}>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {CONTENT_TYPE_LABEL[group.type] ?? group.type}
              </h2>
              <div className="overflow-hidden rounded-sm border border-border">
                {group.items.map((e, i) => (
                  <div
                    key={e.id}
                    className={`flex flex-wrap items-center justify-between gap-3 bg-card px-4 py-3 ${
                      i > 0 ? 'border-t border-border' : ''
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium text-foreground">{e.title}</span>
                        <StatusBadge status={e.status} />
                        {isForthcoming(e.body) && !e.videoEmbedUrl && (
                          <span className="rounded-sm bg-secondary px-1.5 py-0.5 text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                            Placeholder
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        /{e.slug}
                        {e.publicationDate ? ` · ${formatDate(e.publicationDate)}` : ''}
                        {e.category ? ` · ${e.category.name}` : ''}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {e.status === 'PUBLISHED' && (
                        <Link
                          href={entryHref(e)}
                          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                          target="_blank"
                        >
                          View
                        </Link>
                      )}
                      <Link
                        href={`/admin/${e.id}`}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const published = status === 'PUBLISHED'
  return (
    <span
      className={`rounded-sm px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide ${
        published ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </span>
  )
}
