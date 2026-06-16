'use client'

import { useEffect } from 'react'

// Підключає зовнішній скрипт із /public на КОЖЕН маунт (для статичних JS-ефектів,
// узятих напряму зі статики; IIFE самоініціалізуються поза readyState 'loading').
// Пере-вставка на маунт = відпрацьовує і після клієнтської навігації Next.
export default function ScriptOnMount({ src }: { src: string }) {
  useEffect(() => {
    const s = document.createElement('script')
    s.src = src
    s.async = false
    document.body.appendChild(s)
    return () => {
      s.remove()
    }
  }, [src])
  return null
}
