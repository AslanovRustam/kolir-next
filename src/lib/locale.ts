import { cookies } from 'next/headers'

export type Locale = 'uk' | 'en'
export const LOCALE_COOKIE = 'locale'

// Поточна локаль із cookie (server). Дефолт — українська.
export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  const v = store.get(LOCALE_COOKIE)?.value
  return v === 'en' ? 'en' : 'uk'
}
