import type { Metadata } from 'next'

// Єдиний конструктор метаданих сторінки: title (суфікс «| Kolir» додає
// title.template у layout), опис, canonical, Open Graph і Twitter Card.
// Розділник бренду уніфікований — завжди «|».
const DEFAULT_OG = '/img/og/default.jpg'

export function pageMeta({
  title,
  description,
  path,
  ogImage = DEFAULT_OG,
  absoluteTitle = false,
}: {
  /** Без «| Kolir» — суфікс додає title.template у layout. */
  title: string
  /** 140–160 символів, унікальний для сторінки. */
  description: string
  /** Абсолютний шлях від кореня, напр. '/portfolio'. */
  path: string
  ogImage?: string
  /** Коли бренд уже всередині title (головна, /support): беремо title як є —
   *  без title.template і без суфікса «| Kolir». */
  absoluteTitle?: boolean
}): Metadata {
  const url = path || '/'
  const ogTitle = absoluteTitle ? title : `${title} | Kolir`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: 'website',
      locale: 'uk_UA',
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
