import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

function headingText(token) {
  return (token.children || [])
    .filter((child) => ['text', 'code_inline'].includes(child.type))
    .map((child) => child.content)
    .join('')
}

function headingId(text) {
  return (
    text
      .normalize('NFKD')
      .replace(/\p{Mark}/gu, '')
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
      .replace(/^-|-$/g, '') || 'section'
  )
}

function renderMarkdown(content) {
  const tokens = markdown.parse(content, {})
  const headings = []
  const usedIds = new Map()

  tokens.forEach((token, index) => {
    if (token.type !== 'heading_open') return

    const level = Number(token.tag.slice(1))
    const text = headingText(tokens[index + 1])
    const baseId = headingId(text)
    const duplicateCount = usedIds.get(baseId) || 0
    const id = duplicateCount ? `${baseId}-${duplicateCount + 1}` : baseId

    usedIds.set(baseId, duplicateCount + 1)
    token.attrSet('id', id)

    if (level >= 1 && level <= 3) {
      headings.push({ id, text, level })
    }
  })

  return {
    html: markdown.renderer.render(tokens, markdown.options, {}),
    headings,
  }
}

const dumpFiles = import.meta.glob('../content/dumps/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

function parseValue(value) {
  const trimmedValue = value.trim()

  if (trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) {
    return trimmedValue
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean)
  }

  return trimmedValue.replace(/^["']|["']$/g, '')
}

function parseFrontmatter(rawContent) {
  const frontmatterMatch = rawContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)

  if (!frontmatterMatch) {
    return {
      data: {},
      content: rawContent,
    }
  }

  const [, rawFrontmatter, content] = frontmatterMatch
  const data = {}

  rawFrontmatter.split('\n').forEach((line) => {
    const separatorIndex = line.indexOf(':')

    if (separatorIndex === -1) return

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1)

    data[key] = parseValue(value)
  })

  return { data, content }
}

function formatDisplayDate(date) {
  if (!date) return ''

  const parsedDate = new Date(`${date}T00:00:00`)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function normalizeDump(path, rawContent) {
  const { data, content } = parseFrontmatter(rawContent)
  const slug = data.slug || slugFromPath(path)
  const kind = data.kind || 'markdown'
  const renderedContent = kind === 'markdown' ? renderMarkdown(content) : { html: '', headings: [] }

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    displayDate: formatDisplayDate(data.date),
    kind,
    url: data.url || '',
    html: renderedContent.html,
    headings: renderedContent.headings,
  }
}

export const dumps = Object.entries(dumpFiles)
  .map(([path, rawContent]) => normalizeDump(path, rawContent))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getDumpBySlug(slug) {
  return dumps.find((dump) => dump.slug === slug)
}

export function getDumpHref(dump) {
  if (dump.kind !== 'markdown') {
    return dump.url
  }

  return `/dumps/${dump.slug}`
}

export function opensExternally(dump) {
  return dump.kind !== 'markdown'
}
