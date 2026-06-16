import '../../../site-css/support-page.css'
import '../../../site-css/support-redesign.css'
import '../../../site-css/volunteer.css'
import VolunteerForm from '../../../components/VolunteerForm'
import SupportPortfolioSwiper from '../../../components/SupportPortfolioSwiper'
import ScriptOnMount from '../../../components/ScriptOnMount'
import { getLocale } from '../../../lib/locale'
import { makeT } from '../../../lib/t'

// Стати волонтером — порт зі статичного volunteer.html (1:1, без редизайну).
// Хедер/футер успадковуються з (frontend)/layout.tsx. Сторінкові стилі:
// support-page.css + support-redesign.css + volunteer.css (у тому ж порядку,
// що й у статиці). Форма заявки — клієнтський компонент VolunteerForm (демо).
export const metadata = {
  title: 'Стати волонтером · Kolir',
  description:
    'Kolir шукає волонтерів-дизайнерів, ілюстраторів та розробників. Реальні проєкти для ЗСУ та фондів, кейси для портфоліо, жодної бюрократії.',
}

export default async function VolunteerPage() {
  const locale = await getLocale()
  const t = makeT(locale)
  return (
    <main className="kolir-page support-page volunteer-page">
      <SupportPortfolioSwiper />
      <ScriptOnMount src="/js/vol-cards.js" />
      <div className="shell">
        {/* ============================ HERO ============================ */}
        <section className="hero" aria-label="Hero">
          <div className="hero-card support-hero-card vol-hero-card" id="heroCard">
            <div className="hero-card-decor" aria-hidden="true">
              <img className="vol-swirl vol-swirl--tl" src="/img/contact/pattern.png" alt="" />
              <img className="vol-swirl vol-swirl--bl" src="/img/contact/pattern.png" alt="" />
              <img className="vol-swirl vol-swirl--br" src="/img/contact/pattern.png" alt="" />
            </div>

            {/* ===== HERO INNER ===== */}
            <div className="hero-inner support-hero-inner vol-hero-inner">
              <div className="hero-inner-clip" aria-hidden="true" />

              <div className="hero-left support-hero-copy">
                <div className="pill">{t('Шукаємо волонтерів')}</div>

                <h1 className="hero-title support-title vol-title" data-reveal="up">
                  <span className="t-brand">{t('Добрі справи')}</span>{' '}
                  <span className="t-line t-line--1">{t('не мають кордонів')}</span>
                </h1>

                <div className="hero-bottom support-hero-bottom">
                  <div className="hero-info support-hero-info">
                    <p className="hero-desc support-hero-desc">
                      {t('Платформа, яка дозволяє робити улюблену справу й відчути свою допомогу армії.')}
                    </p>
                  </div>
                  <span className="support-hero-line" aria-hidden="true" />
                  <a className="btn support-hero-btn" href="#apply">
                    {t('Долучитись')}
                  </a>
                </div>
              </div>

              <div className="hero-right support-hero-right vol-hero-right">
                <img className="hero-scribble-y" src="/img/hero/scribble.png" alt="" aria-hidden="true" />
                <picture>
                  <img
                    className="girl support-statue vol-statues"
                    src="/img/volunteer/hero-statues.png"
                    alt="Українські статуї-волонтери"
                  />
                </picture>
              </div>

              {/* Моб-дублікат кнопки: на мобілці CTA стоїть унизу хіро (під
                  зображенням). На десктопі схований — там працює кнопка в копії. */}
              <a className="btn support-hero-btn vol-hero-btn-mob" href="#apply">
                {t('Долучитись')}
              </a>
            </div>
          </div>
        </section>

        {/* ============================ ABOUT / РОБИМО ВСЕ ============================ */}
        <section className="vol-about" aria-label="Про нашу місію">
          <div className="vol-about-inner">
            <div className="vol-about-left">
              <h2 className="vol-about-title" data-reveal="up">
                {t('Робимо все, що в наших силах. Тепер — разом з тобою.')}
              </h2>
              <div className="vol-about-copy">
                <p>
                  {t(
                    'Агенція цифрового брендингу Kolir з початку великого вторгнення допомагає війську, благодійним фондам і організаціям усім, чим може: вебдизайн, графіка, розробка, арт.',
                  )}
                </p>
                <p>
                  {t(
                    'Ми віримо, що лише спільними зусиллями всієї держави і світу ми зможемо вижити і перемогти — і робимо все, що в наших силах для цього.',
                  )}
                </p>
                <p>
                  {t(
                    'Зараз проєктів, яким потрібна допомога, більше, ніж нас. Тому шукаємо волонтерів, які допоможуть війську та державі, а заодно — додадуть собі в портфоліо реальні кейси, які мають значення.',
                  )}
                </p>
              </div>
            </div>

            <div className="vol-about-right" aria-hidden="false">
              <div className="vol-about-kicker">
                <span>{t('Про Kolir')}</span>
                <span className="vol-about-kline" />
              </div>

              <div className="vol-cards-wrap">
                <div className="vol-cards" id="volCards">
                  <div className="vol-cards-track">
                    <article className="vol-card vol-card--light">
                      <div className="vol-card-body">
                        <h3>{t('UI/UX Дизайн')}</h3>
                        <p>{t('Інтерфейси сайтів, застосунків, дашбордів.')}</p>
                      </div>
                      <span className="vol-card-ico" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                          <path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </article>

                    <article className="vol-card vol-card--yellow">
                      <div className="vol-card-body">
                        <h3>{t('Графіка / Ілюстрація')}</h3>
                        <p>{t('Айдентика, постери, соцмережі, ілюстрації.')}</p>
                      </div>
                      <span className="vol-card-ico" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M15.5 5.5l3 3L8 19l-4 1 1-4L15.5 5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                          <path d="M13.5 7.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </span>
                    </article>

                    <article className="vol-card vol-card--purple">
                      <div className="vol-card-body">
                        <h3>{t('Веброзробка')}</h3>
                        <p>{t('Лендінги, сайти, інтеграції.')}</p>
                      </div>
                      <span className="vol-card-ico" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 7l-2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </article>

                    <article className="vol-card vol-card--dark">
                      <div className="vol-card-body">
                        <h3>{t('Моушн / Відео')}</h3>
                        <p>{t('Анімація, ролики, контент для соцмереж.')}</p>
                      </div>
                      <span className="vol-card-ico" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M16 10l5-3v10l-5-3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </article>
                  </div>
                </div>
              </div>

              <div className="vol-cards-nav" aria-label="Навігація карток">
                <div className="vol-cards-dots">
                  <button className="vol-cards-dot is-active" type="button" aria-label="Картка 1" />
                  <button className="vol-cards-dot" type="button" aria-label="Картка 2" />
                  <button className="vol-cards-dot" type="button" aria-label="Картка 3" />
                  <button className="vol-cards-dot" type="button" aria-label="Картка 4" />
                </div>
                <div className="vol-cards-arrows">
                  <button className="vol-cards-arr vol-cards-prev" type="button" aria-label="Попередня">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 14l6-6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="vol-cards-arr vol-cards-next" type="button" aria-label="Наступна">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 10l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ CASES ============================ */}
        <section className="portfolio vol-cases" id="cases" aria-label="Реалізовані кейси">
          <div className="portfolio-head">
            <div data-reveal="up">
              <h2 className="p-title support-portfolio-title">{t('Що ми вже реалізували')}</h2>
              <p className="p-sub support-portfolio-sub">
                {t(
                  'Реальні волонтерські проєкти, які ми зробили разом із дизайнерами, ілюстраторами та розробниками, що долучилися до нас.',
                )}
              </p>
              <div className="p-underline support-portfolio-underline" aria-hidden="true" />
            </div>

            <div className="p-right">
              <div className="t-topright support-portfolio-marker" aria-hidden="true">
                <span>{t('Кейси')}</span>
                <span className="lines">
                  <span className="l1" />
                  <span className="l2" />
                </span>
              </div>
            </div>
          </div>

          <div className="p-stage">
            <div className="p-stage-inner">
              <svg aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <symbol id="pZigTop" viewBox="0 0 546 300">
                  <path
                    d="M1.71738 115.561C1.87124 115.226 2.04434 114.849 2.19821 114.514C7.01317 105.571 18.0825 102.175 27.0272 107.039C28.8457 108.036 71.6932 131.487 112.779 183.337C120.458 193.05 126.614 201.345 132.124 209.391C132.986 204.761 133.348 199.899 133.071 195.655C128.816 129.252 131.768 85.7058 142.048 66.2936C146.507 57.7955 155.524 53.1411 164.994 54.4387C174.525 55.7138 182.033 62.6044 184.136 72.015C191.896 106.663 199.399 133.723 204.131 144.456C235.308 214.467 255.88 233.114 262.625 239.244C273.768 249.346 295.336 265.712 314.288 261.453C323.142 259.467 330.413 250.242 335.846 234.117C340.49 220.37 342.263 205.493 341.831 190.354C335.721 188.127 329.602 185.591 323.454 182.787C307.929 175.731 255.248 147.917 229.486 87.4827C222.258 70.5094 203.079 25.4784 229.936 5.98871C235.701 1.80613 243.031 -0.277788 251.135 0.0297689C279.929 1.10324 309.628 21.9047 334.812 58.5964C353.904 86.4134 369.945 123.738 376.023 162.381C452.445 182.114 520.644 158.955 521.417 158.704C530.988 155.374 541.46 160.439 544.78 170.06C548.121 179.639 543.129 190.177 533.539 193.548C530.024 194.813 460.655 218.647 378.442 200.951C377.938 216.367 375.475 231.533 370.607 245.989C358.37 282.328 337.617 294.032 322.318 297.497C295.921 303.431 266.766 292.79 237.97 266.717C223.761 253.819 201.344 228.726 170.584 159.569C169.724 157.696 168.877 155.576 168.024 153.249C168.218 164.72 168.737 178.019 169.712 193.41C170.715 209.068 167.181 226.786 160.437 239.711C155.516 249.214 145.807 255.376 135.176 255.724C124.629 256.111 114.62 250.702 109.118 241.644C102.363 230.58 94.8631 220.036 84.0407 206.373C47.9587 160.81 10.0148 139.788 9.63953 139.614C1.07003 134.924 -2.3408 124.397 1.67891 115.644L1.71738 115.561ZM335.358 147.615C328.539 122.042 317.163 97.9091 304.528 79.4923C287.953 55.3342 268.392 39.4431 252.707 37.1397C252.788 41.6994 254.387 52.0958 263.235 72.9207C278.847 109.639 310.111 135.182 335.358 147.615Z"
                    fill="currentColor"
                  />
                </symbol>
              </svg>

              <button className="p-nav p-prev" type="button" aria-label="Previous slide">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14.5 5.5L8 12l6.5 6.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button className="p-nav p-next is-filled" type="button" aria-label="Next slide">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9.5 5.5L16 12l-6.5 6.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="swiper p-swiper support-portfolio-swiper" id="portfolioSwiper" aria-label="Cases slider">
                <div className="swiper-wrapper">
                  <article className="swiper-slide">
                    <a href="/portfolio" rel="noopener">
                      <div className="p-card support-portfolio-card">
                        <svg className="p-zigzag support-portfolio-card-zigzag" aria-hidden="true" focusable="false">
                          <use href="#pZigTop" />
                        </svg>
                        <div className="p-c">
                          <span className="p-pill support-portfolio-card-pill">UI / UX</span>
                          <h3 className="p-h3 support-portfolio-card-title">
                            VYRIY —
                            <br />
                            Вебсайт
                          </h3>
                        </div>
                        <div className="p-shot support-portfolio-card-shot">
                          <img src="/img/cases/vyriy.png" alt="VYRIY — Вебсайт" />
                        </div>
                        <span className="p-go support-portfolio-card-go" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
                            <path d="M9 7h8v8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </a>
                  </article>

                  <article className="swiper-slide">
                    <a href="/portfolio" rel="noopener">
                      <div className="p-card support-portfolio-card">
                        <svg className="p-zigzag support-portfolio-card-zigzag" aria-hidden="true" focusable="false">
                          <use href="#pZigTop" />
                        </svg>
                        <div className="p-c">
                          <span className="p-pill support-portfolio-card-pill">{t('Брендинг')}</span>
                          <h3 className="p-h3 support-portfolio-card-title">
                            Перший інтернаціональний
                            <br />
                            Легіон
                          </h3>
                        </div>
                        <div className="p-shot support-portfolio-card-shot">
                          <img src="/img/cases/strichka.png" alt="Перший інтернаціональний Легіон" />
                        </div>
                        <span className="p-go support-portfolio-card-go" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
                            <path d="M9 7h8v8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </a>
                  </article>

                  <article className="swiper-slide">
                    <a href="/portfolio" rel="noopener">
                      <div className="p-card support-portfolio-card">
                        <svg className="p-zigzag support-portfolio-card-zigzag" aria-hidden="true" focusable="false">
                          <use href="#pZigTop" />
                        </svg>
                        <div className="p-c">
                          <span className="p-pill support-portfolio-card-pill">UI / UX</span>
                          <h3 className="p-h3 support-portfolio-card-title">
                            «Будь у Курсі» —
                            <br />
                            Вебсайт
                          </h3>
                        </div>
                        <div className="p-shot support-portfolio-card-shot">
                          <img src="/img/cases/15krokiv.png" alt="«Будь у Курсі» — Вебсайт" />
                        </div>
                        <span className="p-go support-portfolio-card-go" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
                            <path d="M9 7h8v8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </a>
                  </article>
                </div>
              </div>

              <div className="p-progress" aria-hidden="true">
                <span className="p-progress-bar" id="pProgressBar" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================ APPLY / ЗАЛИШ ЗАЯВКУ ============================ */}
        <section className="contactk vol-contact" id="apply" aria-label="Залишити заявку">
          <div className="contactk-shell">
            <div className="contactk-card">
              <div className="contactk-deco" aria-hidden="true">
                <img className="contactk-pattern contactk-pattern--tr" src="/img/contact/pattern.png" alt="" />
                <img className="contactk-pattern contactk-pattern--l" src="/img/contact/pattern.png" alt="" />
                <img className="contactk-pattern contactk-pattern--bl" src="/img/contact/pattern.png" alt="" />
                <img className="contactk-pattern contactk-pattern--br" src="/img/contact/pattern.png" alt="" />
              </div>
              <div className="contactk-head" data-reveal="up">
                <div className="contactk-head-left">
                  <h2 className="contactk-title">{t('Залиш заявку — підберемо проєкт під твої навички.')}</h2>
                  <p className="contactk-sub">
                    {t(
                      'Ми не питатимемо про десятирічний досвід і не вимагатимемо тестових на тиждень. Розкажи, що вмієш і скільки часу можеш виділити — далі домовимося.',
                    )}
                  </p>
                  <span className="contactk-line" aria-hidden="true" />
                </div>
                <div className="contactk-head-right">
                  <span>{t('Заявка')}</span>
                  <div className="contactk-underlines" aria-hidden="true">
                    <span className="line line--purple" />
                    <span className="line line--yellow" />
                  </div>
                </div>
              </div>

              <div className="contactk-grid">
                {/* Жовта карточка-форма (структура з головної) */}
                <div className="ck-form">
                  <div className="ck-form-left">
                    <span className="ck-form-scribble" aria-hidden="true" />
                    <div className="ck-form-body">
                      <div className="ck-form-title">
                        {t(
                          'Долучайся — реальні волонтерські проєкти для ЗСУ та фондів, кейси для портфоліо й жодної бюрократії.',
                        )}
                      </div>
                      <ul className="ck-form-points">
                        <li>{t('Реальні проєкти для ЗСУ та фондів')}</li>
                        <li>{t('Кейси, які не соромно додати в портфоліо')}</li>
                        <li>{t('Жодної бюрократії — пишемо в Telegram')}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ck-form-right">
                    <VolunteerForm locale={locale} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
