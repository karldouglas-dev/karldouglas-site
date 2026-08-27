# Integration Guide — Adding "Anthropic and the $30 Trillion Question" to karlbdouglas.com

This guide explains how to publish the article on your Next.js site, add it to the **Thinking** page and the **Featured** section, wire up SEO, and choose imagery. It is written to work whether your Thinking content lives in MDX/Markdown files, a data array, or a headless setup.

---

## 1. What's in this package

| File | Purpose |
| :--- | :--- |
| `article_content.md` | The full article in clean Markdown with front-matter (title, slug, date, tags, description, `featured: true`, reading time). Use this as the content source. |
| `seo_metadata.json` | All SEO assets in one place: meta title/description, keywords, Open Graph, Twitter Card, canonical URL, publish date, and complete JSON-LD `Article` schema. |
| `article_page.html` | A fully styled, self-contained reference rendering (matches your site's cream background `#faf8f5`, Playfair Display headings, Inter body, and `#2759a5` accent). Use it to preview the intended look, hand to a designer, or publish as-is if you ever need a static fallback. |
| `integration_guide.md` | This document. |

**Recommended canonical values (already used across the files):**
- **Title (H1):** Anthropic and the $30 Trillion Question: How Do You Value Intelligence?
- **Slug:** `anthropic-30-trillion-question`
- **URL:** `https://karlbdouglas.com/thinking/anthropic-30-trillion-question`
- **Publish date:** 2026-08-27
- **Author:** Karl Douglas
- **Reading time:** ~14 min

---

## 2. Where to place the files

Next.js sites organize content in one of a few common ways. Match yours:

### Option A — App Router with MDX/Markdown content (most common for a "Thinking" blog)
```
/content/thinking/anthropic-30-trillion-question.md      ← rename article_content.md to this
/public/images/thinking/anthropic-30-trillion-question-hero.png
/public/images/thinking/anthropic-30-trillion-question-og.png
```
Then your existing `app/thinking/[slug]/page.tsx` route will pick it up by slug. The front-matter in `article_content.md` already provides the fields most loaders expect (`title`, `slug`, `date`, `description`, `tags`, `featured`, `readingTime`).

### Option B — Content stored in a data array (e.g. `lib/thinking.ts` / `data/essays.ts`)
Add a new entry using the metadata below and store the body separately (or import the Markdown). See §4 for the exact object.

### Option C — Static/exported page
If you prefer not to touch the content pipeline yet, drop `article_page.html` at `/public/thinking/anthropic-30-trillion-question/index.html`. It is fully self-contained (fonts via Google Fonts CDN, inline CSS, inline JSON-LD) and will render correctly on its own. This is the fastest path to going live, though it bypasses your site's shared header/layout.

> **Tip:** Whichever option you choose, keep the slug identical everywhere (`anthropic-30-trillion-question`) so the canonical URL, OG tags, and internal links all agree.

---

## 3. Add it to the Thinking page index

Your `/thinking` page renders a list of entries (Title → Summary → Status). Add this one at the **top** (it's the most recent) and mark it published rather than "In development":

- **Title:** Anthropic and the $30 Trillion Question: How Do You Value Intelligence?
- **Summary:** Anthropic's >$30 trillion TAM isn't a revenue forecast — it's AI-addressable economic activity. A framework for valuing intelligence: run-rate multiples, gross margins, and trust as a moat.
- **Status:** Published · Aug 27, 2026 · 14 min read
- **Link:** `/thinking/anthropic-30-trillion-question`
- **Category tag:** `Essay` (or `Investment Analysis`)

---

## 4. Add it to Featured / "Featured Thinking"

The homepage has a **Featured Thinking** section. Add this article there and set the featured flag.

If your featured list is a data array, use an object like this (adjust field names to match your schema):

```ts
{
  slug: "anthropic-30-trillion-question",
  type: "Essay",
  title: "Anthropic and the $30 Trillion Question: How Do You Value Intelligence?",
  summary:
    "Anthropic's >$30 trillion TAM isn't a revenue forecast — it's AI-addressable economic activity. A framework for valuing intelligence.",
  href: "/thinking/anthropic-30-trillion-question",
  date: "2026-08-27",
  readingTime: "14 min read",
  featured: true,
  tags: ["Anthropic", "AI valuation", "Frontier models", "Computational economy"],
}
```

The Markdown front-matter in `article_content.md` already sets `featured: true`, so if your homepage derives "Featured" by filtering content on that flag, no further change is needed.

---

## 5. Wire up SEO metadata

All values come from `seo_metadata.json`. In the **App Router**, export `generateMetadata` (or a static `metadata` object) on the article route:

```ts
// app/thinking/anthropic-30-trillion-question/page.tsx (or the [slug] route)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anthropic and the $30 Trillion Question: How Do You Value Intelligence? | Karl Douglas",
  description:
    "Anthropic's >$30 trillion TAM isn't a revenue forecast — it's AI-addressable economic activity. A framework for valuing intelligence: run-rate multiples, gross margins, and trust as a moat.",
  keywords: [
    "Anthropic valuation", "Anthropic $30 trillion TAM", "how to value AI companies",
    "AI valuation framework", "Claude enterprise AI", "frontier model economics",
    "AI gross margins", "computational economy", "AI value chain", "AI moat trust",
  ],
  authors: [{ name: "Karl Douglas", url: "https://karlbdouglas.com/about" }],
  alternates: { canonical: "https://karlbdouglas.com/thinking/anthropic-30-trillion-question" },
  openGraph: {
    type: "article",
    url: "https://karlbdouglas.com/thinking/anthropic-30-trillion-question",
    title: "Anthropic and the $30 Trillion Question: How Do You Value Intelligence?",
    description:
      "A $2T valuation is 31x today's run rate but only 10x the 2028 forecast. Why gross margins and trust — not the headline TAM — may decide what Anthropic is really worth.",
    siteName: "Karl B. Douglas",
    publishedTime: "2026-08-27T09:00:00-04:00",
    images: [{ url: "https://pbs.twimg.com/media/HQh79r5a0AAh5w8.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@karlbdouglas",
    creator: "@karlbdouglas",
    title: "Anthropic and the $30 Trillion Question: How Do You Value Intelligence?",
    description:
      "A $2T valuation is 31x today's run rate but only 10x the 2028 forecast. Why gross margins and trust may decide what Anthropic is worth.",
    images: ["https://imageio.forbes.com/specials-images/imageserve/6a7f687458fc3337681e2791/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds
  },
};
```

### JSON-LD structured data
Add the `jsonLd` object from `seo_metadata.json` to the page so Google can render a rich result. In a Server Component:

```tsx
import seo from "@/content/thinking/anthropic-30-trillion-question.seo.json"; // or import the jsonLd inline

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
      />
      {/* ...article body... */}
    </>
  );
}
```

### Don't forget the sitemap & RSS
- Add `/thinking/anthropic-30-trillion-question` to `app/sitemap.ts` (or your sitemap generator) with `lastModified: "2026-08-27"`.
- If you publish an RSS/Atom feed, add this entry so subscribers get it.

---

## 6. Metadata to update (checklist)

- [ ] **Canonical URL** consistent everywhere: `https://karlbdouglas.com/thinking/anthropic-30-trillion-question`
- [ ] **Publish date** set to `2026-08-27` (adjust if you post on a different day).
- [ ] **Author** shown as `Karl Douglas` with a link to `/about`.
- [ ] **OG image** exists at `/images/thinking/anthropic-30-trillion-question-og.png` (1200×630). Until you create one, point `ogImage` to an existing default share image so links don't render blank.
- [ ] **Twitter handle** — I used `@karlbdouglas` as a placeholder in `seo_metadata.json`. Replace with your real handle or remove the `site`/`creator` fields if you don't have one.
- [ ] **Featured flag** enabled on the homepage.
- [ ] **Sitemap** and **RSS** updated.

---

## 7. Suggested internal linking strategy

Internal links help SEO and keep readers on the site. Add these where they fit naturally:

**Link *into* this article from:**
- The homepage **Featured Thinking** card (primary entry point).
- Your **Computational Economy** framework page — the article explicitly develops that concept ("I have increasingly come to think about artificial intelligence in the context of a broader Computational Economy"). This is your strongest topical link.
- Any existing essay on AI, valuation, or technology inflection points — add a "Related reading" link.
- The **Thesis Archive**, under an AI / technology or capital-markets category.

**Link *out of* this article to (add these as hyperlinks in the body):**
- The phrase **"Computational Economy"** → your Computational Economy framework page.
- Mentions of **trust / governance as a moat** → any related framework or thesis you've written on durable competitive advantage.
- The **About** / **Covenant** page from the author byline and disclosure (the disclosure references Covenant Venture Capital, LLC).
- If you have prior pieces on **semiconductors, hyperscalers, or agentic AI**, link the corresponding sections ("Semiconductors May Have a Stronger Moat…", "The Agent Layer…").

**Anchor-text tip:** Use descriptive anchors ("my framework for the Computational Economy") rather than "click here" — better for both readers and search.

---

## 8. Image recommendations

You'll want two images. Both should feel editorial and restrained to match the site.

### Hero image (top of article) — ~1600×900 (16:9)
Options, in order of preference:
1. **Editorial illustration of Anthropic's HQ** (the original PDF used an illustration of 500 Howard Street, San Francisco). A clean line-art or muted illustration reads as "premium editorial."
2. **Abstract data/typographic hero** — a large "$30T" or an upward revenue curve on a deep navy field (`#1c2b45 → #2759a5` gradient, which the reference HTML already uses as a CSS fallback). This needs no licensing.
3. **Conceptual "intelligence / network" abstract** — subtle, desaturated, not stocky.

Save as: `/public/images/thinking/anthropic-30-trillion-question-hero.png`
Alt text: *"Editorial illustration accompanying an analysis of how to value AI intelligence and Anthropic's $30 trillion addressable market."*

### Social sharing image (Open Graph / Twitter) — **1200×630 (required)**
- Put the **title** and a one-line hook on a `#faf8f5` or deep-navy background.
- Include **"Karl B. Douglas"** and the site URL for brand recall.
- Keep text large and within the safe center area (avoid edges — some platforms crop).
- Save as: `/public/images/thinking/anthropic-30-trillion-question-og.png`

> **Licensing note:** Avoid using third-party logos (Anthropic, competitors) as the hero or OG image for a commercial/personal-brand site unless you have rights. An abstract or original illustration is the safest choice. If you use any AI-generated or stock image, keep a record of its source/license.

### Quick no-design fallback
The reference `article_page.html` renders a navy gradient "headline number" block instead of a hero photo — you can screenshot that block (or reuse the same gradient) as a temporary hero/OG image until a designed asset is ready.

---

## 9. Pre-publish QA

- [ ] Article loads at the canonical URL and the slug matches everywhere.
- [ ] Both data tables render and are horizontally scrollable on mobile.
- [ ] The Disclosure section appears at the end (legal/compliance requirement — it names Covenant Venture Capital, LLC).
- [ ] `next build` passes with no MDX/metadata errors.
- [ ] Validate structured data with Google's **Rich Results Test** (paste the live URL).
- [ ] Preview the share card with the **Facebook Sharing Debugger** and **X/Twitter Card Validator**; re-scrape after the OG image is uploaded.
- [ ] Confirm the article appears in **Featured** on the homepage and at the top of **/thinking**.
- [ ] Check reading experience on mobile (typography, table scroll, TOC).

---

### Summary
Publish `article_content.md` at the `anthropic-30-trillion-question` slug, apply the metadata from `seo_metadata.json` (including JSON-LD), flag it `featured`, add it to the top of `/thinking`, create the 1200×630 OG image, and link it to/from your Computational Economy framework. Use `article_page.html` as your visual reference — it already matches the site's palette and typography.
