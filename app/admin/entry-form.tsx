'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loader2, Trash2, Upload, X } from 'lucide-react'

type Option = { id: string; name: string }

export type EntryFormData = {
  id?: string
  type: string
  status: string
  title: string
  subtitle: string
  slug: string
  summary: string
  body: string
  bodyPlaceholder: boolean
  author: string
  publicationDate: string
  originalPublicationDate: string
  categoryId: string
  tagIds: string[]
  featuredImage: string
  readingTime: string
  videoEmbedUrl: string
  transcript: string
  externalSourceLink: string
  externalSourceName: string
  disclosureText: string
  complianceLevel: string
  seoTitle: string
  metaDescription: string
  canonicalUrl: string
  ogImage: string
  sortOrder: string
  featured: boolean
  originalSource: string
  originalThesis: string
  retrospectiveContext: string
  retrospectiveWhatRight: string
  retrospectiveUnderestimated: string
  retrospectiveLearned: string
}

const TYPES = ['ESSAY', 'FRAMEWORK', 'ARCHIVE', 'VIDEO', 'INTERVIEW', 'COMMENTARY', 'ABOUT']
const STATUSES = ['DRAFT', 'PUBLISHED']
const COMPLIANCE = ['GREEN', 'YELLOW', 'RED']

export function EntryForm({
  mode,
  initial,
  categories,
  tags,
}: {
  mode: 'new' | 'edit'
  initial: EntryFormData
  categories: Option[]
  tags: Option[]
}) {
  const router = useRouter()
  const [form, setForm] = useState<EntryFormData>(initial)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function set<K extends keyof EntryFormData>(key: K, value: EntryFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function toggleTag(id: string) {
    setForm((f) => ({
      ...f,
      tagIds: f.tagIds.includes(id) ? f.tagIds.filter((t) => t !== id) : [...f.tagIds, id],
    }))
  }

  async function handleUpload(file: File) {
    setError('')
    setUploading(true)
    try {
      const presign = await fetch('/api/upload/presigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, contentType: file.type }),
      })
      const p = await presign.json().catch(() => ({}))
      if (!presign.ok) throw new Error(p?.error || 'Upload failed')
      const put = await fetch(p.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      if (!put.ok) throw new Error('Upload failed')
      const complete = await fetch('/api/upload/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cloud_storage_path: p.cloud_storage_path, contentType: file.type }),
      })
      const c = await complete.json().catch(() => ({}))
      if (!complete.ok) throw new Error(c?.error || 'Upload failed')
      set('featuredImage', c.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.title.trim()) {
      setError('A title is required.')
      return
    }
    setSaving(true)
    try {
      const url = mode === 'new' ? '/api/admin/entries' : `/api/admin/entries/${form.id}`
      const method = mode === 'new' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          readingTime: form.readingTime === '' ? null : Number(form.readingTime),
          sortOrder: form.sortOrder === '' ? 0 : Number(form.sortOrder),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error || 'Could not save. Please try again.')
        setSaving(false)
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (mode !== 'edit' || !form.id) return
    if (!window.confirm('Delete this entry? This cannot be undone.')) return
    setDeleting(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/entries/${form.id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || 'Could not delete.')
        setDeleting(false)
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setDeleting(false)
    }
  }

  const isVideo = form.type === 'VIDEO' || form.type === 'INTERVIEW'
  const isArchive = form.type === 'ARCHIVE'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Card title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Type" value={form.type} onChange={(v) => set('type', v)} options={TYPES} />
          <Select label="Status" value={form.status} onChange={(v) => set('status', v)} options={STATUSES} />
        </div>
        <Text label="Title" value={form.title} onChange={(v) => set('title', v)} required />
        <Text label="Subtitle" value={form.subtitle} onChange={(v) => set('subtitle', v)} />
        <Text
          label="Slug"
          value={form.slug}
          onChange={(v) => set('slug', v)}
          hint="Leave blank to generate from the title. Lowercase, hyphenated."
        />
        <Area label="Summary" value={form.summary} onChange={(v) => set('summary', v)} rows={3} />
      </Card>

      <Card title="Body">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={form.bodyPlaceholder}
            onChange={(e) => set('bodyPlaceholder', e.target.checked)}
            className="h-4 w-4 rounded-sm border-border"
          />
          Mark body as a placeholder (“content forthcoming”)
        </label>
        <Area
          label="Main body"
          value={form.body}
          onChange={(v) => set('body', v)}
          rows={14}
          hint="Markdown supported: ## headings, > quotes, - lists, **bold**, [links](url)."
        />
      </Card>

      <Card title="Publication">
        <div className="grid gap-4 sm:grid-cols-2">
          <Text label="Author" value={form.author} onChange={(v) => set('author', v)} />
          <Text label="Reading time (min)" value={form.readingTime} onChange={(v) => set('readingTime', v)} type="number" />
          <DateField label="Publication date" value={form.publicationDate} onChange={(v) => set('publicationDate', v)} />
          <DateField
            label="Original publication date"
            value={form.originalPublicationDate}
            onChange={(v) => set('originalPublicationDate', v)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel>Category</FieldLabel>
            <select
              value={form.categoryId}
              onChange={(e) => set('categoryId', e.target.value)}
              className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">— None —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:pt-6">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="h-4 w-4 rounded-sm border-border"
              />
              Featured
            </label>
            <Text label="" value={form.sortOrder} onChange={(v) => set('sortOrder', v)} type="number" placeholder="Sort order" />
          </div>
        </div>
        {tags.length > 0 && (
          <div>
            <FieldLabel>Tags</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => {
                const on = form.tagIds.includes(t.id)
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => toggleTag(t.id)}
                    className={`rounded-sm border px-2.5 py-1 text-xs transition-colors ${
                      on
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    {t.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </Card>

      <Card title="Featured image">
        {form.featuredImage ? (
          <div className="space-y-3">
            <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-sm border border-border bg-muted">
              <Image src={form.featuredImage} alt="Featured image preview" fill className="object-cover" />
            </div>
            <button
              type="button"
              onClick={() => set('featuredImage', '')}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" /> Remove image
            </button>
          </div>
        ) : (
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleUpload(f)
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-sm border border-dashed border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary disabled:opacity-60"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {uploading ? 'Uploading…' : 'Upload image'}
            </button>
          </div>
        )}
      </Card>

      {isVideo && (
        <Card title="Video">
          <Text
            label="Video embed URL"
            value={form.videoEmbedUrl}
            onChange={(v) => set('videoEmbedUrl', v)}
            hint="YouTube watch/embed URL."
          />
          <Area label="Transcript" value={form.transcript} onChange={(v) => set('transcript', v)} rows={8} />
        </Card>
      )}

      {isArchive && (
        <Card title="Thesis archive">
          <Text label="Original source" value={form.originalSource} onChange={(v) => set('originalSource', v)} />
          <Area label="Original thesis" value={form.originalThesis} onChange={(v) => set('originalThesis', v)} rows={6} />
          <Area
            label="Retrospective — context"
            value={form.retrospectiveContext}
            onChange={(v) => set('retrospectiveContext', v)}
            rows={4}
          />
          <Area
            label="Retrospective — what proved right"
            value={form.retrospectiveWhatRight}
            onChange={(v) => set('retrospectiveWhatRight', v)}
            rows={4}
          />
          <Area
            label="Retrospective — what was underestimated"
            value={form.retrospectiveUnderestimated}
            onChange={(v) => set('retrospectiveUnderestimated', v)}
            rows={4}
          />
          <Area
            label="Retrospective — what it taught"
            value={form.retrospectiveLearned}
            onChange={(v) => set('retrospectiveLearned', v)}
            rows={4}
          />
        </Card>
      )}

      <Card title="Source & disclosure">
        <div className="grid gap-4 sm:grid-cols-2">
          <Text label="External source name" value={form.externalSourceName} onChange={(v) => set('externalSourceName', v)} />
          <Text label="External source link" value={form.externalSourceLink} onChange={(v) => set('externalSourceLink', v)} />
        </div>
        <Select label="Compliance level" value={form.complianceLevel} onChange={(v) => set('complianceLevel', v)} options={COMPLIANCE} />
        <Area label="Disclosure text" value={form.disclosureText} onChange={(v) => set('disclosureText', v)} rows={3} />
      </Card>

      <Card title="SEO">
        <Text label="SEO title" value={form.seoTitle} onChange={(v) => set('seoTitle', v)} />
        <Area label="Meta description" value={form.metaDescription} onChange={(v) => set('metaDescription', v)} rows={2} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text label="Canonical URL" value={form.canonicalUrl} onChange={(v) => set('canonicalUrl', v)} />
          <Text label="Open Graph image URL" value={form.ogImage} onChange={(v) => set('ogImage', v)} />
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === 'new' ? 'Create entry' : 'Save changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="rounded-sm border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
        </div>
        {mode === 'edit' && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 rounded-sm border border-destructive/40 px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete
          </button>
        )}
      </div>
    </form>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-sm border border-border bg-card p-6">
      <h2 className="mb-4 font-display text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  if (!children) return null
  return <label className="mb-1.5 block text-sm font-medium text-foreground">{children}</label>
}

function Text({
  label,
  value,
  onChange,
  type = 'text',
  required,
  hint,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  hint?: string
  placeholder?: string
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function Area({
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  hint?: string
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-primary"
      />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o.charAt(0) + o.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  )
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
    </div>
  )
}
