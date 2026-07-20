import { headers } from 'next/headers'

export type Locale = 'uk' | 'en'

// Поточна локаль — із заголовка, який ставить middleware за URL-префіксом (/en).
// Дефолт — українська. Сигнатура async збережена (усі виклики getLocale() без змін).
export async function getLocale(): Promise<Locale> {
  const h = await headers()
  return h.get('x-locale') === 'en' ? 'en' : 'uk'
}
