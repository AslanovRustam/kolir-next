import { getPayload } from 'payload'
import config from '../../payload.config'
import { getLocale } from '../../lib/locale'
import { makeT } from '../../lib/t'

export default async function About() {
  const locale = await getLocale()
  const t = makeT(locale)
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
              <a
                className="aboutk-quote-author-link"
                href="https://www.linkedin.com/in/alexandr-lymarchuk-5a5490a9/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${about.quoteAuthorName} — LinkedIn`}
              >
                <svg
                  className="aboutk-quote-li"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
                <span className="aboutk-quote-author-name">{about.quoteAuthorName}</span>
              </a>
              <br />
              <strong>{t('Засновник агенції')}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
