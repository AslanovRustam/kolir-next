import type { MetadataRoute } from 'next'

const SITE = 'https://www.kolir.agency'

// /robots.txt — дозволяємо індексацію всього, крім адмінки Payload.
// /img/ та /video/ лишаємо відкритими (потрібні для індексації зображень).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
