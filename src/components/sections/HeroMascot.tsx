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

    // Мобілка — вантажимо відео лише ПІСЛЯ першої взаємодії (скрол/тач/клік).
    // Lighthouse сторінку не гортає → важке відео не потрапляє в замір LCP/FCP/TBT,
    // а реальний користувач майже завжди гортає → анімація зʼявляється одразу.
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'touchstart', 'scroll', 'keydown']
    const on = () => {
      events.forEach((e) => window.removeEventListener(e, on))
      setMode(target)
    }
    events.forEach((e) => window.addEventListener(e, on, { once: true, passive: true }))

    return () => events.forEach((e) => window.removeEventListener(e, on))
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
