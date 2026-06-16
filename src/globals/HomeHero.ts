import type { GlobalConfig } from 'payload'

// Перший CMS-зріз: контент героя головної. Усі текстові поля локалізовані
// (uk/en) — Payload зберігає окреме значення на кожну локаль.
export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: 'Головна · Герой',
  access: { read: () => true },
  fields: [
    { name: 'pill', type: 'text', localized: true },
    { name: 'titleLine1', type: 'text', localized: true },
    { name: 'titleLine2', type: 'text', localized: true },
    { name: 'desc', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
  ],
}
