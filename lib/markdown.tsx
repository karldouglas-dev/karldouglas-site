import React from 'react'

// Minimal, dependency-free markdown renderer for editorial prose.
// Supports: ## / ### headings, > blockquotes, - bullet lists,
// **bold**, and [text](url) links. Deterministic — SSR-safe.

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[2]) {
      nodes.push(<strong key={`${keyPrefix}-b-${i}`}>{match[2]}</strong>)
    } else if (match[4] && match[5]) {
      const href = match[5]
      const external = /^https?:\/\//.test(href)
      nodes.push(
        <a
          key={`${keyPrefix}-a-${i}`}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {match[4]}
        </a>
      )
    }
    lastIndex = regex.lastIndex
    i++
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

export function Markdown({ content }: { content: string }) {
  const blocks = (content ?? '').split(/\n\n+/).map((b) => b.trim()).filter(Boolean)
  return (
    <div className="prose-editorial">
      {blocks.map((block, idx) => {
        if (block.startsWith('## ')) {
          return <h2 key={idx}>{renderInline(block.slice(3), `h2-${idx}`)}</h2>
        }
        if (block.startsWith('### ')) {
          return <h3 key={idx}>{renderInline(block.slice(4), `h3-${idx}`)}</h3>
        }
        if (block.startsWith('> ')) {
          const quote = block
            .split('\n')
            .map((l) => l.replace(/^>\s?/, ''))
            .join(' ')
          return <blockquote key={idx}>{renderInline(quote, `bq-${idx}`)}</blockquote>
        }
        const lines = block.split('\n')
        if (lines.every((l) => l.trim().startsWith('- '))) {
          return (
            <ul key={idx}>
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.trim().slice(2), `li-${idx}-${li}`)}</li>
              ))}
            </ul>
          )
        }
        return <p key={idx}>{renderInline(block.replace(/\n/g, ' '), `p-${idx}`)}</p>
      })}
    </div>
  )
}
