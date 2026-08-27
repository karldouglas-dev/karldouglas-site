# karldouglas-site — Content

Content repository for **[karlbdouglas.com](https://karlbdouglas.com)** — the personal site of Karl B. Douglas (Investor · Strategist · Student of consequential change).

This repository holds the **article content** (Thinking essays, their metadata, and rendered references) that powers the site's *Thinking* and *Featured* sections. It is designed to be consumed by the site's Next.js content pipeline (MDX/Markdown, a data array, or a static fallback).

> **Note:** This repo currently contains site *content*, not the full Next.js application source. Articles are stored as self-contained folders that can be wired into the existing site (see `integration_guide.md`).

---

## Repository structure

```
.
├── README.md                     # This file
├── integration_guide.md          # How to wire an article into the Next.js site (SEO, routing, featured, images)
├── content/
│   ├── featured.json             # Manifest of featured articles (ordered; first = most prominent)
│   ├── featured/                 # (reserved) optional per-feature assets/overrides
│   └── thinking/                 # One folder per Thinking article, keyed by slug
│       └── anthropic-30-trillion-question/
│           ├── index.md          # Article body (Markdown + YAML front-matter) — the content source
│           ├── article.html      # Self-contained, styled HTML reference rendering / static fallback
│           ├── seo_metadata.json # Meta title/description, keywords, Open Graph, Twitter Card, JSON-LD
│           └── Anthropic_30_Trillion_Question.pdf  # Original source PDF
```

### What each file is for

| File | Purpose |
| :--- | :--- |
| `content/thinking/<slug>/index.md` | The canonical article content. YAML front-matter provides `title`, `slug`, `author`, `date`, `category`, `tags`, `description`, `featured`, `readingTime`. |
| `content/thinking/<slug>/article.html` | A fully styled, standalone rendering that matches the site's look. Use as a design reference or static fallback. |
| `content/thinking/<slug>/seo_metadata.json` | All SEO assets in one place, including a complete schema.org `Article` JSON-LD block. |
| `content/thinking/<slug>/*.pdf` | Original source document, kept for provenance. |
| `content/featured.json` | Ordered list of featured articles surfaced on the homepage. |
| `integration_guide.md` | Step-by-step guide for publishing an article on the Next.js site. |

---

## How to add a new article

1. **Create the folder** using the article's slug (kebab-case):
   ```
   content/thinking/<your-article-slug>/
   ```
2. **Add `index.md`** with YAML front-matter at the top. Minimum fields:
   ```yaml
   ---
   title: "Your Article Title"
   slug: "your-article-slug"
   author: "Karl Douglas"
   date: "YYYY-MM-DD"
   category: "Thinking"
   tags: ["tag-one", "tag-two"]
   description: "A 150–160 character summary for search and social."
   featured: false
   readingTime: "N min read"
   ---
   ```
3. **Add `seo_metadata.json`** with meta, Open Graph, Twitter Card, and a JSON-LD `Article` block. Copy an existing article's file as a template and update the values.
4. *(Optional)* **Add `article.html`** as a styled reference/fallback, and drop any **source PDF** in the same folder.
5. **Feature it (optional):** add an entry to `content/featured.json`. Put the most prominent article first; set `"featured": true`.
6. **Publish:** follow `integration_guide.md` to wire the article into the site's routing, metadata, sitemap/RSS, and Featured section.

### Conventions

- **Slugs** are kebab-case and must be identical across the folder name, front-matter `slug`, `seo_metadata.json`, `featured.json`, and the canonical URL.
- **Canonical URL** pattern: `https://karlbdouglas.com/thinking/<slug>`.
- **Dates** use `YYYY-MM-DD`.
- **Images** referenced in metadata should live under the site's `public/images/thinking/<slug>/` (see the integration guide for OG image sizing: 1200×630).

---

## Current articles

| Article | Slug | Date | Featured |
| :--- | :--- | :--- | :---: |
| Anthropic and the $30 Trillion Question: How Do You Value Intelligence? | `anthropic-30-trillion-question` | 2026-08-27 | ✅ |
