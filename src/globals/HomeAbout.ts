import type { GlobalConfig } from 'payload'

// CMS-зріз блоку «Про Колір». Локалізовані поля (uk/en). quoteText/authorName
// у статиці не перекладалися — для en лишаємо порожнім, спрацює fallback→uk.
export const HomeAbout: GlobalConfig = {
  slug: 'home-about',
  label: 'Головна · Про нас',
  access: { read: () => true },
  fields: [
    { name: 'pill', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'para1', type: 'textarea', localized: true },
    { name: 'para2', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'quoteText', type: 'text', localized: true },
    { name: 'quoteAuthorName', type: 'text', localized: true },
    { name: 'quoteAuthorRole', type: 'text', localized: true },
  ],
}
