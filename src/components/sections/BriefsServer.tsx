import { getPayload } from 'payload'
import config from '../../payload.config'
import { getLocale } from '../../lib/locale'
import { makeT } from '../../lib/t'
import Briefs, { type BriefsContent, type BriefTab } from './Briefs'

// uk-дефолти на випадок порожніх полів
const FALLBACK: BriefsContent = {
  titleLine1: 'Маєте ідею',
  titleLine2: 'для проєкту?',
  lead: 'Розкажіть про бізнес, ідею або новий напрям — ми подивимось, як дизайн може допомогти.',
  kicker: 'Брифи',
  ctaLabel: 'Надіслати запит',
  tabs: [
    {
      label: 'Логотип',
      tag: 'Дизайн',
      title: 'Створюємо логотипи, що точно передають характер бренду та легко масштабуються.',
      desc: 'Продумуємо форму, символіку й використання, щоб знак працював у цифрових і фізичних середовищах.',
    },
    {
      label: 'Сайт',
      tag: 'Дизайн',
      title: 'Проєктуємо сайти як частину бренду, а не окремий дизайн-обʼєкт.',
      desc: 'Фокус — структура, меседжі та досвід користувача, які підтримують продажі та довіру.',
    },
    {
      label: 'Брендбук',
      tag: 'Дизайн',
      title: 'Формуємо чіткі правила використання бренду для команд і партнерів.',
      desc: 'Брендбук допомагає зберігати послідовність і впізнаваність на всіх каналах.',
    },
    {
      label: 'Посадкова сторінка',
      tag: 'Дизайн',
      title: 'Розробляємо посадкові сторінки під конкретну бізнес-ціль: запуск, продаж або тест гіпотез.',
      desc: 'Поєднуємо дизайн, копірайтинг і логіку в єдину конверсійну систему.',
    },
    {
      label: 'Відео',
      tag: 'Дизайн',
      title: 'Створюємо брендовані відео для презентацій, реклами та цифрових каналів.',
      desc: 'Фокусуємось на ідеї, ритмі та візуальній мові бренду.',
    },
    {
      label: 'Банери',
      tag: 'Дизайн',
      title: 'Дизайнимо рекламні та бренд-комунікаційні банери для онлайн-кампаній.',
      desc: 'Чіткий меседж, сильний візуал і адаптація під різні формати.',
    },
  ],
}

export default async function BriefsServer() {
  const locale = await getLocale()
  const t = makeT(locale)
  const payload = await getPayload({ config })
  const d = (await payload.findGlobal({ slug: 'home-briefs', locale })) as Partial<BriefsContent>

  const str = (v: unknown, fb: string) => (typeof v === 'string' && v.trim() ? v : fb)

  const cmsTabs = Array.isArray(d.tabs) ? (d.tabs as Partial<BriefTab>[]) : []
  const tabs: BriefTab[] =
    cmsTabs.length > 0
      ? cmsTabs.map((tab, i) => ({
          label: str(tab?.label, FALLBACK.tabs[i]?.label ?? ''),
          tag: str(tab?.tag, FALLBACK.tabs[i]?.tag ?? ''),
          title: str(tab?.title, FALLBACK.tabs[i]?.title ?? ''),
          desc: str(tab?.desc, FALLBACK.tabs[i]?.desc ?? ''),
        }))
      : FALLBACK.tabs

  const content: BriefsContent = {
    titleLine1: str(d.titleLine1, FALLBACK.titleLine1),
    titleLine2: str(d.titleLine2, FALLBACK.titleLine2),
    lead: str(d.lead, FALLBACK.lead),
    kicker: str(d.kicker, FALLBACK.kicker),
    ctaLabel: t('Надіслати запит'),
    tabs,
  }

  return <Briefs content={content} />
}
