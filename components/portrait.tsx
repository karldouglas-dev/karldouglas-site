import Image from 'next/image'

// Authorized professional portrait of Karl B. Douglas. Editorial, restrained
// framing against a dark ground — no fabricated or generated likeness.
export function Portrait({
  className = '',
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-border bg-[#0b0b0d] ${className}`}
    >
      <Image
        src="/karl-douglas-portrait.jpg"
        alt="Portrait of Karl B. Douglas"
        fill
        sizes="(max-width: 1024px) 100vw, 24rem"
        className="object-cover object-top"
        priority={priority}
      />
    </div>
  )
}
