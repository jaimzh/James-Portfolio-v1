import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

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
  const type = data.type || 'markdown'

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    displayDate: formatDisplayDate(data.date),
    description: data.description || '',
    type,
    source: data.source || (type === 'link' ? 'external' : 'portfolio'),
    url: data.url || '',
    content,
    html: type === 'markdown' ? markdown.render(content) : '',
  }
}

export const dumps = Object.entries(dumpFiles)
  .map(([path, rawContent]) => normalizeDump(path, rawContent))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getDumpBySlug(slug) {
  return dumps.find((dump) => dump.slug === slug)
}

export function getDumpHref(dump) {
  if (dump.type === 'link') {
    return dump.url
  }

  return `/dumps/${dump.slug}`
}

export function isExternalDump(dump) {
  return dump.type === 'link'
}
