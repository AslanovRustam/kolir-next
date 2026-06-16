import { getPayload } from 'payload'
import config from '../../payload.config'
import { getLocale } from '../../lib/locale'
import Services, { type ServicesContent, type ServiceCard } from './Services'

// uk-дефолти на випадок порожніх полів
const FALLBACK: ServicesContent = {
  title: 'Наші послуги',
  kicker: 'Сервіси',
  cards: [
    {
      title: 'Назви брендів',
      desc: 'Чіткі, запам’ятовувані назви, готові жити на ринку.',
    },
    {
      title: 'Візуальна айдентика',
      desc: 'Логотипи та дизайн-системи, що масштабуються на всіх каналах — онлайн та офлайн.',
    },
    {
      title: 'Графічний дизайн',
      desc: 'Брендові матеріали, презентації та візуальні комунікації, що зберігають послідовність бренду.',
    },
    {
      title: 'Веб-дизайн',
      desc: 'Сайти, що передають бренд, підтримують продажі та стають центром цифрової присутності.',
    },
    {
      title: 'Моушн-дизайн',
      desc: 'Анімація та переходи, що додають енергії й оживляють ваш бренд.',
    },
  ],
}

export default async function ServicesServer() {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const d = (await payload.findGlobal({ slug: 'home-services', locale })) as Partial<ServicesContent>

  const str = (v: unknown, fb: string) => (typeof v === 'string' && v.trim() ? v : fb)

  const cmsCards = Array.isArray(d.cards) ? (d.cards as Partial<ServiceCard>[]) : []
  const cards: ServiceCard[] =
    cmsCards.length > 0
      ? cmsCards.map((card, i) => ({
          title: str(card?.title, FALLBACK.cards[i]?.title ?? ''),
          desc: str(card?.desc, FALLBACK.cards[i]?.desc ?? ''),
        }))
      : FALLBACK.cards

  const content: ServicesContent = {
    title: str(d.title, FALLBACK.title),
    kicker: str(d.kicker, FALLBACK.kicker),
    cards,
  }

  return <Services content={content} />
}
