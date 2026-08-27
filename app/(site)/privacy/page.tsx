import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How information is handled on this website.',
  alternates: { canonical: '/privacy' },
}

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: 'Overview',
    body: [
      'This website is a personal publishing site for the writing and commentary of Karl B. Douglas. It is designed to be read without requiring visitors to create an account or submit personal information.',
    ],
  },
  {
    heading: 'Information collected',
    body: [
      'The public pages of this site do not require you to provide personal information in order to read the content. As with most websites, standard technical information (such as browser type and general usage data) may be processed by the hosting infrastructure to operate and secure the site.',
      'A separate, password-protected administrative area exists for publishing content. Accounts in that area are limited to authorized editors, and the credentials associated with them are stored securely.',
    ],
  },
  {
    heading: 'How information is used',
    body: [
      'Any information processed is used solely to operate, maintain, secure, and improve the website. It is not sold, and it is not used for advertising or profiling.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'Essential cookies may be used to support core functionality, such as keeping an authorized editor signed in to the administrative area. The public reading experience does not depend on tracking cookies.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'For questions about this website or how information is handled, please reach out through the professional channels linked in the site footer.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">Legal</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Privacy
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          A plain-language summary of how information is handled on this website.
        </p>
      </header>

      <div className="mt-12 max-w-2xl space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">{s.heading}</h2>
            <div className="mt-3 space-y-4">
              {s.body.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
