'use client'

import { useCallback, useEffect, useState } from 'react'

type Cert = { src: string; uk: string; en: string }

// Грамоти та подяки від організацій. Додати нову = покласти файл у
// /public/img/support/certificates/ і додати один рядок сюди.
const CERTS: Cert[] = [
  {
    src: '/img/support/certificates/hur-1.jpg',
    uk: 'Головне управління розвідки МО України',
    en: 'Defence Intelligence of Ukraine (HUR)',
  },
  {
    src: '/img/support/certificates/reaktyvna-poshta.jpg',
    uk: 'БО «Реактивна Пошта»',
    en: '“Reactive Post” charity',
  },
  {
    src: '/img/support/certificates/legion.jpg',
    uk: 'Інтернаціональний Легіон оборони України',
    en: 'International Legion of Ukraine',
  },
  {
    src: '/img/support/certificates/3-oshbr.jpg',
    uk: '3-тя окрема штурмова бригада',
    en: '3rd Separate Assault Brigade',
  },
  {
    src: '/img/support/certificates/mykolaiv-oda.jpg',
    uk: 'Миколаївська обласна державна адміністрація',
    en: 'Mykolaiv Regional Administration',
  },
  {
    src: '/img/support/certificates/hur-2.jpg',
    uk: 'Головне управління розвідки МО України',
    en: 'Defence Intelligence of Ukraine (HUR)',
  },
  {
    src: '/img/support/certificates/viyskova-rozvidka.jpg',
    uk: 'Військова розвідка України',
    en: 'Military Intelligence of Ukraine',
  },
  {
    src: '/img/support/certificates/it-troops.jpg',
    uk: 'БФ «IT Troops»',
    en: '“IT Troops” foundation',
  },
  {
    src: '/img/support/certificates/aero-combat.jpg',
    uk: 'AERO COMBAT Drone Academy',
    en: 'AERO COMBAT Drone Academy',
  },
  {
    src: '/img/support/certificates/aero-combat-letter.jpg',
    uk: 'AERO COMBAT Drone Academy',
    en: 'AERO COMBAT Drone Academy',
  },
]

export default function SupportCertificates({ locale = 'uk' }: { locale?: 'uk' | 'en' }) {
  const [open, setOpen] = useState<number | null>(null)
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
              <img src={c.src} alt={label(c)} loading="lazy" />
            </span>
            <span className="support-cert-cap">{label(c)}</span>
          </button>
        ))}
      </div>

      {cur && (
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
        </div>
      )}
    </>
  )
}
