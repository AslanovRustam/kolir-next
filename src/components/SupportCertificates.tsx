'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// src     — оригінальний скан грамоти (відкривається в лайтбоксі)
// preview — уніфіковане брендове превью з логотипом організації (показується в сітці)
type Cert = { src: string; preview: string; uk: string; en: string }

// Грамоти та подяки від організацій. Додати нову = покласти скан у
// /public/img/support/certificates/, згенерувати превью у previews/ і додати рядок сюди.
const CERTS: Cert[] = [
  {
    src: '/img/support/certificates/hur-1.jpg',
    preview: '/img/support/certificates/previews/hur.png',
    uk: 'Головне управління розвідки МО України',
    en: 'Defence Intelligence of Ukraine (HUR)',
  },
  {
    src: '/img/support/certificates/reaktyvna-poshta.jpg',
    preview: '/img/support/certificates/previews/reaktyvna-poshta.png',
    uk: 'БО «Реактивна Пошта»',
    en: '“Reactive Post” charity',
  },
  {
    src: '/img/support/certificates/legion.jpg',
    preview: '/img/support/certificates/previews/legion.png',
    uk: 'Інтернаціональний Легіон оборони України',
    en: 'International Legion of Ukraine',
  },
  {
    src: '/img/support/certificates/3-oshbr.jpg',
    preview: '/img/support/certificates/previews/3-oshbr.png',
    uk: '3-тя окрема штурмова бригада',
    en: '3rd Separate Assault Brigade',
  },
  {
    src: '/img/support/certificates/mykolaiv-oda.jpg',
    preview: '/img/support/certificates/previews/mykolaiv-oda.png',
    uk: 'Миколаївська обласна державна адміністрація',
    en: 'Mykolaiv Regional Administration',
  },
  {
    src: '/img/support/certificates/hur-2.jpg',
    preview: '/img/support/certificates/previews/hur.png',
    uk: 'Головне управління розвідки МО України',
    en: 'Defence Intelligence of Ukraine (HUR)',
  },
  {
    src: '/img/support/certificates/viyskova-rozvidka.jpg',
    preview: '/img/support/certificates/previews/viyskova-rozvidka.png',
    uk: 'Військова розвідка України',
    en: 'Military Intelligence of Ukraine',
  },
  {
    src: '/img/support/certificates/it-troops.jpg',
    preview: '/img/support/certificates/previews/it-troops.png',
    uk: 'БФ «IT Troops»',
    en: '“IT Troops” foundation',
  },
  {
    src: '/img/support/certificates/aero-combat.jpg',
    preview: '/img/support/certificates/previews/aero-combat.png',
    uk: 'AERO COMBAT Drone Academy',
    en: 'AERO COMBAT Drone Academy',
  },
  {
    src: '/img/support/certificates/aero-combat-letter.jpg',
    preview: '/img/support/certificates/previews/aero-combat.png',
    uk: 'AERO COMBAT Drone Academy',
    en: 'AERO COMBAT Drone Academy',
  },
  {
    src: '/img/support/certificates/naval-73-hramota.png',
    preview: '/img/support/certificates/previews/naval-73.png',
    uk: '73-й морський центр спеціальних операцій',
    en: '73rd Naval Special Operations Center',
  },
  {
    src: '/img/support/certificates/naval-73-podyaka.png',
    preview: '/img/support/certificates/previews/naval-73.png',
    uk: '73-й морський центр спеціальних операцій',
    en: '73rd Naval Special Operations Center',
  },
  {
    src: '/img/support/certificates/sso-pivden.jpg',
    preview: '/img/support/certificates/previews/sso-pivden.png',
    uk: 'Центр спеціальних операцій «Південь»',
    en: 'Special Operations Center “Pivden”',
  },
  {
    src: '/img/support/certificates/bud-v-kursi.jpg',
    preview: '/img/support/certificates/previews/bud-v-kursi.png',
    uk: 'ГО «Будь в курсі»',
    en: '“Bud v Kursi” NGO',
  },
]

export default function SupportCertificates({ locale = 'uk' }: { locale?: 'uk' | 'en' }) {
  const [open, setOpen] = useState<number | null>(null)
  // Лайтбокс рендеримо порталом у body: усередині секції його перекриває
  // фіксована шапка сайту, і z-index це не лікує.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const label = (c: Cert) => (locale === 'en' ? c.en : c.uk)

  const close = useCallback(() => setOpen(null), [])
  const go = useCallback((dir: number) => {
    setOpen((i) => (i === null ? i : (i + dir + CERTS.length) % CERTS.length))
  }, [])

  // Esc / стрілки + блок скролу сторінки, поки відкритий лайтбокс.
  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close, go])

  const cur = open === null ? null : CERTS[open]

  return (
    <>
      <div className="support-certs-grid" data-reveal-stagger>
        {CERTS.map((c, i) => (
          <button
            key={c.src}
            type="button"
            className="support-cert"
            onClick={() => setOpen(i)}
            aria-label={`${label(c)} — ${locale === 'en' ? 'enlarge' : 'збільшити'}`}
          >
            <span className="support-cert-figure">
              <img src={c.preview} alt={label(c)} loading="lazy" />
            </span>
            <span className="support-cert-cap">{label(c)}</span>
          </button>
        ))}
      </div>

      {cur &&
        mounted &&
        createPortal(
          <div className="support-lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="support-lb-close" type="button" aria-label="Close" onClick={close}>
            ×
          </button>
          <button
            className="support-lb-nav support-lb-prev"
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
          >
            ‹
          </button>
          <figure className="support-lb-figure" onClick={(e) => e.stopPropagation()}>
            <img src={cur.src} alt={label(cur)} />
            <figcaption>{label(cur)}</figcaption>
          </figure>
          <button
            className="support-lb-nav support-lb-next"
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
          >
            ›
          </button>
          </div>,
          document.body,
        )}
    </>
  )
}
