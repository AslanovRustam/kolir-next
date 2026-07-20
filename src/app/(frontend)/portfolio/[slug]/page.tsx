import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { CASES } from '../../../../data/cases'
import CaseDetail from '../../../../components/portfolio/CaseDetail'
import { getLocale } from '../../../../lib/locale'
import { isCaseVisible, caseLocales } from '../../../../lib/caseLocales'
import { localeHref } from '../../../../lib/localeHref'
import { pageMeta } from '../../../../lib/seo'
import { CASE_SEO } from '../../../../data/caseSeo'
import JsonLd from '../../../../components/JsonLd'
import { breadcrumbLd, caseCreativeWorkLd } from '../../../../lib/jsonld'

// Обрізаємо опис до ~158 символів на межі слова (fallback для нових кейсів).
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
  const locale = await getLocale()
  const seo = CASE_SEO[work.id]
  const en = locale === 'en'
  const title = en
    ? (seo?.en?.title ?? `${work.title} — Branding & Design Case`)
    : (seo?.title ?? `${work.title} — кейс брендингу та дизайну`)
  const description =
    (en ? seo?.en?.description : seo?.description) ?? trim(work.description || work.teaser)
  return pageMeta({
    title,
    description,
    path: `/portfolio/${work.id}`,
    locale,
    avail: caseLocales(work),
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
  // Кейс недоступний у цій локалі (напр. перемкнули мову на екслюзивному кейсі) →
  // ведемо на лістинг тієї ж локалі, а не на 404.
  if (!isCaseVisible(work, locale)) redirect(localeHref('/portfolio', locale))

  const jsonLd = [
    breadcrumbLd([
      { name: 'Головна', path: '/' },
      { name: 'Портфоліо', path: '/portfolio' },
      { name: CASE_SEO[work.id]?.title ?? work.title, path: `/portfolio/${work.id}` },
    ]),
    caseCreativeWorkLd(work),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <CaseDetail work={work} locale={locale} />
    </>
  )
}

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.id }))
}
