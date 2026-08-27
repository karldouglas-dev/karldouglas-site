import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AdminNav } from './admin-nav'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/login?callbackUrl=/admin')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-lg font-semibold tracking-tight text-foreground">
              Workspace
            </Link>
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              View site
            </Link>
          </div>
          <AdminNav email={session.user.email ?? ''} />
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">{children}</main>
    </div>
  )
}
