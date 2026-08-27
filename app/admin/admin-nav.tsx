'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export function AdminNav({ email }: { email: string }) {
  return (
    <div className="flex items-center gap-4">
      {email && <span className="hidden text-sm text-muted-foreground sm:inline">{email}</span>}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: '/' })}
        className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  )
}
