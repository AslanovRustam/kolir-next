// SEO-тексти кейсів (стартові — узгодити з бренд-командою).
// title — без «| Kolir» (суфікс додає title.template). uk — на верхньому рівні,
// en — опційний блок для англомовної версії (/en/portfolio/{id}). Немає en →
// generateMetadata візьме англомовний шаблон-fallback.
export type CaseSeo = {
  title: string
  description: string
  en?: { title: string; description: string }
}

export const CASE_SEO: Record<string, CaseSeo> = {
  // ── Пріоритетні (затверджені) ──
  dotpay: {
    title: 'DotPay — брендинг банківського застосунку',
    description:
      'Кейс Kolir: брендинг і дизайн цифрового банківського застосунку DotPay. Продуктовий дизайн, брендинг, вебдизайн, моушн. Дивіться процес і результат.',
    en: {
      title: 'DotPay — Banking App Branding',
      description:
        'Kolir case study: branding and design for the DotPay digital banking app. Product design, branding, web design, motion. See the process and result.',
    },
  },
  vyriy: {
    title: 'Vyriy Industries — брендинг і сайт для defence-tech',
    description:
      'Кейс Kolir: брендинг і сайт для defence-tech компанії Vyriy Industries. Брендинг, вебдизайн, продуктовий дизайн. Дивіться процес і результат.',
    en: {
      title: 'Vyriy Industries — Branding & Website for Defence-Tech',
      description:
        'Kolir case study: branding and website for the defence-tech company Vyriy Industries. Branding, web design, product design. See the process and result.',
    },
  },
  planty: {
    title: 'Planty App — брендинг і дизайн застосунку',
    description:
      'Кейс Kolir: брендинг і дизайн застосунку для догляду за рослинами Planty. Продуктовий дизайн, брендинг, моушн. Дивіться процес і результат.',
    en: {
      title: 'Planty App — App Branding & Design',
      description:
        'Kolir case study: branding and design for the Planty plant-care app. Product design, branding, motion. See the process and result.',
    },
  },
  nakotne: {
    title: 'Nākotne — брендинг дитячого садка',
    description:
      'Кейс Kolir: брендинг дитячого садка Nākotne в Ризі — айдентика, маскот і сайт. Брендинг, вебдизайн. Дивіться процес і результат.',
    en: {
      title: 'Nākotne — Kindergarten Branding',
      description:
        'Kolir case study: branding for the Nākotne kindergarten in Riga — identity, mascot and website. Branding, web design. See the process and result.',
    },
  },
  hc: {
    title: 'HC Healthcare — брендинг і сайт у сфері медицини',
    description:
      'Кейс Kolir: брендинг і сайт платформи запису до лікарів HC Healthcare. Продуктовий дизайн, вебдизайн, брендинг. Дивіться процес і результат.',
    en: {
      title: 'HC Healthcare — Branding & Website in Healthcare',
      description:
        'Kolir case study: branding and website for the HC Healthcare doctor-booking platform. Product design, web design, branding. See the process and result.',
    },
  },
  sls: {
    title: 'SLS Residences — брендинг нерухомості',
    description:
      'Кейс Kolir: брендинг преміальної нерухомості SLS Residences на Palm Jumeirah. Брендинг, вебдизайн, моушн. Дивіться процес і результат.',
    en: {
      title: 'SLS Residences — Real Estate Branding',
      description:
        'Kolir case study: branding for the premium SLS Residences on Palm Jumeirah. Branding, web design, motion. See the process and result.',
    },
  },
  'med-bat': {
    title: 'Перший медичний батальйон — айдентика та сайт',
    description:
      'Кейс Kolir: айдентика та сайт для Першого медичного батальйону ЗСУ. Брендинг, вебдизайн. Дивіться процес і результат.',
    en: {
      title: 'First Medical Battalion — Identity & Website',
      description:
        'Kolir case study: identity and website for the First Medical Battalion of the Armed Forces of Ukraine. Branding, web design. See the process and result.',
    },
  },
  '15-krokiv': {
    title: '15 кроків до єдності — брендинг просвітницького проєкту',
    description:
      'Кейс Kolir: брендинг просвітницького проєкту «15 кроків до єдності». Брендинг, едиторіал-дизайн. Дивіться процес і результат.',
    en: {
      title: '15 Steps to Unity — Educational Project Branding',
      description:
        'Kolir case study: branding for the “15 Steps to Unity” educational project. Branding, editorial design. See the process and result.',
    },
  },

  // ── Решта (за шаблоном) ──
  strichka: {
    title: 'Strichka — вебдизайн і UX для спільноти',
    description:
      'Кейс Kolir: вебдизайн і UX для платформи української спільноти Strichka. Вебдизайн, продуктовий дизайн. Дивіться процес і результат.',
    en: {
      title: 'Strichka — Web Design & UX for a Community',
      description:
        'Kolir case study: web design and UX for the Ukrainian community platform Strichka. Web design, product design. See the process and result.',
    },
  },
  '252b': {
    title: '252 штурмовий батальйон — айдентика та сайт',
    description:
      'Кейс Kolir: айдентика та сайт для 252-го окремого штурмового батальйону. Брендинг, вебдизайн. Дивіться процес і результат.',
    en: {
      title: '252nd Assault Battalion — Identity & Website',
      description:
        'Kolir case study: identity and website for the 252nd Separate Assault Battalion. Branding, web design. See the process and result.',
    },
  },
  '1st-legion': {
    title: 'First International Legion — брендинг і сайт',
    description:
      'Кейс Kolir: брендинг і рекрутинговий сайт для Першого інтернаціонального легіону. Брендинг, вебдизайн. Дивіться процес і результат.',
    en: {
      title: 'First International Legion — Branding & Website',
      description:
        'Kolir case study: branding and a recruitment website for the First International Legion. Branding, web design. See the process and result.',
    },
  },
  kylon: {
    title: 'Heart of Ukraine — моушн і генеративна кампанія',
    description:
      'Кейс Kolir: генеративна кампанія й моушн-дизайн «Heart of Ukraine». Моушн, брендинг. Дивіться процес і результат.',
    en: {
      title: 'Heart of Ukraine — Motion & Generative Campaign',
      description:
        'Kolir case study: the “Heart of Ukraine” generative campaign and motion design. Motion, branding. See the process and result.',
    },
  },
  mits: {
    title: 'Mits Salt — брендинг і моушн-кампанія',
    description:
      'Кейс Kolir: брендинг і моушн-кампанія для Mits Salt. Моушн, брендинг. Дивіться процес і результат.',
    en: {
      title: 'Mits Salt — Branding & Motion Campaign',
      description:
        'Kolir case study: branding and a motion campaign for Mits Salt. Motion, branding. See the process and result.',
    },
  },
  zaz: {
    title: 'ZAZ 968 — генеративні відеовізуали',
    description:
      'Кейс Kolir: генеративні відеовізуали для ретро-кабріолета ZAZ 968. Моушн, брендинг. Дивіться процес і результат.',
    en: {
      title: 'ZAZ 968 — Generative Video Visuals',
      description:
        'Kolir case study: generative video visuals for the ZAZ 968 retro convertible. Motion, branding. See the process and result.',
    },
  },
  eps: {
    title: 'EPS — брендинг і сайт освітньої школи',
    description:
      'Кейс Kolir: брендинг і сайт для European Psychology School. Продуктовий дизайн, вебдизайн, брендинг. Дивіться процес і результат.',
    en: {
      title: 'EPS — Branding & Website for an Education School',
      description:
        'Kolir case study: branding and website for the European Psychology School. Product design, web design, branding. See the process and result.',
    },
  },
  edu: {
    title: 'Education LMS — продуктовий дизайн платформи',
    description:
      'Кейс Kolir: продуктовий дизайн освітньої платформи Education LMS. Продуктовий дизайн, вебдизайн, моушн. Дивіться процес і результат.',
    en: {
      title: 'Education LMS — Platform Product Design',
      description:
        'Kolir case study: product design for the Education LMS learning platform. Product design, web design, motion. See the process and result.',
    },
  },
  cqc: {
    title: 'Colleen Quinn — брендинг консалтингу',
    description:
      'Кейс Kolir: брендинг консалтингу Colleen Quinn Consultancy. Брендинг, вебдизайн. Дивіться процес і результат.',
    en: {
      title: 'Colleen Quinn — Consultancy Branding',
      description:
        'Kolir case study: branding for Colleen Quinn Consultancy. Branding, web design. See the process and result.',
    },
  },
  'ice-dating': {
    title: 'ICE Dating — UX/UI для dating-застосунку',
    description:
      'Кейс Kolir: UX/UI-дизайн для dating-застосунку ICE Dating. Вебдизайн, продуктовий дизайн. Дивіться процес і результат.',
    en: {
      title: 'ICE Dating — UX/UI for a Dating App',
      description:
        'Kolir case study: UX/UI design for the ICE Dating app. Web design, product design. See the process and result.',
    },
  },
  citf: {
    title: 'Cyprus IT Forum — брендинг і сайт події',
    description:
      'Кейс Kolir: брендинг і сайт для події Cyprus IT Forum. Вебдизайн, брендинг, моушн. Дивіться процес і результат.',
    en: {
      title: 'Cyprus IT Forum — Event Branding & Website',
      description:
        'Kolir case study: branding and website for the Cyprus IT Forum event. Web design, branding, motion. See the process and result.',
    },
  },

  // ── Приховані в лістингу, але сторінки існують ──
  'wirex-brand': {
    title: 'Wirex 2026 — брендинг фінтех-банкінгу',
    description:
      'Кейс Kolir: брендинг stablecoin-native банкінгу Wirex 2026. Брендинг, едиторіал-дизайн. Дивіться процес і результат.',
    en: {
      title: 'Wirex 2026 — Fintech Banking Branding',
      description:
        'Kolir case study: branding for the stablecoin-native banking Wirex 2026. Branding, editorial design. See the process and result.',
    },
  },
  'wirex-banners': {
    title: 'Wirex Campaigns — рекламна система банерів',
    description:
      'Кейс Kolir: рекламна банерна система Wirex Campaigns 2026. Брендинг, вебдизайн. Дивіться процес і результат.',
    en: {
      title: 'Wirex Campaigns — Banner Ad System',
      description:
        'Kolir case study: the Wirex Campaigns 2026 banner ad system. Branding, web design. See the process and result.',
    },
  },
  ctendo: {
    title: 'Ctendo Group — брендинг adtech-компанії',
    description:
      'Кейс Kolir: брендинг adtech-компанії Ctendo Group. Брендинг, вебдизайн. Дивіться процес і результат.',
    en: {
      title: 'Ctendo Group — Adtech Company Branding',
      description:
        'Kolir case study: branding for the adtech company Ctendo Group. Branding, web design. See the process and result.',
    },
  },
}
