import { getPayload } from 'payload'
import config from '../payload.config'
import { getLocale } from '../lib/locale'
import Header, { type HeaderLabels } from './Header'

// Серверна обгортка: тягне лейбли хедера з CMS за локаллю і передає у клієнтський Header.
export default async function HeaderServer() {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const h = await payload.findGlobal({ slug: 'header', locale })

  const labels: HeaderLabels = {
    services: h.navServices || 'Сервіси',
    portfolio: h.navPortfolio || 'Портфоліо',
    brief: h.navBrief || 'Бріф',
    contact: h.navContact || 'Контакти',
    help: h.navHelp || 'Допомога Україні',
    cta: h.cta || 'Розпочати проєкт',
  }

  return <Header labels={labels} />
}
