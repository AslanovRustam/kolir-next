import { getLocale } from '../../lib/locale'
import { makeT } from '../../lib/t'

const CASES = [
  {
    mod: 'yellow',
    title: '15 кроків незалежності',
    p: 'Сайт «15 кроків до української єдності» — це послідовне знайомство з розвитком нашої країни. Його першочергова мета полягає в ознайомленні громадськості з історією українського державотворення, а також у пошуку нових кандидатів для майбутніх проєктів.',
    site: 'historyofukrainianunity.com',
    href: '/portfolio',
    visual: '/img/cases/15krokiv.png',
    layers: [
      { cls: 'hcase-l-dots', src: '/img/cases/15krokiv-shape.png' },
      { cls: 'hcase-l-collage', src: '/img/cases/15krokiv-collage.png' },
    ],
  },
  {
    mod: 'purple',
    title: 'Strichka',
    p: "Strichka — цифровий простір для українців за кордоном, що об'єднує спільноту, ініціативи та корисні матеріали в одному місці. Ми створили платформу, яка допомагає легко знайти все найважливіше: опис проєкту, підказки, блоги, ініціативи та швидкий доступ до застосунку. Це єдина точка входу в екосистему Strichka — для взаємодії, координації та підтримки українців по всьому світу.",
    site: 'strichka.org.ua',
    href: '/portfolio',
    visual: '/img/cases/strichka.png',
    layers: [
      { cls: 'hcase-l-dots hcase-l-dots--strichka', src: '/img/cases/strichka-dots.png' },
      { cls: 'hcase-l-ribbon', src: '/img/cases/strichka-ribbon.png' },
    ],
  },
  {
    mod: 'dark',
    title: 'Vyriy Industries',
    p: 'Українська технологічна компанія, що розробляє та серійно виробляє автономні системи, адаптовані до реальних бойових умов. Ми створили багатосторінковий сайт, який відображає цілісну екосистему рішень компанії, де інженерні розробки формуються на основі практичного досвіду їх застосування.',
    site: 'vyriy.com',
    href: '/portfolio',
    visual: '/img/cases/vyriy.png',
    layers: [
      { cls: 'hcase-l-dots', src: '/img/cases/vyriy-dots.png' },
      { cls: 'hcase-l-drone', src: '/img/cases/vyriy-drone.png' },
    ],
  },
]

export default async function Cases() {
  const locale = await getLocale()
  const t = makeT(locale)
  return (
    <section className="hcases" id="cases" aria-label="Портфоліо">
      <h2 className="hcases-title" data-reveal="up">
        {t('Портфоліо')}
      </h2>

      <div className="hcases-list">
        {CASES.map((c) => (
          <article className={`hcase-card hcase-card--${c.mod}`} key={c.title} data-reveal="up">
            <div className="hcase-copy">
              <h3 className="hcase-h3">{t(c.title)}</h3>
              <p className="hcase-p">{t(c.p)}</p>
            </div>
            <div className="hcase-site" aria-hidden="true">
              <span className="hcase-site-url">{c.site}</span>
              <span className="hcase-site-line" />
            </div>
            <a className="hcase-btn hcase-btn--purple" href={c.href} data-magnetic="0.2">
              {t('Детальніше')}
            </a>
            <div className="hcase-layers" aria-hidden="true">
              {c.layers.map((l, i) => (
                <img className={l.cls} src={l.src} alt="" key={i} />
              ))}
            </div>
            <img className="hcase-visual hcase-visual--mob" src={c.visual} alt="" aria-hidden="true" />
          </article>
        ))}
      </div>

      <div className="hcases-cta" data-reveal="up">
        <span className="hcases-cta-text">{t('Хочете переглянути всі приклади робіт?')}</span>
        <a className="hcases-cta-btn" href="/portfolio" data-magnetic="0.2">
          {t('До портфоліо')}
        </a>
      </div>
    </section>
  )
}
