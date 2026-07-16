// Адресне зменшення переразмірених зображень (PageSpeed «properly size images»).
// Деякі webp експортовані у 700–1900px, але показуються дрібними → зайва вага + LCP.
// Ужимаємо конкретні файли/папки до розумного максимуму (fit inside, без апскейлу).
//
// Запуск: node scripts/resize-oversized.mjs
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// { file } — один файл; { dir, only? } — усі .webp у папці (only — фільтр по імені)
const TARGETS = [
  // Іконки в картках контактів (показуються ~60–100px) → 220px вистачає з запасом на retina
  { file: 'public/img/contact/icon-mail.webp', max: 220 },
  { file: 'public/img/contact/icon-office.webp', max: 220 },
  { file: 'public/img/contact/icon-telegram.webp', max: 220 },
  // Постер hero-маскота (LCP): контейнер ~581px → 720px
  { file: 'public/video/hero/mascot-poster.webp', max: 720 },
  // Декоративні візуали кейсів на головній — жоден не ширший за ~1100 на десктопі
  { dir: 'public/img/cases', max: 1100 },
]

async function resizeOne(file, max) {
  // Читаємо у буфер — щоб sharp не тримав файл відкритим під час запису (Windows).
  const input = fs.readFileSync(file)
  const meta = await sharp(input).metadata()
  if (!meta.width || !meta.height) return null
  if (meta.width <= max && meta.height <= max) return null // вже ок
  const before = input.length
  const buf = await sharp(input)
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer()
  fs.writeFileSync(file, buf)
  const m2 = await sharp(buf).metadata()
  return { before, after: buf.length, dim: `${meta.width}x${meta.height}→${m2.width}x${m2.height}` }
}

let saved = 0
for (const t of TARGETS) {
  const files = t.file
    ? [t.file]
    : fs
        .readdirSync(t.dir)
        .filter((f) => f.endsWith('.webp') && (!t.only || t.only(f)))
        .map((f) => path.join(t.dir, f))
  for (const f of files) {
    if (!fs.existsSync(f)) continue
    const r = await resizeOne(f, t.max)
    if (r) {
      saved += r.before - r.after
      console.log(`  ${(r.before / 1024) | 0}KB → ${(r.after / 1024) | 0}KB  ${r.dim}  ${f}`)
    }
  }
}
console.log(`\n✓ Заощаджено ${(saved / 1024) | 0} КБ`)
