import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin, parseEntryPayload } from '@/lib/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const entries = await prisma.contentEntry.findMany({
      include: { category: true, tags: true },
      orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json({ entries })
  } catch {
    return NextResponse.json({ error: 'Failed to load entries.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json().catch(() => ({}))
    const { data, categoryId, tagIds } = parseEntryPayload(body ?? {})

    const existing = await prisma.contentEntry.findUnique({ where: { slug: data.slug as string } })
    if (existing) {
      return NextResponse.json({ error: 'An entry with this slug already exists.' }, { status: 409 })
    }

    const created = await prisma.contentEntry.create({
      data: {
        ...(data as any),
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        tags: tagIds.length ? { connect: tagIds.map((id) => ({ id })) } : undefined,
      },
    })
    return NextResponse.json({ entry: created }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create entry.' }, { status: 500 })
  }
}
