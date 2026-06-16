import Link from 'next/link'
import { getLocale } from '../../lib/locale'
import { makeT } from '../../lib/t'

// 404 — порт зі статичного 404.html. Хедер/футер успадковуються з (frontend)/layout.tsx.
// Сторінкові стилі були інлайновими у <style> статичного файлу — лишаємо їх тут.
export const metadata = { title: '404 — сторінку не знайдено · Kolir' }

export default async function NotFound() {
  const t = makeT(await getLocale())
  return (
    <>
      <style>{`
        .error404{ min-height:100vh; display:grid; place-items:center; text-align:center; padding:4rem 2rem; background:#5E00CF; color:#fff; }
        .error404 .code{ font-size:clamp(8rem,22vw,18rem); font-weight:700; line-height:.9; letter-spacing:-.03em; }
        .error404 h1{ font-size:clamp(2rem,4vw,3.2rem); margin:1rem 0 .6rem; font-weight:600; }
        .error404 p{ font-size:1.6rem; opacity:.85; margin:0 0 2.6rem; }
        .error404 a.home{ display:inline-block; background:#FFCB45; color:#1c1340; font-weight:600; font-size:1.5rem; padding:1.3rem 3rem; border-radius:999px; text-decoration:none; transition:transform .25s, filter .25s; }
        .error404 a.home:hover{ filter:brightness(1.05); }
      `}</style>
      <section className="error404">
        <div>
          <div className="code">404</div>
          <h1>{t('Сторінку не знайдено')}</h1>
          <p>{t('Можливо, сторінку переміщено або вона більше не існує.')}</p>
          <Link className="home" href="/">
            {t('На головну')}
          </Link>
        </div>
      </section>
    </>
  )
}
