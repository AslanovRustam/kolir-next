'use client'

import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

// Порт initPortfolio зі статичного script.js: коверфлоу-слайдер кейсів у блоці
// «Портфоліо» на сторінці support (3D-трансформи слайдів, точки-прогрес,
// стрілки, автоплей на десктопі, ребілд при зміні брейкпоінта). Behavior-
// компонент — чіпляється до серверної розмітки (#portfolioSwiper).
const isMobile = () => window.matchMedia('(max-width:1000px)').matches
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

export default function SupportPortfolioSwiper() {
  const swRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const el = document.getElementById('portfolioSwiper')
    if (!el) return

    // Swiper 12 не клонує для loop, якщо слайдів мало (volunteer = 3) + 'auto'.
    // Дублюємо реальні слайди в DOM до мінімуму, щоб loop/autoplay працювали як
    // на support. Точки лишаємо за ОРИГІНАЛЬНОЮ кількістю. Гард [data-dup] —
    // щоб на повторний маунт не плодити копії.
    const wrapper = el.querySelector('.swiper-wrapper')
    if (wrapper) {
      wrapper.querySelectorAll('[data-dup]').forEach((n) => n.remove())
    }
    const realSlidesCount = wrapper ? wrapper.querySelectorAll('.swiper-slide').length : 0
    // Дублюємо ЛИШЕ коли слайдів справді мало (volunteer=3). support=5 вже лупиться —
    // не чіпаємо (gate < 5). Ціль ~9 слайдів, щоб loop надійно увімкнувся.
    const DUP_BELOW = 5
    const DUP_TARGET = 9
    if (wrapper && realSlidesCount > 0 && realSlidesCount < DUP_BELOW) {
      const originals = Array.from(wrapper.querySelectorAll('.swiper-slide'))
      const copies = Math.ceil(DUP_TARGET / realSlidesCount) - 1
      for (let c = 0; c < copies; c += 1) {
        originals.forEach((sl) => {
          const clone = sl.cloneNode(true) as HTMLElement
          clone.setAttribute('data-dup', '1')
          wrapper.appendChild(clone)
        })
      }
    }
    const progressBar = document.querySelector('.p-progress .p-progress-bar')
    let dots: HTMLElement[] = []
    let lastMobile = isMobile()

    const remPx = () => {
      const v = parseFloat(getComputedStyle(document.documentElement).fontSize)
      return Number.isFinite(v) ? v : 10
    }
    const px = (rem: number) => rem * remPx()

    function buildDots() {
      if (!progressBar) return
      progressBar.innerHTML = ''
      dots = []
      for (let i = 0; i < realSlidesCount; i++) {
        const d = document.createElement('span')
        d.className = 'p-progress-dot' + (i === 0 ? ' is-active' : '')
        d.setAttribute('role', 'button')
        d.setAttribute('tabindex', '0')
        d.setAttribute('aria-label', `Go to slide ${i + 1}`)
        d.addEventListener('click', () => swRef.current?.slideToLoop(i))
        d.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            swRef.current?.slideToLoop(i)
          }
        })
        progressBar.appendChild(d)
        dots.push(d)
      }
    }
    function updateDots(instance: SwiperType) {
      if (!dots.length) return
      const total = dots.length
      const active = (instance.realIndex || 0) % total
      dots.forEach((d, i) => d.classList.toggle('is-active', i === active))
    }

    function styleSlides(instance: SwiperType) {
      const mobile = isMobile()
      const X = mobile ? px(5.2) : px(6.1)
      const Z = mobile ? px(10) : px(15)
      const ROT = mobile ? 12 : 16
      const S = mobile ? 0.1 : 0.12
      const BL = mobile ? 0.9 : 1.2
      const OP = mobile ? 0.24 : 0.28
      const YUP = mobile ? 10 : 16
      const HIDE_FROM = 2.05
      const HIDE_TO = 2.45

      instance.slides.forEach((slide) => {
        const s = slide as HTMLElement & { progress?: number }
        const p = s.progress || 0
        const abs = Math.min(Math.abs(p), 3)
        const pull = 1 - abs * 0.1
        const tiltBoost = 1 + Math.max(0, abs - 1) * 0.75
        const x = p * X * pull
        const z = -abs * Z
        const rY = p * ROT * tiltBoost
        const sc = 1 - abs * S
        const y = -(1 - Math.min(abs, 1)) * YUP
        s.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rY}deg) scale(${sc})`
        s.style.zIndex = String(100 - Math.round(abs * 10))
        let opacity = Math.max(0.18, 1 - abs * OP)
        let blur = abs * BL
        if (abs > HIDE_FROM) {
          const t = clamp((abs - HIDE_FROM) / (HIDE_TO - HIDE_FROM), 0, 1)
          const k = 1 - t
          opacity *= k
          blur = blur + (1 - k) * 10
        }
        s.style.opacity = String(opacity)
        s.style.filter = `blur(${blur}px)`
        s.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto'
      })
    }

    const buildConfig = () => {
      const mobile = isMobile()
      return {
        modules: [Navigation, Autoplay],
        loop: true,
        // Swiper 12 із slidesPerView:'auto' не клонує слайди для loop, якщо їх
        // мало (волонтерка = 3) — змушуємо додати клони, щоб loop/autoplay
        // працювали як на support (5 слайдів). Безпечно і для 5.
        loopAdditionalSlides: realSlidesCount,
        slidesPerView: 'auto' as const,
        watchSlidesProgress: true,
        speed: 650,
        grabCursor: true,
        touchStartPreventDefault: false,
        slideToClickedSlide: false,
        centeredSlides: !mobile,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        spaceBetween: mobile ? px(1.6) : px(3.8),
        navigation: mobile ? false : { nextEl: '.p-next', prevEl: '.p-prev' },
        autoplay: mobile ? false : { delay: 3800, disableOnInteraction: false },
        on: {
          init(this: SwiperType) {
            styleSlides(this)
            updateDots(this)
          },
          setTranslate(this: SwiperType) {
            styleSlides(this)
          },
          slideChange(this: SwiperType) {
            updateDots(this)
          },
          resize(this: SwiperType) {
            const nowMobile = isMobile()
            if (nowMobile !== lastMobile) {
              lastMobile = nowMobile
              swRef.current?.destroy(true, true)
              swRef.current = new Swiper(el, buildConfig())
              updateDots(swRef.current)
              return
            }
            this.params.spaceBetween = nowMobile ? px(1.6) : px(3.8)
            this.update()
            styleSlides(this)
          },
        },
      }
    }

    const getSlideRealIndex = (slide: Element) => {
      const idx = parseInt(slide.getAttribute('data-swiper-slide-index') || '', 10)
      return Number.isFinite(idx) ? idx : 0
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('.swiper-slide a')
      const sw = swRef.current
      if (!link || !sw) return
      const slide = target.closest('.swiper-slide')
      if (!slide) return
      if (!slide.classList.contains('swiper-slide-active')) {
        e.preventDefault()
        e.stopPropagation()
        sw.slideToLoop(getSlideRealIndex(slide))
      }
    }
    el.addEventListener('click', onClick, true)

    buildDots()
    swRef.current = new Swiper(el, buildConfig())

    // Swiper вираховує slidesPerView із РЕНДЕРНОЇ ширини слайдів. Якщо ініт стався
    // до того, як слайди/картинки отримали ширину, loop може не увімкнутись.
    // Перестворюємо інстанс після оседання раскладки + по завантаженню картинок.
    let reinitTimer = 0
    const reinit = () => {
      if (!swRef.current) return
      const wasLoop = swRef.current.slides?.some?.((s) =>
        (s as HTMLElement).classList.contains('swiper-slide-duplicate'),
      )
      if (wasLoop) return // loop уже працює — не чіпаємо
      swRef.current.destroy(true, true)
      swRef.current = new Swiper(el, buildConfig())
    }
    reinitTimer = window.setTimeout(reinit, 500)
    el.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', () => window.setTimeout(reinit, 50), { once: true })
    })

    const wrap = el.closest('.p-stage-inner') as HTMLElement | null
    const onEnter = () => swRef.current?.autoplay?.stop()
    const onLeave = () => swRef.current?.autoplay?.start()
    const hoverable = window.matchMedia('(hover:hover)').matches
    if (wrap && hoverable) {
      wrap.addEventListener('mouseenter', onEnter)
      wrap.addEventListener('mouseleave', onLeave)
    }

    return () => {
      window.clearTimeout(reinitTimer)
      el.removeEventListener('click', onClick, true)
      if (wrap && hoverable) {
        wrap.removeEventListener('mouseenter', onEnter)
        wrap.removeEventListener('mouseleave', onLeave)
      }
      swRef.current?.destroy(true, true)
      swRef.current = null
    }
  }, [])

  return null
}
