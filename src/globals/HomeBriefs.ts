import type { GlobalConfig } from 'payload'

// CMS-зріз блоку «Брифи». Тексти локалізовані (uk/en). href — структурний, у компоненті.
const t = (name: string) => ({ name, type: 'text' as const, localized: true })

export const HomeBriefs: GlobalConfig = {
  slug: 'home-briefs',
  label: 'Головна · Брифи',
  access: { read: () => true },
  fields: [
    t('titleLine1'),
    t('titleLine2'),
    t('lead'),
    t('kicker'),
    {
      name: 'tabs',
      type: 'array',
      localized: true,
      fields: [t('label'), t('tag'), t('title'), t('desc')],
    },
  ],
}
