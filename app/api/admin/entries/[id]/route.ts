import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin, parseEntryPayload } from '@/lib/admin'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const entry = await prisma.contentEntry.findUnique({
      where: { id: params.id },
      include: { category: true, tags: true },
    })
    if (!entry) return NextResponse.json({ error: 'Not found.' }, { status: 404 })
    return NextResponse.json({ entry })
  } catch {
    return NextResponse.json({ error: 'Failed to load entry.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json().catch(() => ({}))
    const { data, categoryId, tagIds } = parseEntryPayload(body ?? {})

    const clash = await prisma.contentEntry.findFirst({
      where: { slug: data.slug as string, NOT: { id: params.id } },
    })
    if (clash) {
      return NextResponse.json({ error: 'Another entry already uses this slug.' }, { status: 409 })
    }

    const updated = await prisma.contentEntry.update({
      where: { id: params.id },
      data: {
        ...(data as any),
        category: categoryId ? { connect: { id: categoryId } } : { disconnect: true },
        tags: { set: tagIds.map((id) => ({ id })) },
      },
    })
    return NextResponse.json({ entry: updated })
  } catch {
    return NextResponse.json({ error: 'Failed to update entry.' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await prisma.contentEntry.update({
      where: { id: params.id },
      data: { relatedTo: { set: [] }, relatedFrom: { set: [] }, tags: { set: [] } },
    })
    await prisma.contentEntry.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete entry.' }, { status: 500 })
  }
}
