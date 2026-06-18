import { cookies } from 'next/headers'
import { LOCALE_COOKIE } from './locale-cookie'

export type Locale = 'uk' | 'en'
export { LOCALE_COOKIE }

// Поточна локаль із cookie (server). Дефолт — українська.
export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  const v = store.get(LOCALE_COOKIE)?.value
  return v === 'en' ? 'en' : 'uk'
}
