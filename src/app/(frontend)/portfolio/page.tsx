import PortfolioListing from '../../../components/portfolio/PortfolioListing'
import { getLocale } from '../../../lib/locale'

export const metadata = { title: 'Портфоліо · Kolir' }

export default async function PortfolioPage() {
  const locale = await getLocale()
  return <PortfolioListing locale={locale} />
}
