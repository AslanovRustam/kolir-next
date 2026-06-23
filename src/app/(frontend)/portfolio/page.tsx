import PortfolioListing from '../../../components/portfolio/PortfolioListing'
import { getLocale } from '../../../lib/locale'
import { allowedCaseIds } from '../../../lib/caseLocales'

export const metadata = { title: 'Портфоліо · Kolir' }

export default async function PortfolioPage() {
  const locale = await getLocale()
  // Показуємо лише кейси, у яких є картинки для поточної локалі (uk/en).
  const allowedIds = allowedCaseIds(locale)
  return <PortfolioListing locale={locale} allowedIds={allowedIds} />
}
