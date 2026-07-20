import type { Metadata } from 'next'
import PortfolioListing from '../../../components/portfolio/PortfolioListing'
import { getLocale } from '../../../lib/locale'
import { allowedCaseIds } from '../../../lib/caseLocales'
import { pageMeta } from '../../../lib/seo'

const META = {
  uk: {
    title: 'Портфоліо — кейси брендингу та вебдизайну',
    description:
      'Кейси Kolir: брендинг, айдентика, сайти та моушн для фінтеху, медицини, освіти й оборонних проєктів. 19+ реалізованих робіт.',
  },
  en: {
    title: 'Portfolio — Branding & Web Design Case Studies',
    description:
      'Kolir case studies: branding, identity, websites and motion for fintech, healthcare, education and defence. 19+ delivered projects.',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMeta({ ...META[locale], path: '/portfolio', locale, ogImage: '/img/og/portfolio.jpg' })
}

export default async function PortfolioPage() {
  const locale = await getLocale()
  // Показуємо лише кейси, у яких є картинки для поточної локалі (uk/en).
  const allowedIds = allowedCaseIds(locale)
  return <PortfolioListing locale={locale} allowedIds={allowedIds} />
}
