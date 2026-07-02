// Спільні слайди коверфлоу-портфоліо для сторінок Support Ukraine та Волонтерство.
// Заголовок — назва відповідного кейса з портфоліо (локалізована: UA/EN), без
// «Website/Landing Page». Карточки ведуть на кейс. Зображення — /public/img/slider.
const SLIDES: { pill: string; uk: string; en: string; img: string; alt: string; href: string }[] = [
  {
    pill: 'UI/UX',
    uk: 'Стрічка',
    en: 'Strichka',
    img: '/img/slider/strichka.png',
    alt: 'Strichka',
    href: '/portfolio/strichka',
  },
  {
    pill: 'UI/UX',
    uk: '252 ОШБ',
    en: '252 Assault Battalion',
    img: '/img/slider/252oshb.png',
    alt: '252 ОШБ',
    href: '/portfolio/252b',
  },
  {
    pill: 'UI/UX',
    uk: 'Будь у Курсі',
    en: 'Stay Informed',
    img: '/img/slider/bud_y_kursi.png',
    alt: '15 кроків до єдності',
    href: '/portfolio/15-krokiv',
  },
  {
    pill: 'UI/UX',
    uk: 'Перший інтернаціональний Легіон',
    en: 'International Legion',
    img: '/img/slider/1st_legion.png',
    alt: 'Перший інтернаціональний Легіон',
    href: '/portfolio/1st-legion',
  },
  {
    pill: 'UI/UX',
    uk: 'Vyriy Industries',
    en: 'Vyriy Industries',
    img: '/img/slider/vyriy.png',
    alt: 'Vyriy Industries',
    href: '/portfolio/vyriy',
  },
  // { pill: 'UI/UX', uk: 'Окремий медичний батальйон', en: 'Medical Battalion', img: '/img/slider/med_bat.png', alt: 'Медбат', href: '/portfolio' },
]

export default function SupportCaseSlides({ locale = 'uk' }: { locale?: 'uk' | 'en' }) {
  return (
    <>
      {SLIDES.map((s, i) => {
        const title = locale === 'en' ? s.en : s.uk
        return (
          <article className="swiper-slide" key={i}>
            <a href={s.href}>
              <div className="p-card support-portfolio-card">
                <svg
                  className="p-zigzag support-portfolio-card-zigzag"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href="#pZigTop" />
                </svg>
                <div className="p-c">
                  <span className="p-pill support-portfolio-card-pill">{s.pill}</span>
                  <h3 className="p-h3 support-portfolio-card-title">{title}</h3>
                </div>
                <div className="p-shot support-portfolio-card-shot">
                  <img src={s.img} alt={title} />
                </div>
                <span className="p-go support-portfolio-card-go" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
                    <path
                      d="M9 7h8v8"
                      stroke="#fff"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </a>
          </article>
        )
      })}
    </>
  )
}
