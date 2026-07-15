// Білдери структурованих даних (schema.org, JSON-LD).
import type { CaseItem } from '../data/cases'
import { CASE_SEO } from '../data/caseSeo'

const SITE = 'https://www.kolir.agency'

// 8.1 Organization + ProfessionalService (головна)
export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kolir',
  alternateName: ['Kolir Agency', 'Колір', 'Kreyda'],
  url: `${SITE}/`,
  logo: `${SITE}/img/Logo%20-%20Kolir%20UA.svg`,
  description:
    'Брендингова агенція повного циклу: нейминг, візуальна айдентика, вебдизайн і моушн.',
  email: 'hello@kolir.agency',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Французький бульвар, 66/2',
    addressLocality: 'Одеса',
    addressRegion: 'Одеська область',
    postalCode: '65062',
    addressCountry: 'UA',
  },
  areaServed: 'UA',
  founder: { '@type': 'Person', name: 'Олександр Лимарчук' },
  sameAs: [
    'https://www.behance.net/kolir_agency',
    'https://dribbble.com/kolir_agency',
    'https://www.linkedin.com/company/koliragency/',
    'https://www.instagram.com/kolir_agency/',
    'https://www.facebook.com/kolir.agency',
    'https://x.com/kolir_agency',
    'https://www.threads.net/@kolir_agency',
  ],
}

// 8.2 WebSite (головна) — без SearchAction (пошуку на сайті немає)
export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kolir',
  url: `${SITE}/`,
  inLanguage: 'uk',
}

// 8.3 BreadcrumbList
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  }
}

// Послуги кейса зі списку категорій (для CreativeWork.about)
const CAT_UK: Record<string, string> = {
  Branding: 'брендинг',
  Web: 'вебдизайн',
  Product: 'продуктовий дизайн',
  Motion: 'моушн',
  Editorial: 'едиторіал-дизайн',
}

// 8.4 CreativeWork (сторінка кейса)
export function caseCreativeWorkLd(work: CaseItem) {
  const id = (work as { id: string }).id
  const name = CASE_SEO[id]?.title ?? work.title
  const services = work.categories.map((c) => CAT_UK[c] ?? c)
  const about = services.length ? services.join(', ').replace(/^./, (m) => m.toUpperCase()) : undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    creator: { '@type': 'Organization', name: 'Kolir' },
    ...(about ? { about } : {}),
    url: `${SITE}/portfolio/${id}`,
    image: `${SITE}/img/og/cases/${id}.jpg`,
    inLanguage: 'uk',
  }
}
