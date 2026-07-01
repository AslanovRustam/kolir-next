import { getLocale } from '../../../lib/locale'
import { makeT } from '../../../lib/t'
import '../../../site-css/about.css'

export const metadata = {
  title: 'Про нас · Kolir',
  description:
    'Kolir — креативна агенція брендингу та дизайну. Хто ми, у що віримо і як працюємо над брендами.',
}

// ТЕКСТИ — тимчасові плейсхолдери (перепишемо). Обгорнуті в t() для майбутнього en.
export default async function AboutPage() {
  const locale = await getLocale()
  const t = makeT(locale)

  const values = [
    {
      num: '01',
      title: t('Дизайн — на першому місці'),
      text: t(
        'Ми починаємо не з декору, а зі змісту: досліджуємо бізнес, аудиторію та ринок, і лише тоді народжується форма. Краса тут — наслідок логіки, а не навпаки.',
      ),
    },
    {
      num: '02',
      title: t('Партнерство, а не підряд'),
      text: t(
        'Ми занурюємось у ваш продукт як у власний: ставимо незручні питання, сперечаємось і пропонуємо рішення, за які не соромно. Прозоро на кожному етапі.',
      ),
    },
    {
      num: '03',
      title: t('Результат, що працює'),
      text: t(
        'Бренд має рухати бізнес: продавати, вирізняти, викликати довіру. Ми проєктуємо системи, які легко масштабуються й живуть роками, а не один сезон.',
      ),
    },
  ]

  const stats = [
    { num: '10+', label: t('років на ринку') },
    { num: '250+', label: t('реалізованих проєктів') },
    { num: '80+', label: t('брендів по світу') },
    { num: '15', label: t('країн-клієнтів') },
  ]

  // Керівництво: засновник (є фото на головній) + виконавчий директор.
  const leaders = [
    {
      name: 'Олександр Лимарчук',
      role: t('Засновник'),
      bio: t(
        'Веде стратегію та візію агенції. Понад 10 років у брендингу, дизайні та digital — від першого начерку до системи, що працює.',
      ),
      photo: '/img/about/founder.png',
      initials: 'ОЛ',
      linkedin: 'https://www.linkedin.com/in/alexandr-lymarchuk-5a5490a9/',
    },
    {
      name: 'Олександр Березовський',
      role: t('Виконавчий директор'),
      bio: t(
        'Відповідає за операційну діяльність і зростання: перетворює ідеї на злагоджені процеси, команду та передбачуваний результат для клієнта.',
      ),
      photo: null, // TODO: додати реальне фото → /img/about/berezovskyi.png
      initials: 'ОБ',
      linkedin: null,
    },
  ]

  return (
    <main className="kolir-page about-page">
      {/* 1. HERO */}
      <section className="about-band about-hero" aria-label={t('Про нас')}>
        <span className="about-hero-swirl" aria-hidden="true" />
        <div className="about-inner about-hero-grid">
          <div className="about-hero-copy">
            <span className="about-pill">{t('Про агенцію')}</span>
            <h1 className="about-hero-title">
              {t('Ми — ')}
              <span className="about-accent">Kolir</span>
              {t('. Створюємо бренди, що рухають бізнес уперед.')}
            </h1>
            <p className="about-hero-lead">
              {t(
                'Креативна агенція повного циклу: стратегія, нейминг, айдентика, UI/UX, веброзробка та діджитал. Ми перетворюємо складне на ясне — і красиве.',
              )}
            </p>
            <div className="about-hero-cta">
              <a className="about-btn about-btn--yellow" href="/#contact" data-magnetic="0.2">
                {t('Розпочати проєкт')}
              </a>
              <a className="about-btn" href="/portfolio" data-magnetic="0.2">
                {t('Наші роботи')}
              </a>
            </div>
          </div>
          <div className="about-hero-visual" aria-hidden="true">
            <img className="about-hero-img" src="/img/about/hero.png" alt="" />
          </div>
        </div>
      </section>

      {/* 2. Історія / місія */}
      <section className="about-band about-story">
        <div className="about-inner about-story-grid">
          <div>
            <span className="about-kicker">{t('Наша історія')}</span>
            <h2 className="about-story-statement">
              {t('Почалося з ідеї, що бренд — це не логотип, а система сенсів.')}
            </h2>
          </div>
          <div className="about-story-text">
            <p>
              {t(
                'Kolir виріс із маленької дизайн-студії у команду, яка веде бренди від першого начерку до цифрової присутності. За ці роки ми зрозуміли головне: працює не «красиво», а доречно.',
              )}
            </p>
            <p>
              {t(
                'Сьогодні ми поєднуємо стратегічне мислення, сильний візуал і інженерну точність. Кожен проєкт — це діалог: ми слухаємо, ставимо гіпотези, перевіряємо їх і доводимо до результату, яким пишаємось разом із клієнтом.',
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Цінності */}
      <section className="about-band about-values">
        <div className="about-inner">
          <div className="about-section-head">
            <span className="about-pill">{t('Цінності')}</span>
            <h2 className="about-section-title">{t('У що ми віримо')}</h2>
          </div>
          <div className="about-cards">
            {values.map((v) => (
              <article className="about-card" key={v.num}>
                <span className="about-card-swirl" aria-hidden="true" />
                <span className="about-card-num">{v.num}</span>
                <h3 className="about-card-title">{v.title}</h3>
                <p className="about-card-text">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Цифри */}
      <section className="about-stats">
        <div className="about-band">
          <div className="about-inner">
            {stats.map((s) => (
              <div className="about-stat" key={s.label}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Керівництво */}
      <section className="about-band about-team">
        <div className="about-inner">
          <div className="about-section-head">
            <span className="about-pill">{t('Керівництво')}</span>
            <h2 className="about-section-title">{t('Хто стоїть за Kolir')}</h2>
          </div>
          <div className="about-leaders">
            {leaders.map((p) => (
              <article className="about-leader" key={p.name}>
                <div className="about-leader-photo">
                  {p.photo ? (
                    <img src={p.photo} alt={p.name} />
                  ) : (
                    <span className="about-leader-initials" aria-hidden="true">
                      {p.initials}
                    </span>
                  )}
                </div>
                <div className="about-leader-body">
                  <div className="about-leader-name">{p.name}</div>
                  <div className="about-leader-role">{p.role}</div>
                  <p className="about-leader-bio">{p.bio}</p>
                  {p.linkedin && (
                    <a
                      className="about-leader-li"
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} — LinkedIn`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="about-cta">
        <div className="about-band">
          <span className="about-cta-swirl" aria-hidden="true" />
          <div className="about-inner">
            <h2 className="about-cta-title">{t('Маєте ідею? Давайте зробимо з неї бренд.')}</h2>
            <a className="about-btn about-btn--yellow" href="/#contact" data-magnetic="0.2">
              {t('Розпочати проєкт')}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
