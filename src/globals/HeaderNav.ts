import type { GlobalConfig } from 'payload'

// Лейбли навігації + CTA хедера. Локалізовані (uk/en). Хедер — клієнтський
// компонент, тож тягнемо ці значення на сервері (layout/HeaderServer) і
// передаємо пропсами.
export const HeaderNav: GlobalConfig = {
  slug: 'header',
  label: 'Хедер · Навігація',
  access: { read: () => true },
  fields: [
    { name: 'navServices', type: 'text', localized: true },
    { name: 'navPortfolio', type: 'text', localized: true },
    { name: 'navBrief', type: 'text', localized: true },
    { name: 'navContact', type: 'text', localized: true },
    { name: 'navHelp', type: 'text', localized: true },
    { name: 'cta', type: 'text', localized: true },
  ],
}
