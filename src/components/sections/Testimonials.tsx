'use client'

import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import type { SwiperOptions } from 'swiper/types'
import 'swiper/css'

export type Review = { name: string; role: string; rate: string; text: string }
export type TestimonialsContent = {
  kicker: string
  titlePre: string
  titleAccent: string
  subtitle: string
  reviews: Review[]
}

export default function Testimonials({ content: c }: { content: TestimonialsContent }) {
  const REVIEWS = c.reviews
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const mq = window.matchMedia('(max-width: 1000px)')
    const isMobile = () => mq.matches
    let sw: Swiper | null = null
    let lastMobile = isMobile()

    const buildConfig = (): SwiperOptions => ({
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: isMobile(),
      spaceBetween: isMobile() ? 20 : 36,
      speed: 650,
      grabCursor: true,
      autoplay: false,
      on: {
        resize(this: Swiper) {
          const nowMobile = isMobile()
          if (nowMobile !== lastMobile) {
            lastMobile = nowMobile
            if (sw) sw.destroy(true, true)
            sw = new Swiper(el, buildConfig())
            return
          }
          this.update()
        },
      },
    })

    sw = new Swiper(el, buildConfig())
    return () => {
      if (sw) sw.destroy(true, true)
    }
  }, [])

  return (
    <section className="testimonials" id="testimonials">
      <div className="t-shell">
        <div className="t-head" data-reveal="up">
          <div className="t-kicker">
            <span className="t-kline" aria-hidden="true" />
            <span>{c.kicker}</span>
          </div>
          <h2 className="t-title">
            {c.titlePre}
            <span>{c.titleAccent}</span>
          </h2>
          <div className="t-subwrap">
            <span className="t-vline" aria-hidden="true" />
            <p className="t-sub">{c.subtitle}</p>
          </div>
          <span className="t-underline" aria-hidden="true" />
          <div className="t-topright" aria-hidden="true">
            <span>{c.kicker}</span>
            <span className="lines">
              <span className="l1" />
              <span className="l2" />
            </span>
          </div>
        </div>

        <div className="t-stage">
          <div className="t-phone" aria-hidden="true">
            <img className="t-ph t-ph--iphone" src="/img/testimonials/phone-iphone.png" alt="" />
            <img className="t-ph t-ph--screen" src="/img/testimonials/phone-screen.png" alt="" />
            <img className="t-ph t-ph--hand" src="/img/testimonials/phone-hand.png" alt="" />
          </div>

          <div className="t-cards-clip">
            <div className="swiper t-swiper" id="testimonialsSwiper" aria-label="Testimonials slider" ref={elRef}>
              <div className="swiper-wrapper">
                {REVIEWS.map((r) => (
                  <div className="swiper-slide" key={r.name}>
                    <article className="t-card">
                      <div className="t-card-top">
                        <div className="t-meta">
                          <div className="t-name">{r.name}</div>
                          <div className="t-role">{r.role}</div>
                        </div>
                        <div className="t-rate">
                          <span>{r.rate}</span>
                        </div>
                      </div>
                      <p className="t-text">{r.text}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <img className="t-finger" src="/img/testimonials/phone-finger.png" alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
