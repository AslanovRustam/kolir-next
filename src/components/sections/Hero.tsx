import { getPayload } from 'payload'
import config from '../../payload.config'
import { getLocale } from '../../lib/locale'
import { makeT } from '../../lib/t'
import HeroMascot from './HeroMascot'

const LOGOS = [
  { d: '/img/Logo=Strichka.svg', w: '/img/Logo=Strichka-w.svg', alt: 'Strichka' },
  { d: '/img/Logo=Viriy.svg', w: '/img/Logo=Viriy-w.svg', alt: 'Viriy' },
  { d: '/img/Logo=bk.svg', w: '/img/Logo=bk-w.svg', alt: 'Будь у курсі' },
  { d: '/img/Logo=Kernel.svg', w: '/img/Logo=Kernel-w.svg', alt: 'Kernel' },
  { d: '/img/Logo=Particle.svg', w: '/img/Logo=Particle-w.svg', alt: 'Particle' },
]

export default async function Hero() {
  // дублюємо логотипи для безшовної стрічки
  const logos = [...LOGOS, ...LOGOS]

  // Контент героя з Payload CMS за поточною локаллю (uk/en)
  const locale = await getLocale()
  const t = makeT(locale)
  const payload = await getPayload({ config })
  const hero = await payload.findGlobal({ slug: 'home-hero', locale })
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-card" id="heroCard">
        <div className="hero-card-decor" aria-hidden="true">
          <img className="hero-ribbon hero-ribbon--left" src="/img/hero/ribbon.png" alt="" />
          <img className="hero-ribbon hero-ribbon--right" src="/img/hero/ribbon-right.png" alt="" />
        </div>

        <div className="hero-inner">
          <div className="hero-inner-clip" aria-hidden="true">
            <img className="hero-scribble-y" src="/img/brand_line/Vector.svg" alt="" aria-hidden="true" />
          </div>

          <div className="hero-left">
            <div className="pill">{hero.pill}</div>
            <h1 className="hero-title">
              {hero.titleLine1} {hero.titleLine2}
            </h1>
            <p className="hero-desc">{hero.desc}</p>
            <div className="hero-line" aria-hidden="true" />
            <a className="btn" href="#contact" data-magnetic="0.25">
              {hero.ctaLabel}
            </a>
          </div>

          <div className="hero-right">
            <HeroMascot alt="Дівчина у вишиванці з соняшником" />
          </div>
        </div>

        <div className="trusted">
          <div className="label">{t('Нам довіряють')}</div>
          <div className="logos" id="logos">
            <div className="logos-track" id="logosTrack" aria-label="Trusted logos">
              {logos.map((l, i) => (
                <div className="logo-item logo-swap" key={i}>
                  <img className="logo-img logo-img-default" src={l.d} alt={l.alt} />
                  <img className="logo-img logo-img-white" src={l.w} alt={l.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
