import { getPayload } from 'payload'
import config from '../../payload.config'
import { getLocale } from '../../lib/locale'
import Testimonials, { type TestimonialsContent, type Review } from './Testimonials'

// uk-дефолти на випадок порожніх полів
const FALLBACK: TestimonialsContent = {
  kicker: 'Відгуки',
  titlePre: 'Що кажуть ',
  titleAccent: 'клієнти',
  subtitle:
    'Ми цінуємо чіткість, комунікацію та довгострокову співпрацю — і наші клієнти це відзначають.',
  reviews: [
    { name: 'Sarah Chen', role: 'Product Lead', rate: '4.9', text: 'Вони зрозуміли наш продукт краще за нас самих. Редизайн удвічі скоротив звернення в підтримку, і користувачам тепер справді подобається платформа.' },
    { name: 'Dylan Novak', role: 'CTO', rate: '4.8', text: 'Чітка структура, виважені UX-рішення та швидкі ітерації. Підсумковий результат зменшив тертя й підвищив конверсію.' },
    { name: 'Mina Park', role: 'Засновниця', rate: '5.0', text: 'Маленька команда, що працює як велика. Брендинг, сайт і моушн — усе цілісно й вчасно.' },
    { name: 'Olha Tkach', role: 'Маркетинг-лід', rate: '4.9', text: 'Чіткий процес від першого дзвінка, прозорі дедлайни й результат, який не соромно запускати. Працювати з командою було легко й приємно.' },
    { name: 'Marko Levchenko', role: 'Продакт-овнер', rate: '5.0', text: 'Вони занурились у наші метрики, а не лише в картинку. Новий інтерфейс швидший, чистіший і нарешті відчувається як наш бренд.' },
    { name: 'Iryna Bondar', role: 'CEO', rate: '4.8', text: 'Від неймінгу до запуску — єдиний голос бренду. Конверсія зросла, а компанія нарешті виглядає як лідер, яким ми хочемо бути.' },
  ],
}

export default async function TestimonialsServer() {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const d = (await payload.findGlobal({ slug: 'home-testimonials', locale })) as Partial<TestimonialsContent>

  const str = (v: unknown, fb: string) => (typeof v === 'string' && v.trim() ? v : fb)

  const cmsReviews = Array.isArray(d.reviews) ? (d.reviews as Partial<Review>[]) : []
  const reviews: Review[] =
    cmsReviews.length > 0
      ? cmsReviews.map((r, i) => ({
          name: str(r?.name, FALLBACK.reviews[i]?.name ?? ''),
          role: str(r?.role, FALLBACK.reviews[i]?.role ?? ''),
          rate: str(r?.rate, FALLBACK.reviews[i]?.rate ?? ''),
          text: str(r?.text, FALLBACK.reviews[i]?.text ?? ''),
        }))
      : FALLBACK.reviews

  const content: TestimonialsContent = {
    kicker: str(d.kicker, FALLBACK.kicker),
    titlePre: str(d.titlePre, FALLBACK.titlePre),
    titleAccent: str(d.titleAccent, FALLBACK.titleAccent),
    subtitle: str(d.subtitle, FALLBACK.subtitle),
    reviews,
  }

  return <Testimonials content={content} />
}
