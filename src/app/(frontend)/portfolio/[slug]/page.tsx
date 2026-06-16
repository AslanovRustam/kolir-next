import { notFound } from 'next/navigation'
import { CASES } from '../../../../data/cases'
import CaseDetail from '../../../../components/portfolio/CaseDetail'
import { getLocale } from '../../../../lib/locale'

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()
  const work = CASES.find((c) => c.id === slug)
  if (!work) notFound()

  return <CaseDetail work={work} locale={locale} />
}

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.id }))
}
