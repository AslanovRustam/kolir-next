// Перенаправляє посилання на растрові зображення (png/jpg/jpeg) → .webp
// у вихідниках. Чіпає лише шляхи під /img, /images, /video (у лапках або url()).
// НЕ чіпає /img/og (OG для соцмереж лишаються jpg/png).
//
// Запуск: node scripts/rewrite-image-refs.mjs
import fs from 'fs'
import path from 'path'

const ROOTS = ['src', 'public/js']
const EXT = /\.(tsx?|css|js)$/
// delim (" ' або () + шлях під img|images|video + .png/.jpg/.jpeg
const RE = /(['"(])(\/?(?:img|images|video)\/[^"'`)]+?)\.(png|jpe?g)\b/gi

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (EXT.test(e.name)) out.push(p)
  }
  return out
}

const files = ROOTS.flatMap((d) => walk(d))
let changedFiles = 0
let totalRepl = 0

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  let n = 0
  const out = src.replace(RE, (m, delim, p) => {
    if (/(^|\/)img\/og(\/|$)/.test(p)) return m // OG лишаємо
    n++
    return `${delim}${p}.webp`
  })
  if (n > 0) {
    fs.writeFileSync(f, out)
    changedFiles++
    totalRepl += n
    console.log(`  ${String(n).padStart(4)}  ${f.replace(/\\/g, '/')}`)
  }
}

console.log(`\n✓ Оновлено посилань: ${totalRepl} у ${changedFiles} файлах.`)
