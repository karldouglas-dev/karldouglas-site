import { NextRequest, NextResponse } from 'next/server'
import { generatePresignedUploadUrl } from '@/lib/s3'
import { requireAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json().catch(() => ({}))
    const fileName = typeof body?.fileName === 'string' ? body.fileName : null
    const contentType = typeof body?.contentType === 'string' ? body.contentType : 'application/octet-stream'
    if (!fileName) {
      return NextResponse.json({ error: 'fileName is required.' }, { status: 400 })
    }
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
    // Featured images are public display assets.
    const { uploadUrl, cloud_storage_path } = await generatePresignedUploadUrl(safeName, contentType, true)
    return NextResponse.json({ uploadUrl, cloud_storage_path })
  } catch {
    return NextResponse.json({ error: 'Failed to prepare upload.' }, { status: 500 })
  }
}
