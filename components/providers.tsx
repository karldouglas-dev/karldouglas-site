'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
        {children}
        <Toaster />
        <ChunkLoadErrorHandler />
      </ThemeProvider>
    </SessionProvider>
  )
}
