// Одноразова міграція: конвертує весь растр (png/jpg/jpeg) у public/img,
// public/images, public/video → .webp (поряд, оригінали лишаються).
// Кап ширини 2400px, quality 80. НЕ чіпає public/img/og (OG-соцмережі — jpg/png).
// Після цього scripts/rewrite-image-refs.mjs перенаправляє посилання на .webp.
//
// Запуск: node scripts/convert-images-webp.mjs
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const DIRS = ['public/img', 'public/images', 'public/video']
const SKIP_DIRS = ['public/img/og'] // OG лишаємо у вихідному форматі
const RASTER = /\.(png|jpe?g)$/i
const MAX_W = 2400
const QUALITY = 80

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name).replace(/\\/g, '/')
    if (SKIP_DIRS.some((s) => p === s || p.startsWith(s + '/'))) continue
    if (e.isDirectory()) walk(p, out)
    else if (RASTER.test(e.name)) out.push(p)
  }
  return out
}

const files = DIRS.filter((d) => fs.existsSync(d)).flatMap((d) => walk(d))
let done = 0
let skipped = 0
let failed = 0
let before = 0
let after = 0

const CONCURRENCY = 8
let i = 0
async function worker() {
  while (i < files.length) {
    const f = files[i++]
    const webp = f.replace(RASTER, '.webp')
    try {
      before += fs.statSync(f).size
      if (fs.existsSync(webp)) {
        after += fs.statSync(webp).size
        skipped++
        continue
      }
      const img = sharp(f, { failOn: 'none' })
      const meta = await img.metadata()
      const pipe = meta.width && meta.width > MAX_W ? img.resize({ width: MAX_W }) : img
      await pipe.webp({ quality: QUALITY }).toFile(webp)
      after += fs.statSync(webp).size
      done++
      if (done % 100 === 0) console.log(`  ...${done} converted`)
    } catch (e) {
      failed++
      console.log(`  ✗ ${f}: ${e.message}`)
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker))
console.log(
  `\n✓ Готово: ${done} конвертовано, ${skipped} вже було, ${failed} помилок.\n` +
    `  ${(before / 1048576).toFixed(0)}MB (растр) → ${(after / 1048576).toFixed(0)}MB (webp)`,
)
