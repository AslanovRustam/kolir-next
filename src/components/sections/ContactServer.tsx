import { getPayload } from 'payload'
import config from '../../payload.config'
import { getLocale } from '../../lib/locale'
import Contact, { type ContactContent } from './Contact'

// uk-дефолти на випадок порожніх полів
const FALLBACK: ContactContent = {
  title: 'Створімо ваш бренд',
  sub: 'Від неймінгу до вебсайту — ми допомагаємо брендам виглядати цілісно та впевнено.',
  kicker: 'Контакти',
  formTitle: 'Залиште електронну пошту та коментар — ми звʼяжемося з вами, щоб обговорити проєкт.',
  nameLabel: 'Імʼя',
  namePlaceholder: 'Напр. Олена Коваленко',
  emailLabel: 'Email',
  emailPlaceholder: 'you@example.com',
  msgLabel: 'Коротко про проєкт',
  msgPlaceholder: 'Напр. Потрібен лендінг для запуску продукту…',
  submitLabel: 'Відправити',
  mailTitle: 'Пошта',
  mailBody: 'Звʼяжіться з нами напряму hello@kolir.agency',
  telegramTitle: 'Телеграм',
  telegramBody: 'Гарантуємо швидку відповідь @kolir_manager',
  officeTitle: 'Офіс',
  officeBody: 'Французький бульвар, 66/2, Одеса, Одеська область, 65062',
  statusSending: 'Надсилаємо…',
  statusOk: 'Дякуємо! Заявку отримано (демо-режим).',
  statusErr: 'Заповніть, будь ласка, обовʼязкові поля.',
  statusBad: 'Перевірте правильність email.',
}

export default async function ContactServer() {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const d = (await payload.findGlobal({ slug: 'home-contact', locale })) as Partial<ContactContent>

  // мерджимо CMS поверх дефолтів (порожні поля → uk-фолбек)
  const content = { ...FALLBACK } as ContactContent
  ;(Object.keys(FALLBACK) as (keyof ContactContent)[]).forEach((k) => {
    const v = d[k]
    if (typeof v === 'string' && v.trim()) content[k] = v
  })

  return <Contact content={content} />
}
