import { PenLine } from 'lucide-react'

export function PlaceholderNote({
  title = 'Content forthcoming',
  description = 'The full text of this piece is being prepared and will be published here.',
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="rounded-sm border border-dashed border-border bg-secondary/30 px-6 py-8 text-center">
      <PenLine className="mx-auto h-5 w-5 text-muted-foreground" aria-hidden="true" />
      <p className="mt-3 font-display text-lg text-foreground">{title}</p>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
