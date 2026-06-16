import type { GlobalConfig } from 'payload'

// CMS-зріз блоку «Контакти». Усі тексти локалізовані (uk/en), включно зі
// статусами демо-форми.
const t = (name: string) => ({ name, type: 'text' as const, localized: true })

export const HomeContact: GlobalConfig = {
  slug: 'home-contact',
  label: 'Головна · Контакти',
  access: { read: () => true },
  fields: [
    t('title'),
    t('sub'),
    t('kicker'),
    t('formTitle'),
    t('nameLabel'),
    t('namePlaceholder'),
    t('emailLabel'),
    t('emailPlaceholder'),
    t('msgLabel'),
    t('msgPlaceholder'),
    t('submitLabel'),
    t('mailTitle'),
    t('mailBody'),
    t('telegramTitle'),
    t('telegramBody'),
    t('officeTitle'),
    t('officeBody'),
    t('statusSending'),
    t('statusOk'),
    t('statusErr'),
    t('statusBad'),
  ],
}
