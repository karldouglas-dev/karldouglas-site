'use client'

import { useEffect, useRef, useState } from 'react'

// Soro publishes and renders the Research articles client-side into #soro-blog.
// The embed can be toggled on/off from the Soro dashboard; while it is disabled
// the endpoint returns a 403 ("// Embed is disabled"). Loading a 403 <script>
// would surface a console error and leave an empty area, so we first preflight
// the endpoint with fetch (CORS is open: access-control-allow-origin: *) and
// only inject the embed <script> when Soro is actually serving it. This means
// the section starts working automatically the moment the embed is enabled in
// Soro — no code change or redeploy required — and degrades gracefully until then.
const SORO_EMBED_SRC =
  'https://app.trysoro.com/api/embed/a373e699-3c5b-4b13-9619-6ed839babbad'

type Status = 'loading' | 'ready' | 'unavailable'

export function SoroBlog() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let cancelled = false
    let script: HTMLScriptElement | null = null

    fetch(SORO_EMBED_SRC, { method: 'GET', cache: 'no-store' })
      .then((res) => {
        if (cancelled) return
        if (!res.ok) {
          setStatus('unavailable')
          return
        }
        script = document.createElement('script')
        script.src = SORO_EMBED_SRC
        script.defer = true
        script.setAttribute('data-soro-embed', 'true')
        script.onerror = () => {
          if (!cancelled) setStatus('unavailable')
        }
        document.body.appendChild(script)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('unavailable')
      })

    return () => {
      cancelled = true
      if (script) script.remove()
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [])

  return (
    <div>
      <div
        id="soro-blog"
        ref={containerRef}
        className="soro-blog-embed"
        // The Soro widget populates this element after the script loads.
        suppressHydrationWarning
      />
      {status === 'unavailable' && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          Research articles are being prepared and will appear here shortly.
        </p>
      )}
    </div>
  )
}
