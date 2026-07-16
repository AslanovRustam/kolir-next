// Одноразово: качає self-hosted Unbounded (потрібні субсети) з Google Fonts і
// генерує локальний src/site-css/unbounded.css з @font-face. Прибирає зовнішній
// render-blocking запит до fonts.googleapis.com.
//
// Запуск: node scripts/fetch-unbounded.mjs
import fs from 'fs'
import path from 'path'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36'
const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800;900&display=swap'
const WANT = new Set(['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext']) // без vietnamese
const OUT_DIR = 'public/fonts/unbounded'
const OUT_CSS = 'src/site-css/unbounded.css'

const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text()

// Розбираємо блоки @font-face: субсет (із коментаря), url woff2, вага, unicode-range
const blocks = css
  .split('/*')
  .slice(1)
  .map((chunk) => {
    const subset = chunk.split('*/')[0].trim()
    const url = (chunk.match(/url\((https:[^)]+\.woff2)\)/) || [])[1]
    const range = (chunk.match(/unicode-range:\s*([^;]+);/) || [])[1]
    const weight = Number((chunk.match(/font-weight:\s*(\d+)/) || [])[1])
    return { subset, url, range, weight }
  })
  .filter((b) => b.url && WANT.has(b.subset))

// Групуємо за url (вариативний файл переиспользується для всіх ваг субсета)
const byUrl = new Map()
for (const b of blocks) {
  const g = byUrl.get(b.url) || { subset: b.subset, range: b.range, weights: [] }
  g.weights.push(b.weight)
  byUrl.set(b.url, g)
}

fs.mkdirSync(OUT_DIR, { recursive: true })
let out = '/* Unbounded — self-hosted (variable 400–900). Джерело: Google Fonts. */\n'
for (const [url, g] of byUrl) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer())
  const file = `unbounded-${g.subset}.woff2`
  fs.writeFileSync(path.join(OUT_DIR, file), buf)
  const w = [...new Set(g.weights)].sort((a, b) => a - b)
  const fw = w.length > 1 ? `${w[0]} ${w[w.length - 1]}` : `${w[0]}`
  out +=
    `@font-face{font-family:'Unbounded';font-style:normal;font-weight:${fw};` +
    `font-display:swap;src:url(/fonts/${'unbounded/' + file}) format('woff2');` +
    `unicode-range:${g.range};}\n`
  console.log(`  ${(buf.length / 1024) | 0}KB  ${g.subset}  weights ${fw}`)
}
fs.writeFileSync(OUT_CSS, out)
console.log(`\n✓ ${byUrl.size} субсетів → ${OUT_DIR}, CSS → ${OUT_CSS}`)
