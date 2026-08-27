# karlbdouglas.com

The source for **karlbdouglas.com** — the personal site of Karl B. Douglas
(essays, frameworks, and archive under *Thinking*). It is a
[Next.js](https://nextjs.org/) App Router application backed by
PostgreSQL via [Prisma](https://www.prisma.io/). Content is **data‑driven**:
essays live as `ContentEntry` rows in the database, not as loose markdown
files. New content is added by editing the seed script (below) or through the
admin panel, then applied to the database.

---

## Tech stack

| Layer      | Choice                                             |
|------------|----------------------------------------------------|
| Framework  | Next.js (App Router) + React + TypeScript          |
| Styling    | Tailwind CSS                                        |
| Database   | PostgreSQL                                          |
| ORM        | Prisma                                              |
| Auth       | NextAuth (admin panel)                              |
| Media      | AWS S3 (admin uploads)                              |

---

## Local setup

> Requires Node.js 18+ and a reachable PostgreSQL database. This project uses
> **Yarn** (a `yarn.lock` is committed).

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Fill in real values in `.env` (at minimum `DATABASE_URL`). `.env` is
   git‑ignored and must **never** be committed.

3. **Generate the Prisma client and create the schema**
   ```bash
   yarn prisma generate
   yarn prisma db push
   ```

4. **Seed content** (safe, idempotent — see note below)
   ```bash
   yarn prisma db seed
   ```

5. **Run the dev server**
   ```bash
   yarn dev
   ```
   The site is served at http://localhost:3000.

### Other scripts

```bash
yarn build   # production build
yarn start   # run the production build
yarn lint    # eslint
```

---

## How the seed works (safe by design)

The seed entry point is `scripts/safe-seed.ts` (wired to `yarn prisma db seed`).
Before running the actual seed it **scans `scripts/seed.ts` and aborts if it finds
any `prisma.*.delete(...)` or `prisma.*.deleteMany(...)` calls**, because the
development and production databases can be shared. The seed itself uses
**upserts** (`upsertEntry`), so re‑running it updates existing rows and inserts
new ones without destroying data.

> ⚠️ Running `yarn prisma db seed` against the **production** database is what
> actually publishes new/updated content to the live site. Editing `seed.ts` and
> merging a PR does **not** by itself change the live database.

---

## How to add a new *Thinking* essay

All essays are defined in the `essays` array in **`scripts/seed.ts`**. To add one:

1. **Write the body as a template‑literal string.** For a long essay, define a
   `const MY_ESSAY_BODY = \`...\`` above the `essays` array (see
   `ANTHROPIC_30T_BODY` for a worked example) and reference it in the entry.

2. **Add an entry** to the `essays` array:
   ```ts
   {
     type: 'ESSAY',                       // ESSAY | FRAMEWORK | ARCHIVE
     title: 'Your Title',
     subtitle: 'Optional subtitle',
     slug: 'your-title-slug',             // unique, URL‑safe
     body: MY_ESSAY_BODY,
     excerpt: 'One–two sentence summary shown in listings.',
     categorySlug: 'artificial-intelligence',
     tags: ['Tag One', 'Tag Two'],
     readingTime: 12,                     // minutes
     featured: true,                      // show on home / featured rail
     sortOrder: 0,                        // lower = earlier among featured
     publicationDate: new Date('2026-08-27'),
     status: 'PUBLISHED',
     // SEO
     seoTitle: 'Your Title: Optional SEO Suffix',
     metaDescription: 'Up to ~155 characters for search snippets.',
     // Compliance / disclosure
     disclosureText: MY_ESSAY_DISCLOSURE, // or omit
     complianceLevel: 'GREEN',
   }
   ```

3. **Apply it** by running `yarn prisma db seed` against the target database.

### ⚠️ Body markdown is a restricted subset

Essay bodies are rendered by the **custom, dependency‑free renderer** in
`lib/markdown.tsx` — *not* a full markdown engine. Only the following are
supported, and **blocks must be separated by blank lines**:

| Supported                     | Syntax                          |
|-------------------------------|---------------------------------|
| Heading level 2               | `## Heading`                    |
| Heading level 3               | `### Heading`                   |
| Blockquote                    | `> quoted line`                 |
| Bullet list                   | `- item` (every line in the block) |
| Bold                          | `**bold**`                      |
| Link                          | `[text](https://url)`           |

**Not supported** (avoid — they will render as literal text): tables,
numbered lists, single‑asterisk `*italics*`, images, horizontal rules (`---`),
inline HTML, and headings deeper than `###`.

Because blocks split on blank lines, always put a **blank line between a heading
and the following paragraph or list**, e.g.

```
## TL;DR

- first point
- second point
```

not

```
## TL;DR
- first point   ← this would be swallowed into the heading
```

---

## Project layout

```
app/                 Next.js App Router (site + admin)
  (site)/thinking/   Thinking index + [slug] article pages
components/           React components
lib/                 content helpers, markdown renderer (markdown.tsx)
prisma/              schema.prisma
scripts/             seed.ts (content) + safe-seed.ts (guard)
content/             archive source materials
public/              static assets
```

---

## Notes

- `.env` and any secrets are git‑ignored; use `.env.example` as the template.
- The live site's database is separate from any local database. Content becomes
  live only after the seed (or an admin‑panel edit) is applied to the
  production database and the site is redeployed if needed.
