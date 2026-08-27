import { NextRequest, NextResponse } from 'next/server'
import { getFileUrl } from '@/lib/s3'
import { requireAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json().catch(() => ({}))
    const cloud_storage_path = typeof body?.cloud_storage_path === 'string' ? body.cloud_storage_path : null
    const contentType = typeof body?.contentType === 'string' ? body.contentType : 'image/jpeg'
    if (!cloud_storage_path) {
      return NextResponse.json({ error: 'cloud_storage_path is required.' }, { status: 400 })
    }
    const url = await getFileUrl(cloud_storage_path, contentType, true)
    return NextResponse.json({ url, cloud_storage_path })
  } catch {
    return NextResponse.json({ error: 'Failed to complete upload.' }, { status: 500 })
  }
}
