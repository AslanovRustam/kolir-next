import { getPayload } from 'payload'
import config from './payload.config'

// Сид першого CMS-зрізу (Герой головної) для обох локалей.
// Запуск: npx payload run src/seed.ts
const run = async () => {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'home-hero',
    locale: 'uk',
    data: {
      pill: 'Налаштувати яскравість!',
      titleLine1: 'Бренди рухають світ.',
      titleLine2: 'Ми рухаємо бренди вперед.',
      desc: 'Брендингова агенція, орієнтована на дизайн, що створює назви, айдентику та цифрову присутність для бізнесів, які зростають.',
      ctaLabel: 'Розпочати проєкт',
    },
  })

  await payload.updateGlobal({
    slug: 'home-hero',
    locale: 'en',
    data: {
      pill: 'Adjust brightness!',
      titleLine1: 'Brands move the world.',
      titleLine2: 'We move brands forward.',
      desc: 'A design-led branding agency creating names, identities, and digital presence for growing businesses.',
      ctaLabel: 'Start a project',
    },
  })

  // eslint-disable-next-line no-console
  console.log('✓ Seeded home-hero (uk + en)')
  process.exit(0)
}

run()
