import type { GlobalConfig } from 'payload'

// CMS-зріз блоку «Відгуки». Тексти локалізовані (uk/en).
const t = (name: string) => ({ name, type: 'text' as const, localized: true })

export const HomeTestimonials: GlobalConfig = {
  slug: 'home-testimonials',
  label: 'Головна · Відгуки',
  access: { read: () => true },
  fields: [
    t('kicker'),
    t('titlePre'),
    t('titleAccent'),
    t('subtitle'),
    {
      name: 'reviews',
      type: 'array',
      localized: true,
      fields: [t('name'), t('role'), t('rate'), t('text')],
    },
  ],
}
