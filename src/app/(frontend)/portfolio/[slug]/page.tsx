import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CASES } from '../../../../data/cases'
import CaseDetail from '../../../../components/portfolio/CaseDetail'
import { getLocale } from '../../../../lib/locale'
import { isCaseVisible } from '../../../../lib/caseLocales'
import { pageMeta } from '../../../../lib/seo'

// Обрізаємо опис до ~158 символів на межі слова (для meta description).
const trim = (s: string, n = 158) =>
  s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n)).replace(/[,.;:—-]\s*$/, '') + '…'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const work = CASES.find((c) => c.id === slug)
  if (!work) return {}
  return pageMeta({
    title: `${work.title} — кейс брендингу та дизайну`,
    description: trim(work.description || work.teaser),
    path: `/portfolio/${work.id}`,
    ogImage: `/img/og/cases/${work.id}.jpg`,
  })
}

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
