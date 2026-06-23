// Server-only. Визначає, для яких локалей у кейса є картинки, і фільтрує видимість.
// Правило: кейс із {lang}-галереєю показується на локалі ЛИШЕ якщо існує відповідна
// папка зображень (uk → images/<base>/ua, en → images/<base>/en). Кейси без {lang}
// (мовно-нейтральні картинки) показуються на обох. Перевірка по файловій системі —
// додав папку версії → кейс автоматично починає показуватись.
import fs from 'fs'
import path from 'path'
import { CASES, type CaseItem } from '../data/cases'

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const IMG_RE = /\.(jpe?g|png|webp|gif|avif|svg)$/i

function dirExists(rel: string): boolean {
  try {
    return fs.statSync(path.join(PUBLIC_DIR, rel)).isDirectory()
  } catch {
    return false
  }
}

function dirHasImages(rel: string): boolean {
  try {
    const full = path.join(PUBLIC_DIR, rel)
    if (!fs.statSync(full).isDirectory()) return false
    return fs.readdirSync(full).some((f) => IMG_RE.test(f))
  } catch {
    return false
  }
}

function collectSrcs(gallery: unknown): string[] {
  const out: string[] = []
  if (!Array.isArray(gallery)) return out
  for (const block of gallery as Array<Record<string, unknown>>) {
    if (!block) continue
    if (typeof block.src === 'string') out.push(block.src)
    if (Array.isArray(block.images)) {
      for (const im of block.images as Array<Record<string, unknown>>) {
        if (im && typeof im.src === 'string') out.push(im.src)
      }
    }
  }
  return out
}

/** Base folders of {lang}-localized images, e.g. ['images/edu-lms']. */
function langBases(work: CaseItem): string[] {
  const bases = new Set<string>()
  for (const s of collectSrcs((work as { gallery?: unknown }).gallery)) {
    const m = s.match(/^(.*?)\/\{lang\}\//)
    if (m) bases.add(m[1])
  }
  return [...bases]
}

// Явні перевизначення видимості для кейсів без локалізованих папок (один набір
// картинок, але показувати лише на одній мові). undefined = не чіпаємо.
const FORCE_LOCALES: Record<string, Partial<{ uk: boolean; en: boolean }>> = {
  ctendo: { uk: false },          // Ctendo Group — лише EN
  'wirex-brand': { uk: false },   // Wirex 2026 — лише EN
  'wirex-banners': { uk: false }, // Wirex Campaigns — лише EN
}

function computeLocales(work: CaseItem): { uk: boolean; en: boolean } {
  const bases = langBases(work)
  if (bases.length === 0) return { uk: true, en: true }
  // Safety net: if we can't even see the base dir (e.g. a prod fs that doesn't
  // expose public/), don't hide anything — fall back to showing on both.
  if (!bases.every((b) => dirExists(b))) return { uk: true, en: true }
  return {
    uk: bases.every((b) => dirHasImages(`${b}/ua`)),
    en: bases.every((b) => dirHasImages(`${b}/en`)),
  }
}

/** Which locales the case has images for. No {lang} → language-neutral → both. */
export function caseLocales(work: CaseItem): { uk: boolean; en: boolean } {
  const base = computeLocales(work)
  const force = FORCE_LOCALES[(work as { id: string }).id]
  return force ? { uk: force.uk ?? base.uk, en: force.en ?? base.en } : base
}

export function isCaseVisible(work: CaseItem, locale: 'uk' | 'en'): boolean {
  return caseLocales(work)[locale === 'en' ? 'en' : 'uk']
}

/** Ids of cases visible on the given locale (for the listing). */
export function allowedCaseIds(locale: 'uk' | 'en'): string[] {
  return CASES.filter((c) => isCaseVisible(c, locale)).map((c) => c.id)
}
