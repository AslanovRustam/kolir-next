// Генерує OG-зображення (1200×630) для кожного кейса на основі його обкладинки:
// обкладинка (fit cover) + затемнення знизу + лого Kolir + назва кейса.
// Джерело обкладинок — src/data/caseCovers.ts (CASE_COVERS). Якщо обкладинки
// немає/не читається — робимо брендовий фолбек (назва на фіолетовому).
//
// Запуск: npx tsx scripts/gen-case-og.ts  (або npm run gen:case-og)
// Автоматично виконується перед білдом (prebuild). Додав кейс + обкладинку в
// CASE_COVERS → OG згенерується сам.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { CASES } from '../src/data/cases'
import { CASE_COVERS } from '../src/data/caseCovers'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'public/img/og/cases')
const W = 1200
const H = 630

const LOGO =
  'M2.72778 87.7418C2.30735 87.7017 2.28733 87.7217 2.32237 87.7217C3.84892 87.6667 5.49059 87.2411 7.03216 86.7253C9.08926 86.0243 10.9812 85.033 12.4026 83.9414C15.2405 81.6682 16.3166 79.6404 16.4468 75.9852L39.315 75.8751C39.3351 79.6153 40.1359 83.1002 42.4082 85.759C46.9428 91.0564 55.6367 90.4406 60.7018 86.0945C69.6409 78.6289 69.7761 64.4139 67.749 53.2832C66.8181 48.176 65.4016 43.2691 62.9791 38.938C59.8159 33.0597 53.5345 27.7923 47.2231 32.2035C44.22 34.2765 42.198 37.8164 41.1469 41.5567C40.4212 44.5059 39.4101 48.121 41.1769 50.8148C44.6054 55.6566 52.003 57.344 57.934 57.9648C76.8182 59.7724 101.108 49.9736 101.113 28.4032H119.997C120.037 32.2236 119.647 36.1541 118.721 40.0196C116.078 51.5808 108.225 61.7351 98.3552 68.034C78.2447 81.6231 39.1098 84.4672 23.6591 62.6114C18.0534 54.515 17.9283 44.9114 20.5609 35.7485C23.9344 22.8854 34.4 11.0688 48.3142 9.28626C62.5737 7.24338 75.3567 16.4013 81.8233 28.248C85.6072 34.9023 87.6993 41.9122 89.1408 49.2375C92.9547 67.7035 90.6173 90.3004 74.9113 103.264C60.6918 115.416 38.1038 115.17 25.4209 100.765C19.3097 93.9956 16.4868 84.6975 16.4518 75.9802C16.3517 69.6613 21.3918 64.464 27.7082 64.3638C34.0247 64.2637 39.2199 69.3058 39.32 75.6247C39.3501 78.0982 39.1549 80.6217 38.6293 83.1954C36.2619 95.4877 26.2818 104.731 14.9502 108.731C10.1203 110.409 5.3054 111.615 0 111.135L2.73779 87.7368L2.72778 87.7418Z'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Накладка: затемнення знизу + лого + wordmark + назва кейса.
function overlaySvg(title: string): Buffer {
  const t = esc(title)
  const titleSize = title.length > 20 ? 54 : title.length > 14 ? 64 : 76
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.4" stop-color="#170a36" stop-opacity="0"/>
      <stop offset="1" stop-color="#170a36" stop-opacity="0.9"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <g transform="translate(60,52) scale(0.44)"><path d="${LOGO}" fill="#FDCC0D"/></g>
    <text x="112" y="98" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="#ffffff">Kolir</text>
    <text x="62" y="548" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="700" fill="#ffffff">${t}</text>
    <text x="64" y="592" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="400" fill="#FDCC0D">Кейс · брендинг та дизайн</text>
  </svg>`)
}

// Фолбек без обкладинки — назва на фіолетовому.
function fallbackSvg(title: string): Buffer {
  const t = esc(title)
  const titleSize = title.length > 20 ? 60 : 84
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#3E0088"/>
    <g transform="translate(64,56) scale(0.5)"><path d="${LOGO}" fill="#FDCC0D"/></g>
    <text x="126" y="112" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="#ffffff">Kolir</text>
    <text x="64" y="360" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="700" fill="#ffffff">${t}</text>
    <text x="66" y="424" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400" fill="#FDCC0D">Кейс · брендинг та дизайн</text>
  </svg>`)
}

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  let ok = 0
  let fb = 0
  for (const work of CASES) {
    const id = (work as { id: string }).id
    const title = (work as { title: string }).title
    const out = path.join(OUT_DIR, `${id}.jpg`)
    const coverRel = CASE_COVERS[id]
    const coverPath = coverRel ? path.join(ROOT, 'public', coverRel) : null

    try {
      if (!coverPath || !fs.existsSync(coverPath)) throw new Error('no cover')
      const base = await sharp(coverPath).resize(W, H, { fit: 'cover' }).toBuffer()
      await sharp(base)
        .composite([{ input: overlaySvg(title), top: 0, left: 0 }])
        .jpeg({ quality: 82 })
        .toFile(out)
      ok++
    } catch {
      await sharp(fallbackSvg(title)).jpeg({ quality: 82 }).toFile(out)
      fb++
    }
  }
  // eslint-disable-next-line no-console
  console.log(`✓ OG кейсів: ${ok} з обкладинкою, ${fb} фолбек → ${OUT_DIR}`)
}

build()
