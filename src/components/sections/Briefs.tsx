'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import SphereSequence from './SphereSequence'

type Tab = { label: string; tag: string; title: string; desc: string }
type Anim = { from: number; to: number; start: number; dur: number }

export type BriefTab = Tab
export type BriefsContent = {
  titleLine1: string
  titleLine2: string
  lead: string
  kicker: string
  ctaLabel: string
  tabs: BriefTab[]
}

// href — структурний, не контент: зіставляємо з табами CMS за індексом
const HREFS = [
  '/brief/logobook',
  '/brief/website',
  '/brief/brandbook',
  '/brief/landing-page',
  '/brief/video',
  '/brief/banner',
]

// Папки рендер-секвенсів сфери (по 48 кадрів) — за індексом табу.
// Джерело: public/images/3D Renders for Kolir/*
const SPHERE_BASE = '/images/3D Renders for Kolir'
const SPHERE_DIRS = [
  `${SPHERE_BASE}/Sphere_Logo_Kolir`, // 0 — логотип
  `${SPHERE_BASE}/Sphere_Web`, // 1 — сайт
  `${SPHERE_BASE}/Sphere_Brandbook`, // 2 — брендбук
  `${SPHERE_BASE}/Sphere_landing`, // 3 — лендинг
  `${SPHERE_BASE}/Sphere_Video`, // 4 — відео
  `${SPHERE_BASE}/Sphere_Baner`, // 5 — банер
]
const SPHERE_FRAMES = 48

export default function Briefs({ content: c }: { content: BriefsContent }) {
  const TABS = c.tabs
  const hrefAt = (i: number) => HREFS[i] ?? '#'
  const [idx, setIdx] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const fromH = useRef<number | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const t = TABS[idx]

  // Морфінг-індикатор активного табу (десктоп): біла фігура, що «перетікає»
  // між вкладками — ведучий край рушає швидше за задній (без GSAP, через rAF).
  const stateRef = useRef({ L: 0, R: 0 })
  const animsRef = useRef<{ L: Anim | null; R: Anim | null }>({ L: null, R: null })
  const rafRef = useRef(0)
  const firstRef = useRef(true)

  const drawPath = useCallback(() => {
    const tabs = tabsRef.current,
      path = pathRef.current
    if (!tabs || !path) return
    const H = tabs.clientHeight
    const R = Math.max(8, H * 0.42)
    const E = Math.max(10, H * 0.34)
    const ox = stateRef.current.L
    const w = Math.max(1, stateRef.current.R - stateRef.current.L)
    const r = Math.min(R, w / 2, H / 2),
      e = E,
      x2 = ox + w
    const f = (n: number) => Math.round(n * 100) / 100
    path.setAttribute(
      'd',
      [
        'M',
        f(ox - e),
        f(H),
        'A',
        f(e),
        f(e),
        0,
        0,
        0,
        f(ox),
        f(H - e),
        'L',
        f(ox),
        f(r),
        'A',
        f(r),
        f(r),
        0,
        0,
        1,
        f(ox + r),
        0,
        'L',
        f(x2 - r),
        0,
        'A',
        f(r),
        f(r),
        0,
        0,
        1,
        f(x2),
        f(r),
        'L',
        f(x2),
        f(H - e),
        'A',
        f(e),
        f(e),
        0,
        0,
        0,
        f(x2 + e),
        f(H),
        'Z',
      ].join(' '),
    )
  }, [])

  const tick = useCallback(() => {
    const now = performance.now()
    const a = animsRef.current
    let running = false
    ;(['L', 'R'] as const).forEach((k) => {
      const an = a[k]
      if (!an) return
      const tt = Math.min(1, (now - an.start) / an.dur)
      const eased = 1 - Math.pow(1 - tt, 3) // power3.out
      stateRef.current[k] = an.from + (an.to - an.from) * eased
      if (tt < 1) running = true
      else a[k] = null
    })
    drawPath()
    rafRef.current = running ? requestAnimationFrame(tick) : 0
  }, [drawPath])

  const placeIndicator = useCallback(
    (animate: boolean) => {
      const tabs = tabsRef.current,
        svg = svgRef.current
      if (!tabs || !svg) return
      if (!window.matchMedia('(min-width: 768px)').matches) return
      const btn = tabs.querySelectorAll<HTMLElement>('.briefs-tab')[idx]
      if (!btn) return
      svg.setAttribute('viewBox', `0 0 ${tabs.clientWidth} ${tabs.clientHeight}`)
      const nL = btn.offsetLeft,
        nR = btn.offsetLeft + btn.offsetWidth
      const s = stateRef.current
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!animate || reduce) {
        s.L = nL
        s.R = nR
        drawPath()
        return
      }
      const movingRight = nL > s.L
      const now = performance.now()
      animsRef.current.L = { from: s.L, to: nL, start: now, dur: movingRight ? 720 : 460 }
      animsRef.current.R = { from: s.R, to: nR, start: now, dur: movingRight ? 460 : 720 }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
    },
    [idx, drawPath, tick],
  )

  useLayoutEffect(() => {
    const animate = !firstRef.current
    firstRef.current = false
    placeIndicator(animate)
  }, [placeIndicator])

  // mount-only: ресайз + перерахунок після завантаження шрифтів (через ref на
  // актуальний placeIndicator, щоб НЕ снапати анімацію при кожній зміні табу)
  const placeRef = useRef(placeIndicator)
  placeRef.current = placeIndicator
  useEffect(() => {
    const onR = () => placeRef.current(false)
    window.addEventListener('resize', onR)
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(() => placeRef.current(false))
    return () => {
      window.removeEventListener('resize', onR)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Зміна мови: із сервера приходить новий масив табів (інші лейбли → інша
  // ширина активного табу). idx не змінюється, тож головний ефект не спрацює —
  // переставляємо індикатор під нову ширину БЕЗ анімації (снап). Ключ = лейбли,
  // тож при кліку табів (той самий масив) ефект не зайвий.
  const tabsKey = TABS.map((t) => t.label).join('|')
  const firstTabsRef = useRef(true)
  useLayoutEffect(() => {
    if (firstTabsRef.current) {
      firstTabsRef.current = false
      return
    }
    placeRef.current(false)
  }, [tabsKey])

  const go = (i: number) => {
    const next = ((i % TABS.length) + TABS.length) % TABS.length
    if (next === idx) return
    fromH.current = cardRef.current?.offsetHeight ?? null
    setIdx(next)
  }

  // плавна анімація висоти білої плашки при зміні табу (FLIP по height)
  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card || fromH.current == null) return
    const from = fromH.current
    fromH.current = null
    card.style.height = 'auto'
    const to = card.offsetHeight
    if (Math.abs(to - from) < 1) {
      card.style.height = ''
      return
    }
    card.style.height = from + 'px'
    void card.offsetHeight
    card.style.transition = 'height .4s cubic-bezier(.4,0,.2,1)'
    card.style.height = to + 'px'
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== card || e.propertyName !== 'height') return
      card.style.transition = ''
      card.style.height = ''
      card.removeEventListener('transitionend', onEnd)
    }
    card.addEventListener('transitionend', onEnd)
  }, [idx])

  return (
    <section className="briefs briefs--v2" id="briefs" aria-label="Briefs">
      <div className="briefs2">
        <div className="briefs2-decor" aria-hidden="true">
          <img className="briefs2-ribbon briefs2-ribbon--left" src="/img/hero/ribbon.png" alt="" />
          <img
            className="briefs2-ribbon briefs2-ribbon--right"
            src="/img/hero/ribbon-right.png"
            alt=""
          />
        </div>

        <div className="briefs2-head" data-reveal="up">
          <h2 className="briefs2-title">
            {c.titleLine1}
            <br />
            {c.titleLine2}
          </h2>
          <span className="briefs2-vline" aria-hidden="true" />
          <p className="briefs2-lead">{c.lead}</p>
          <div className="briefs2-kicker" aria-hidden="true">
            <span>{c.kicker}</span>
            <span className="briefs2-kline" />
          </div>
        </div>

        <div className="briefs2-component">
          <div
            className="briefs-tabs has-tab-ind"
            role="tablist"
            aria-label="Briefs categories"
            ref={tabsRef}
          >
            <svg
              className="briefs-ind-svg"
              aria-hidden="true"
              preserveAspectRatio="none"
              ref={svgRef}
            >
              <path ref={pathRef} />
            </svg>
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                className={`briefs-tab${i === idx ? ' is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={i === idx}
                onClick={() => go(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Мобільний навігатор брифів: стрілки + назва поточної категорії */}
          <div className="briefs2-tabnav" aria-hidden="true">
            <button
              className="briefs2-tabarrow briefs2-tabarrow--prev"
              type="button"
              aria-label="Попередній"
              onClick={() => go(idx - 1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="briefs2-tabnav-label">{t.label}</span>
            <button
              className="briefs2-tabarrow briefs2-tabarrow--next"
              type="button"
              aria-label="Наступний"
              onClick={() => go(idx + 1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="briefs2-card" role="tabpanel" ref={cardRef}>
            <div className="briefs2-left">
              <span className="briefs2-tag">{t.tag}</span>
              <h3 className="briefs2-h3">{t.title}</h3>
              <p className="briefs2-desc">{t.desc}</p>
              <a className="briefs2-btn" href={hrefAt(idx)} data-magnetic="0.2">
                {c.ctaLabel}
              </a>
            </div>
            <div className="briefs2-visual" aria-hidden="true">
              <span className="briefs2-yellow" />
              <SphereSequence
                className="briefs2-ball"
                dir={SPHERE_DIRS[idx]}
                count={SPHERE_FRAMES}
                fps={16}
              />
            </div>
          </div>

          <div className="briefs2-dots" aria-hidden="true">
            {TABS.map((_, i) => (
              <span key={i} className={i === idx ? 'is-active' : ''} onClick={() => go(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
