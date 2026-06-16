'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

export default function Header({ labels = DEFAULT_LABELS }: { labels?: HeaderLabels }) {
  const NAV = [
    { href: '/#Services', label: labels.services },
    { href: '/portfolio', label: labels.portfolio },
    { href: '/#briefs', label: labels.brief },
    { href: '/#contact', label: labels.contact },
    { href: '/support', label: labels.help, help: true },
    // TODO: тимчасове посилання для тесту — прибрати пізніше
    { href: '/volunteer', label: 'Волонтерство' },
  ]

  const [open, setOpen] = useState(false)
  const [locale, setLocale] = useState<'uk' | 'en'>('uk')
  const logo = locale === 'en' ? LOGO_EN : LOGO_UK
  const router = useRouter()

  // Поточна локаль із cookie (клієнт)
  useEffect(() => {
    const m = document.cookie.match(/(?:^|;\s*)locale=(uk|en)/)
    if (m) setLocale(m[1] as 'uk' | 'en')
  }, [])

  // Перемикання мови: cookie + refresh серверних компонентів (вони перечитають CMS)
  const changeLocale = (l: 'uk' | 'en') => {
    if (l === locale) return
    document.cookie = `locale=${l};path=/;max-age=31536000`
    setLocale(l)
    router.refresh()
  }

  return (
    <header className="site-header" aria-label="Site header">
      {/* Desktop — єдина плашка за макетом (Figma 5596-159587) */}
      <div className="hero-head">
        <div className="hh-left">
          <Link className="brand" href="/" aria-label="Kolir">
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
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>
        </div>
        <div className="hh-right">
          <div className="lang-cap">
            <button
              className={`lang-cap-b${locale === 'uk' ? ' is-active' : ''}`}
              type="button"
              onClick={() => changeLocale('uk')}
            >
              UA
            </button>
            <button
              className={`lang-cap-b${locale === 'en' ? ' is-active' : ''}`}
              type="button"
              onClick={() => changeLocale('en')}
            >
              EN
            </button>
          </div>
          <Link className="cta-top" href="/#contact">
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

        <Link className="m-brand" href="/">
          <img src={logo} alt="Kolir" />
        </Link>

        <div className="lang-switch lang-switch--mob">
          <button
            className="m-lang"
            type="button"
            onClick={() => changeLocale(locale === 'uk' ? 'en' : 'uk')}
          >
            <span className="m-lang__text">{locale.toUpperCase()}</span>
            <span className="chev" aria-hidden="true" />
          </button>
        </div>
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
