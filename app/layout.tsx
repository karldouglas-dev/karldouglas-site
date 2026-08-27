import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { SITE_URL, absoluteUrl } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Karl B. Douglas — Investor. Strategist. Student of consequential change.',
    template: '%s — Karl B. Douglas',
  },
  description:
    'Karl B. Douglas studies technological, economic, and capital-market inflection points—looking for patterns that reveal when structural change is becoming investable.',
  keywords: [
    'Karl B. Douglas', 'Covenant', 'Chief Investment Officer', 'investor', 'strategist',
    'Computational Economy', 'Three Trigger Methodology', 'Pattern Recognition',
    'Super Tanker Trades', 'private markets', 'artificial intelligence',
  ],
  authors: [{ name: 'Karl B. Douglas' }],
  creator: 'Karl B. Douglas',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    title: 'Karl B. Douglas — Investor. Strategist. Student of consequential change.',
    description:
      'A durable public record of original investment thinking—pattern recognition, frameworks, and a dated thesis archive.',
    url: SITE_URL,
    siteName: 'Karl B. Douglas',
    images: [{ url: absoluteUrl('/og-image.png'), width: 1200, height: 630, alt: 'Karl B. Douglas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karl B. Douglas',
    description: 'Investor. Strategist. Student of consequential change.',
    images: [absoluteUrl('/og-image.png')],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Providers>{children}</Providers>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" async />
      </body>
    </html>
  )
}
