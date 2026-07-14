import type { MetadataRoute } from 'next'
import { CASES } from '../data/cases'
import { isCaseVisible } from '../lib/caseLocales'

const SITE = 'https://www.kolir.agency'

// /sitemap.xml — усі індексовані сторінки фронтенду.
// Кейси портфоліо додаємо лише ті, що видимі на дефолтній локалі (uk).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPaths = [
    '', // головна
    '/portfolio',
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

  const casePaths = CASES.filter((c) => isCaseVisible(c, 'uk')).map((c) => `/portfolio/${c.id}`)

  const priorityOf = (path: string) => {
    if (path === '') return 1
    if (path === '/privacy') return 0.3 // службова сторінка — низький пріоритет
    if (path.startsWith('/portfolio')) return 0.8
    return 0.6
  }

  return [...staticPaths, ...casePaths].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: priorityOf(path),
  }))
}
