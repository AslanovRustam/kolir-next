import type { Locale } from './locale'

// Префікс /en для внутрішніх посилань в англомовній версії, щоб навігація не
// «витікала» на uk-дерево. Client-safe (без next/headers) — можна тягнути і в
// 'use client'-компоненти. Зовнішні URL і вже /en-посилання лишаються як є.
export function localeHref(href: string, locale: Locale): string {
  if (locale !== 'en') return href
  if (!href.startsWith('/') || href.startsWith('/en')) return href
  return href === '/' ? '/en' : `/en${href}`
}
