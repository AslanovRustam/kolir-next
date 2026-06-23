import { notFound } from 'next/navigation'
import { CASES } from '../../../../data/cases'
import CaseDetail from '../../../../components/portfolio/CaseDetail'
import { getLocale } from '../../../../lib/locale'
import { isCaseVisible } from '../../../../lib/caseLocales'

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()
  const work = CASES.find((c) => c.id === slug)
  if (!work) notFound()
  // Немає картинок для цієї локалі → кейс недоступний на ній.
  if (!isCaseVisible(work, locale)) notFound()

  return <CaseDetail work={work} locale={locale} />
}

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.id }))
}
