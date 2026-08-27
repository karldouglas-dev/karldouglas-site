import { Info } from 'lucide-react'

export function DisclosureBlock({ text }: { text?: string | null }) {
  if (!text) return null
  return (
    <aside
      role="note"
      aria-label="Disclosures"
      className="mt-14 rounded-sm border border-border bg-secondary/40 px-5 py-4"
    >
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Disclosures</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
        </div>
      </div>
    </aside>
  )
}
