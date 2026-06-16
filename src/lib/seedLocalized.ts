import { getPayload } from 'payload'
import config from '../payload.config'
import map from './static-i18n.json'

const dict = map as Record<string, string>

// Авто-переклад: en значення беремо зі словника, витягнутого з data-en статики.
// Якщо переклад не знайдено — лишаємо uk (Payload fallback усе одно поверне uk).
const toEn = (v: unknown): unknown => (typeof v === 'string' && dict[v] ? dict[v] : v)

// Сидимо глобал для обох локалей з ОДНОГО набору uk-даних:
// uk пишемо як є, en — авто-переклад кожного рядкового поля.
// enOverrides — явні en-значення для полів, де словник не справляється
// (розмітка <br>/<span> у заголовках, відсутній переклад тощо).
export async function seedGlobalBilingual(
  slug: string,
  ukData: Record<string, unknown>,
  enOverrides: Record<string, unknown> = {},
) {
  const payload = await getPayload({ config })
  type UpdArgs = Parameters<typeof payload.updateGlobal>[0]
  await payload.updateGlobal({ slug, locale: 'uk', data: ukData } as UpdArgs)

  const enData: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(ukData)) {
    if (Array.isArray(v)) {
      enData[k] = v.map((item) =>
        item && typeof item === 'object'
          ? Object.fromEntries(Object.entries(item).map(([ik, iv]) => [ik, toEn(iv)]))
          : toEn(item),
      )
    } else {
      enData[k] = toEn(v)
    }
  }
  Object.assign(enData, enOverrides) // явні overrides мають пріоритет
  await payload.updateGlobal({ slug, locale: 'en', data: enData } as UpdArgs)
}
