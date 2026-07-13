import PortfolioListing from '../../../components/portfolio/PortfolioListing'
import { getLocale } from '../../../lib/locale'
import { allowedCaseIds } from '../../../lib/caseLocales'
import { pageMeta } from '../../../lib/seo'

export const metadata = pageMeta({
  title: 'Портфоліо брендингу, айдентики та веб-дизайну',
  description:
    'Кейси Kolir: брендинг, айдентика, дизайн сайтів і motion для українських та міжнародних компаній. Дивіться, як ми вирішуємо бізнес-задачі дизайном.',
  path: '/portfolio',
  ogImage: '/img/og/portfolio.jpg',
})

export default async function PortfolioPage() {
  const locale = await getLocale()
  // Показуємо лише кейси, у яких є картинки для поточної локалі (uk/en).
  const allowedIds = allowedCaseIds(locale)
  return <PortfolioListing locale={locale} allowedIds={allowedIds} />
}
