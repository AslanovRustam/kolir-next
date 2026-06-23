'use client'

import { useEffect, useState } from 'react'

// Маскот героя.
// Chrome/Firefox/Edge: VP9-webm з альфа-каналом (анімація, прозорий фон).
// Safari НЕ підтримує альфу VP9 — програє відео з непрозорою підкладкою.
// Тому на Safari показуємо прозорий PNG (той самий кадр), без анімації.
export default function HeroMascot({ alt }: { alt: string }) {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    // Safari (десктоп + iOS), але НЕ Chrome/Edge/інші вебкіти на iOS.
    const safari = /^((?!chrome|android|crios|fxios|edgios|edg).)*safari/i.test(ua)
    setIsSafari(safari)
  }, [])

  if (isSafari) {
    return (
      <img
        className="hero-mascot"
        src="/video/hero/mascot-poster.png"
        alt={alt}
        decoding="async"
      />
    )
  }

  return (
    <video
      className="hero-mascot"
      autoPlay
      muted
      loop
      playsInline
      poster="/video/hero/mascot-poster.png"
      aria-label={alt}
    >
      {/* Chrome / Firefox / Edge — VP9 з альфа-каналом. */}
      <source src="/video/hero/mascot.webm" type='video/webm; codecs="vp9"' />
    </video>
  )
}
