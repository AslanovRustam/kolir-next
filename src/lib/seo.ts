import type { Metadata } from 'next'
import type { Locale } from './locale'

// Єдиний конструктор метаданих сторінки: title (суфікс «| Kolir» додає
// title.template у layout), опис, canonical, hreflang, Open Graph і Twitter Card.
// Розділник бренду уніфікований — завжди «|».
const DEFAULT_OG = '/img/og/default.jpg'

/** URL сторінки для заданої локалі: uk — на корені, en — під /en. */
function localePath(path: string, locale: Locale): string {
  const p = path || ''
  if (locale === 'en') return `/en${p}`
  return p || '/'
}

export function pageMeta({
  title,
  description,
  path,
  locale,
  avail = { uk: true, en: true },
  ogImage = DEFAULT_OG,
  absoluteTitle = false,
}: {
  /** Без «| Kolir» — суфікс додає title.template у layout. */
  title: string
  /** 140–160 символів, унікальний для сторінки. */
  description: string
  /** Абсолютний шлях від кореня БЕЗ /en, напр. '/portfolio' (головна — ''). */
  path: string
  /** Поточна локаль сторінки (з getLocale()). */
  locale: Locale
  /** У яких локалях сторінка існує (для hreflang; за замовч. обидві). */
  avail?: { uk: boolean; en: boolean }
  ogImage?: string
  /** Коли бренд уже всередині title (головна, /support): беремо title як є —
   *  без title.template і без суфікса «| Kolir». */
  absoluteTitle?: boolean
}): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | Kolir`

  // hreflang: лише реально існуючі локалі. x-default — UK, якщо доступна, інакше EN.
  const languages: Record<string, string> = {}
  if (avail.uk) languages.uk = localePath(path, 'uk')
  if (avail.en) languages.en = localePath(path, 'en')
  languages['x-default'] = avail.uk ? localePath(path, 'uk') : localePath(path, 'en')

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: localePath(path, locale),
      languages,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: localePath(path, locale),
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'uk_UA',
      siteName: 'Kolir',
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage],
    },
  }
}
