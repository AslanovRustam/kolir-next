import type { Metadata } from 'next'
import Image from 'next/image'
import '../../../site-css/support-page.css'
import '../../../site-css/support-redesign.css'
import '../../../site-css/volunteer.css'
import '../../../site-css/spilnota.css'
import SupportPortfolioSwiper from '../../../components/SupportPortfolioSwiper'
import SupportCaseSlides from '../../../components/portfolio/SupportCaseSlides'
import Services from '../../../components/sections/Services'
import { getLocale } from '../../../lib/locale'
import { makeT } from '../../../lib/t'
import { pageMeta } from '../../../lib/seo'

// «Колір.Спільнота» — платформа-посередник між організаціями й волонтерами
// (Figma 6644-53474). Сторінка зібрана з уже наявних блоків сайту:
//   • хіро — двошарка support/volunteer (звідси й клас .volunteer-page: він
//     вмикає весь набір hero-правил і адаптивів із volunteer.css, ми лише
//     міняємо зображення/тексти й доганяємо дельти у spilnota.css);
//   • «Напрямки» — компонент <Services/> головної (той самий hover-розкрив);
//   • кейси — слайдер зі сторінок /support і /volunteer (SupportCaseSlides);
//   • CTA — розкладка «Залиш заявку» з /volunteer (.vol-apply-*).
// Форми немає: обидві кнопки ведуть у Telegram до менеджера.
const TELEGRAM = 'https://t.me/kolir_manager'

const META = {
  uk: {
    title: 'Колір.Спільнота — волонтерська платформа Kolir',
    description:
      'Платформа, яка допомагає військовим підрозділам, благодійним організаціям і бізнесам, що постраждали від війни, знаходити волонтерів для дизайну, графіки та розробки.',
  },
  en: {
    title: 'Kolir.Community — Kolir Volunteer Platform',
    description:
      'A platform that helps military units, charities and war-affected businesses find volunteers for design, graphics and development tasks.',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMeta({ ...META[locale], path: '/spilnota', locale, absoluteTitle: true })
}

export default async function SpilnotaPage() {
  const locale = await getLocale()
  const t = makeT(locale)

  const DIRECTIONS = {
    title: t('Напрямки, у яких ми працюємо'),
    kicker: t('Сервіси'),
    sub: t(
      'Кожна задача розбивається на конкретний обсяг і потрапляє до волонтера з відповідними навичками.',
    ),
    cards: [
      {
        title: t('UI/UX Дизайн'),
        desc: t('Сайти, застосунки, дашборди та інші цифрові продукти.'),
      },
      {
        title: t('Графіка / Ілюстрація'),
        desc: t('Айдентика, постери, матеріали для соцмереж та ілюстрації.'),
      },
      { title: t('Фронтенд'), desc: t('React, TypeScript, верстка та інтеграції.') },
      { title: t('Бекенд'), desc: t('API, бази даних, інфраструктура та інтеграції.') },
    ],
  }

  const CHECKS = [
    t('Допомога військовим підрозділам, фондам і бізнесам'),
    t('Координація та перевірка результату командою Kolir'),
    t('Швидка комунікація через Telegram'),
  ]

  return (
    <main className="kolir-page support-page volunteer-page spilnota-page">
      <SupportPortfolioSwiper />
      <div className="shell">
        {/* ============================ HERO ============================ */}
        <section className="hero" aria-label="Hero">
          <div className="hero-card support-hero-card vol-hero-card" id="heroCard">
            {/* Декор-вишиванка: розміри задає CSS (.vol-swirl), width/height тут —
                лише інтринсик-пропорція для next/image. */}
            <div className="hero-card-decor" aria-hidden="true">
              <Image
                className="vol-swirl vol-swirl--tl"
                src="/img/contact/pattern.webp"
                alt=""
                width={678}
                height={864}
              />
              <Image
                className="vol-swirl vol-swirl--bl"
                src="/img/contact/pattern.webp"
                alt=""
                width={678}
                height={864}
              />
              <Image
                className="vol-swirl vol-swirl--br"
                src="/img/contact/pattern.webp"
                alt=""
                width={678}
                height={864}
              />
            </div>

            <div className="hero-inner support-hero-inner vol-hero-inner">
              <div className="hero-inner-clip" aria-hidden="true" />

              <div className="hero-left support-hero-copy">
                <div className="pill">{t('Колір.Спільнота')}</div>

                <h1 className="hero-title support-title vol-title" data-reveal="up">
                  <span className="t-brand">{t('Добрі справи')}</span>{' '}
                  <span className="t-line t-line--1">{t('не мають кордонів')}</span>
                </h1>

                <div className="hero-bottom support-hero-bottom">
                  <div className="hero-info support-hero-info">
                    <p className="hero-desc support-hero-desc">
                      {t(
                        'Платформа, яка допомагає військовим підрозділам, благодійним організаціям, а також бізнесам, що постраждали від війни, знаходити волонтерів для виконання окремих завдань.',
                      )}
                    </p>
                  </div>
                  <span className="support-hero-line" aria-hidden="true" />
                  <a
                    className="btn support-hero-btn"
                    href={TELEGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Зробити запит')}
                  </a>
                </div>
              </div>

              {/* <picture> лишається: volunteer.css позиціонує кадр саме через нього */}
              <div className="hero-right support-hero-right vol-hero-right spil-hero-right">
                <picture>
                  <Image
                    className="girl support-statue vol-statues spil-couple"
                    src="/img/spilnota/hero-couple.webp"
                    alt={t('Статуї у вишиванках — символ спільноти Kolir')}
                    width={977}
                    height={732}
                    sizes="(max-width: 767px) 100vw, 62vw"
                    priority
                  />
                </picture>
              </div>

              {/* Моб-дублікат кнопки: на мобілці CTA стоїть унизу хіро (під зображенням) */}
              <a
                className="btn support-hero-btn vol-hero-btn-mob"
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('Зробити запит')}
              </a>
            </div>
          </div>
        </section>

        {/* ========================== НАВІЩО ЦЕ ========================== */}
        <section className="spil-why" aria-label="Навіщо це">
          <div className="spil-why-inner">
            <div className="spil-why-left">
              <h2 className="spil-why-title" data-reveal="up">
                {t('Є задача, але бракує рук? Зможемо допомогти.')}
              </h2>
              <div className="spil-why-copy">
                <p>
                  {t(
                    'З початку повномасштабного вторгнення команда Kolir активно допомагає зі створенням дизайну, розробкою та іншими креативними задачами.',
                  )}
                  {/* <br />
                  {t(
                    'Таких запитів стає дедалі більше. Саме тому ми створили платформу «Колір.Спільнота», навколо якої обʼєднуємо сторонніх волонтерів відповідних напрямків, які готові використати свої професійні навички, щоб допомагати країні.',
                  )}
                </p> */}
                <p>
                  {t(
                    'Таких запитів стає дедалі більше. Саме тому ми створили платформу «Колір.Спільнота», навколо якої обʼєднуємо сторонніх волонтерів відповідних напрямків, які готові використати свої професійні навички, щоб допомагати країні.',
                  )}
                </p>
              </div>
            </div>

            <div className="spil-why-right">
              <div className="spil-why-kicker" aria-hidden="true">
                <span>{t('Навіщо це')}</span>
                <span className="lines">
                  <span className="l1" />
                  <span className="l2" />
                </span>
              </div>
              <div className="spil-why-note">
                {t(
                  'Якщо ваша організація дотична до війська чи постраждала від російських атак, розкажіть нам про свої потреби — ми допоможемо знайти волонтера й організувати роботу над кожною окремою задачею. Без потреби шукати працівника в компанію. Від створення логотипу до повноцінної розробки айдентики або вебсайту.',
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================== НАПРЯМКИ ========================== */}
        <Services content={DIRECTIONS} id="directions" className="services--spilnota" showKicker />

        {/* ============================ КЕЙСИ ============================ */}
        <section
          className="portfolio vol-cases spil-cases"
          id="cases"
          aria-label="Реалізовані кейси"
        >
          <div className="portfolio-head spil-cases-head">
            <div data-reveal="up">
              <h2 className="p-title support-portfolio-title">{t('Що ми вже реалізували')}</h2>
              <p className="p-sub support-portfolio-sub">
                {t(
                  'Проєкти для військових підрозділів, благодійних і громадських організацій, розроблені командою Kolir і волонтерами, які до нас долучилися.',
                )}
              </p>
              <div className="p-underline support-portfolio-underline" aria-hidden="true" />
            </div>
          </div>

          <div className="p-stage">
            <div className="p-stage-inner">
              <svg
                aria-hidden="true"
                focusable="false"
                style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
              >
                <symbol id="pZigTop" viewBox="0 0 546 300">
                  <path
                    d="M1.71738 115.561C1.87124 115.226 2.04434 114.849 2.19821 114.514C7.01317 105.571 18.0825 102.175 27.0272 107.039C28.8457 108.036 71.6932 131.487 112.779 183.337C120.458 193.05 126.614 201.345 132.124 209.391C132.986 204.761 133.348 199.899 133.071 195.655C128.816 129.252 131.768 85.7058 142.048 66.2936C146.507 57.7955 155.524 53.1411 164.994 54.4387C174.525 55.7138 182.033 62.6044 184.136 72.015C191.896 106.663 199.399 133.723 204.131 144.456C235.308 214.467 255.88 233.114 262.625 239.244C273.768 249.346 295.336 265.712 314.288 261.453C323.142 259.467 330.413 250.242 335.846 234.117C340.49 220.37 342.263 205.493 341.831 190.354C335.721 188.127 329.602 185.591 323.454 182.787C307.929 175.731 255.248 147.917 229.486 87.4827C222.258 70.5094 203.079 25.4784 229.936 5.98871C235.701 1.80613 243.031 -0.277788 251.135 0.0297689C279.929 1.10324 309.628 21.9047 334.812 58.5964C353.904 86.4134 369.945 123.738 376.023 162.381C452.445 182.114 520.644 158.955 521.417 158.704C530.988 155.374 541.46 160.439 544.78 170.06C548.121 179.639 543.129 190.177 533.539 193.548C530.024 194.813 460.655 218.647 378.442 200.951C377.938 216.367 375.475 231.533 370.607 245.989C358.37 282.328 337.617 294.032 322.318 297.497C295.921 303.431 266.766 292.79 237.97 266.717C223.761 253.819 201.344 228.726 170.584 159.569C169.724 157.696 168.877 155.576 168.024 153.249C168.218 164.72 168.737 178.019 169.712 193.41C170.715 209.068 167.181 226.786 160.437 239.711C155.516 249.214 145.807 255.376 135.176 255.724C124.629 256.111 114.62 250.702 109.118 241.644C102.363 230.58 94.8631 220.036 84.0407 206.373C47.9587 160.81 10.0148 139.788 9.63953 139.614C1.07003 134.924 -2.3408 124.397 1.67891 115.644L1.71738 115.561ZM335.358 147.615C328.539 122.042 317.163 97.9091 304.528 79.4923C287.953 55.3342 268.392 39.4431 252.707 37.1397C252.788 41.6994 254.387 52.0958 263.235 72.9207C278.847 109.639 310.111 135.182 335.358 147.615Z"
                    fill="currentColor"
                  />
                </symbol>
              </svg>

              <button className="p-nav p-prev" type="button" aria-label="Previous slide">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M14.5 5.5L8 12l6.5 6.5"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button className="p-nav p-next is-filled" type="button" aria-label="Next slide">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9.5 5.5L16 12l-6.5 6.5"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className="swiper p-swiper support-portfolio-swiper"
                id="portfolioSwiper"
                aria-label="Cases slider"
              >
                <div className="swiper-wrapper">
                  <SupportCaseSlides locale={locale} />
                </div>
              </div>

              <div className="p-progress" aria-hidden="true">
                <span className="p-progress-bar" id="pProgressBar" />
              </div>
            </div>
          </div>
        </section>

        {/* ====================== CTA / ПОДАТИ ПРОЄКТ ====================== */}
        <section className="contactk vol-contact spil-cta" id="apply" aria-label="Подати проєкт">
          <div className="contactk-shell">
            <div className="contactk-card">
              <div className="contactk-deco" aria-hidden="true">
                <Image
                  className="contactk-pattern contactk-pattern--tr"
                  src="/img/contact/pattern.webp"
                  alt=""
                  width={678}
                  height={864}
                />
                <Image
                  className="contactk-pattern contactk-pattern--l"
                  src="/img/contact/pattern.webp"
                  alt=""
                  width={678}
                  height={864}
                />
                <Image
                  className="contactk-pattern contactk-pattern--bl"
                  src="/img/contact/pattern.webp"
                  alt=""
                  width={678}
                  height={864}
                />
                <Image
                  className="contactk-pattern contactk-pattern--br"
                  src="/img/contact/pattern.webp"
                  alt=""
                  width={678}
                  height={864}
                />
              </div>

              <div className="vol-apply-grid spil-cta-grid">
                <div className="vol-apply-left" data-reveal="up">
                  <div className="vol-apply-pill">{t('Подати проєкт')}</div>
                  <h2 className="vol-apply-title">
                    {t('Розкажіть про задачу — ми знайдемо фахівця.')}
                  </h2>
                  <p className="vol-apply-sub">
                    {t(
                      'Надішліть нам короткий опис своєї організації чи підрозділу, ідею, очікуваний результат і дедлайн через Telegram. Наш менеджер звʼяжеться з вами для уточнень. Після розгляду запиту ми підберемо волонтера з потрібними навичками.',
                    )}
                  </p>
                  <a
                    className="spil-cta-btn"
                    href={TELEGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Подати заявку')}
                  </a>
                </div>

                <div className="vol-apply-right spil-cta-right">
                  <ul className="spil-cta-list">
                    {CHECKS.map((text) => (
                      <li key={text}>
                        <span className="spil-cta-check" aria-hidden="true">
                          <svg viewBox="0 0 13 13" fill="none">
                            <path
                              d="M2.6 6.9l2.6 2.6 5.2-6"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="spil-cta-text">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
