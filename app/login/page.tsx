import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to the editorial workspace.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Karl B. Douglas
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Editorial workspace</p>
        </div>
        <div className="rounded-sm border border-border bg-card p-8 shadow-sm">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">Sign in</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Access the workspace to manage published writing.
          </p>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Need an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            &larr; Back to the site
          </Link>
        </p>
      </div>
    </main>
  )
}
