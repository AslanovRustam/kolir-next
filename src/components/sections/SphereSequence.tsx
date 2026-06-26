'use client'

import { useEffect, useRef } from 'react'

// Покадрова анімація 3D-сфери (рендер-секвенс 0001.png…NNNN.png) — виглядає
// як сфера, що обертається. Малюємо на <canvas> без миготіння; кадри
// прелоадимо, цикл крутимо через requestAnimationFrame із заданим fps.
type Props = {
  dir: string // напр. "/images/3D Renders for Kolir/Sphere_Logo_Kolir"
  count: number // кількість кадрів (1..count)
  className?: string
  fps?: number
  ariaLabel?: string
}

const frameUrl = (dir: string, i: number) =>
  encodeURI(`${dir}/${String(i + 1).padStart(4, '0')}.png`)

export default function SphereSequence({ dir, count, className, fps = 24, ariaLabel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || count <= 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cancelled = false
    let raf = 0
    const imgs: HTMLImageElement[] = new Array(count)

    const draw = (i: number) => {
      const img = imgs[i]
      if (!img || !img.complete || img.naturalWidth === 0) return
      if (canvas.width !== img.naturalWidth) {
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    // прелоад усіх кадрів
    for (let i = 0; i < count; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = frameUrl(dir, i)
      img.onload = () => {
        if (i === 0 && !cancelled) draw(0) // показати перший кадр одразу
      }
      imgs[i] = img
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      // без анімації — лише перший кадр
      if (imgs[0].complete) draw(0)
      return () => {
        cancelled = true
      }
    }

    let frame = 0
    let last = 0
    const interval = 1000 / fps
    const loop = (now: number) => {
      if (cancelled) return
      raf = requestAnimationFrame(loop)
      if (now - last < interval) return
      const next = (frame + 1) % count
      // переходимо лише на завантажений кадр — без порожніх «дірок» на старті
      if (imgs[next].complete && imgs[next].naturalWidth) {
        frame = next
        draw(frame)
        last = now
      }
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [dir, count, fps])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={500}
      height={500}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    />
  )
}
