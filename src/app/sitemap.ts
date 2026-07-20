import type { MetadataRoute } from 'next'
import { CASES } from '../data/cases'
import { caseLocales } from '../lib/caseLocales'

const SITE = 'https://www.kolir.agency'

// URL сторінки для локалі: uk — на корені, en — під /en. Корінь БЕЗ завершального
// слеша — так само, як Next рендерить canonical головної (щоб hreflang був взаємним).
const ukUrl = (path: string) => `${SITE}${path}`
const enUrl = (path: string) => `${SITE}/en${path}`

// hreflang-альтернативи: лише локалі, у яких сторінка існує. x-default → uk (інакше en).
function languagesFor(path: string, avail: { uk: boolean; en: boolean }) {
  const languages: Record<string, string> = {}
  if (avail.uk) languages.uk = ukUrl(path)
  if (avail.en) languages.en = enUrl(path)
  languages['x-default'] = avail.uk ? ukUrl(path) : enUrl(path)
  return languages
}

// /sitemap.xml — усі індексовані сторінки фронтенду в обох локалях (uk + /en),
// з hreflang-alternates. Кейси включаємо для тих локалей, де в них є картинки.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const both = { uk: true, en: true }

  // Статичні сторінки існують в обох локалях.
  const staticPaths = [
    '', // головна
    '/portfolio',
    '/about',
    '/support',
    '/volunteer',
    '/privacy',
    '/brief/logobook',
    '/brief/website',
    '/brief/brandbook',
    '/brief/landing-page',
    '/brief/video',
    '/brief/banner',
    '/brief/playable',
  ]

  const priorityOf = (path: string) => {
    if (path === '') return 1
    if (path === '/privacy') return 0.3 // службова сторінка — низький пріоритет
    if (path.startsWith('/portfolio')) return 0.8
    return 0.6
  }

  const entries: MetadataRoute.Sitemap = []

  for (const path of staticPaths) {
    const languages = languagesFor(path, both)
    const common = {
      lastModified: now,
      changeFrequency: (path === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: priorityOf(path),
      alternates: { languages },
    }
    entries.push({ url: ukUrl(path), ...common })
    entries.push({ url: enUrl(path), ...common })
  }

  // Кейси — окремий запис на кожну локаль, у якій кейс видимий.
  for (const c of CASES) {
    const avail = caseLocales(c)
    if (!avail.uk && !avail.en) continue
    const path = `/portfolio/${c.id}`
    const languages = languagesFor(path, avail)
    const common = {
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages },
    }
    if (avail.uk) entries.push({ url: ukUrl(path), ...common })
    if (avail.en) entries.push({ url: enUrl(path), ...common })
  }

  return entries
}
