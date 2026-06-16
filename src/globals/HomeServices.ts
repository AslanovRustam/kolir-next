import type { GlobalConfig } from 'payload'

// CMS-зріз блоку «Наші послуги». Тексти локалізовані (uk/en).
const t = (name: string) => ({ name, type: 'text' as const, localized: true })

export const HomeServices: GlobalConfig = {
  slug: 'home-services',
  label: 'Головна · Послуги',
  access: { read: () => true },
  fields: [
    t('title'),
    t('kicker'),
    {
      name: 'cards',
      type: 'array',
      localized: true,
      fields: [t('title'), t('desc')],
    },
  ],
}
