'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export type HeaderLabels = {
  services: string
  portfolio: string
  brief: string
  contact: string
  help: string
  cta: string
}

// Дефолти (uk) — щоб хедер не ламався, якщо пропси не передані
const DEFAULT_LABELS: HeaderLabels = {
  services: 'Сервіси',
  portfolio: 'Портфоліо',
  brief: 'Бріф',
  contact: 'Контакти',
  help: 'Допомога Україні',
  cta: 'Розпочати проєкт',
}

// Логотип має дві мовні версії (як data-i18n-src у статиці): UA / EN
const LOGO_UK = '/img/Logo%20-%20Kolir%20UA.svg'
const LOGO_EN = '/img/Logo-kolir.svg'

export default function Header({
  labels = DEFAULT_LABELS,
  locale = 'uk',
}: {
  labels?: HeaderLabels
  /** Поточна локаль сторінки (з URL, від сервера). Для active/логотипа/nav-префіксу. */
  locale?: 'uk' | 'en'
}) {
  // URL-версії ПОТОЧНОЇ сторінки рахуємо на клієнті з usePathname() — воно завжди
  // відображає адресний рядок навіть після soft-навігації. Серверний проп «замерз би»
  // на сторінці, де хедер (спільний layout) відрендерився вперше → перемикач вів би туди.
  const pathname = usePathname() || '/'
  const isEnPath = pathname === '/en' || pathname.startsWith('/en/')
  const basePath = isEnPath ? pathname.slice(3) || '/' : pathname // без /en
  const ukHref = basePath
  const enHref = basePath === '/' ? '/en' : `/en${basePath}`

  // EN-навігація живе під /en (внутрішні лінки), uk — на корені.
  const p = (href: string) => (locale === 'en' ? `/en${href === '/' ? '' : href}` : href)
  const NAV = [
    { href: p('/#Services'), label: labels.services },
    { href: p('/portfolio'), label: labels.portfolio },
    { href: p('/#briefs'), label: labels.brief },
    { href: p('/#contact'), label: labels.contact },
    { href: p('/support'), label: labels.help, help: true },
  ]

  const [open, setOpen] = useState(false)
  const router = useRouter()
  const logo = locale === 'en' ? LOGO_EN : LOGO_UK

  // Перемикач мови: soft-навігація БЕЗ перезавантаження документа (зображення й ін.
  // ассети не тягнуться заново — React зберігає DOM з тим самим src).
  //   router.push  — змінює URL на іншу локаль;
  //   router.refresh — інвалідує router cache і перезабирає ВСІ RSC поточного роуту,
  //     включно зі спільним layout (<html lang>) і HeaderServer (лейбли/locale). Без
  //     refresh спільний layout не перерендерився б, а /en/{p} і /{p} (той самий
  //     внутрішній рут після proxy-rewrite) віддали б закешовану локаль.
  const switchLang = (href: string) => {
    router.push(href)
    router.refresh()
  }
  const langButtons = (mob = false) => (
    <div className={`lang-cap${mob ? ' lang-cap--mob' : ''}`}>
      <a
        className={`lang-cap-b${locale === 'uk' ? ' is-active' : ''}`}
        href={ukHref}
        hrefLang="uk"
        onClick={(e) => {
          e.preventDefault()
          switchLang(ukHref)
        }}
      >
        UA
      </a>
      <a
        className={`lang-cap-b${locale === 'en' ? ' is-active' : ''}`}
        href={enHref}
        hrefLang="en"
        onClick={(e) => {
          e.preventDefault()
          switchLang(enHref)
        }}
      >
        EN
      </a>
    </div>
  )

  return (
    <header className="site-header" aria-label="Site header">
      {/* Desktop — єдина плашка за макетом (Figma 5596-159587) */}
      <div className="hero-head">
        <div className="hh-left">
          <Link className="brand" href={p('/')} aria-label="Kolir">
            <img src={logo} alt="Kolir" />
          </Link>
          <nav className="nav" aria-label="Primary navigation">
            {NAV.map((n) =>
              n.help ? (
                <Link key={n.href} className="nav-help" href={n.href}>
                  <span className="ua-flag" aria-hidden="true" />
                  {n.label}
                </Link>
              ) : (
                <Link
                  key={n.href}
                  className={n.href.endsWith('/#contact') ? 'nav-contact' : undefined}
                  href={n.href}
                >
                  {n.label}
                </Link>
              ),
            )}
          </nav>
        </div>
        <div className="hh-right">
          {langButtons()}
          <Link className="cta-top" href={p('/#contact')}>
            {labels.cta}
          </Link>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="m-top" aria-label="Mobile top bar">
        <button
          className={`m-burger${open ? ' is-open' : ''}`}
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" />
        </button>

        <Link className="m-brand" href={p('/')}>
          <img src={logo} alt="Kolir" />
        </Link>

        {langButtons(true)}
      </div>

      {/* Fullscreen mobile menu */}
      <div className={`m-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="m-menu-card">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
