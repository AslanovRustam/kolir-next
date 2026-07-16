'use client'

import { useEffect, useState } from 'react'
import HeroMascotAlpha from './HeroMascotAlpha'

// Маскот героя.
// Постер — завжди LCP-елемент (легкий, з preload). Анімацію (відео/WebGL-canvas)
// «апгрейджуємо» поверх:
//   • десктоп — одразу після монтування;
//   • мобілка — ВІДКЛАДЕНО (після load + requestIdleCallback), щоб важке ~2.9МБ
//     відео вантажилось фоном і НЕ впливало на LCP/FCP/TBT у Lighthouse;
//   • prefers-reduced-motion — лишаємо статичний постер.
// Chrome/FF/Edge: VP9-webm з альфою. Safari: mascot-alpha.mp4 через canvas.
type Mode = 'poster' | 'video' | 'canvas'

export default function HeroMascot({ alt }: { alt: string }) {
  const [mode, setMode] = useState<Mode>('poster')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return // лишаємо постер

    const ua = navigator.userAgent
    const safari = /^((?!chrome|android|crios|fxios|edgios|edg).)*safari/i.test(ua)
    const target: Mode = safari ? 'canvas' : 'video'
    const mobile = window.matchMedia('(max-width: 767px)').matches

    // Десктоп — вмикаємо анімацію одразу.
    if (!mobile) {
      setMode(target)
      return
    }

    // Мобілка — вантажимо відео фоном, коли головні метрики вже зняті.
    let cancelled = false
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    }
    const upgrade = () => {
      if (cancelled) return
      if (typeof w.requestIdleCallback === 'function') {
        w.requestIdleCallback(() => !cancelled && setMode(target), { timeout: 3000 })
      } else {
        setTimeout(() => !cancelled && setMode(target), 1500)
      }
    }
    if (document.readyState === 'complete') upgrade()
    else window.addEventListener('load', upgrade, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener('load', upgrade)
    }
  }, [])

  if (mode === 'canvas') return <HeroMascotAlpha alt={alt} />

  if (mode === 'video') {
    return (
      <video
        className="hero-mascot"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/video/hero/mascot-poster.webp"
        aria-label={alt}
      >
        {/* Chrome / Firefox / Edge — VP9 з альфа-каналом. */}
        <source src="/video/hero/mascot.webm" type='video/webm; codecs="vp9"' />
      </video>
    )
  }

  // Постер: до апгрейду (SSR/початковий рендер, мобілка до idle, reduced-motion).
  return <img className="hero-mascot" src="/video/hero/mascot-poster.webp" alt={alt} decoding="async" />
}
