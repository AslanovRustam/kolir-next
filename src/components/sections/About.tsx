import { getPayload } from 'payload'
import config from '../../payload.config'
import { getLocale } from '../../lib/locale'

export default async function About() {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const about = await payload.findGlobal({ slug: 'home-about', locale })

  return (
    <section className="aboutk aboutk--v2" aria-label="About Kolir">
      <div className="aboutk-shell">
        <div className="aboutk-card">
          <span className="aboutk-deco" aria-hidden="true">
            <span className="aboutk-swirl" />
          </span>

          <img
            className="aboutk-founder"
            src="/img/about/founder.png"
            alt="Олександр Лимарчук — засновник Kolir"
          />

          <div className="aboutk-content" data-reveal="right">
            <span className="aboutk-pill">{about.pill}</span>
            <h2 className="aboutk-title">{about.title}</h2>
            <div className="aboutk-text">
              <p>{about.para1}</p>
              <p>{about.para2}</p>
            </div>
            <a className="aboutk-btn" href="#contact" data-magnetic="0.2">
              {about.ctaLabel}
            </a>
          </div>

          <div className="aboutk-quote">
            <p className="aboutk-quote-text">{about.quoteText}</p>
            <p className="aboutk-quote-author">
              <span>{about.quoteAuthorName}</span>
              <br />
              <strong>{about.quoteAuthorRole}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
