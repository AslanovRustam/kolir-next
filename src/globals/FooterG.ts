import type { GlobalConfig } from 'payload'

// Футер. Локалізовані текстові поля (uk/en).
export const FooterG: GlobalConfig = {
  slug: 'footer',
  label: 'Футер',
  access: { read: () => true },
  fields: [
    { name: 'copy', type: 'text', localized: true },
    { name: 'legal', type: 'textarea', localized: true },
    { name: 'privacyLink', type: 'text', localized: true },
  ],
}
