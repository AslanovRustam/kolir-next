import { NextResponse, type NextRequest } from 'next/server'

// Двомовність через URL: EN живе під префіксом /en, UK — на корені без префікса.
// Proxy (кол. middleware, Next 16) визначає локаль зі шляху і прокидає її в RSC
// заголовками запиту (x-locale, x-pathname), а для /en переписує внутрішній рут на
// шлях без префікса — тож файли сторінок не дублюються. Джерело істини локалі — URL.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  // '/en' → '/', '/en/portfolio' → '/portfolio'
  const stripped = isEn ? pathname.slice(3) || '/' : pathname

  const headers = new Headers(req.headers)
  headers.set('x-locale', isEn ? 'en' : 'uk')
  headers.set('x-pathname', stripped)

  if (isEn) {
    const url = req.nextUrl.clone()
    url.pathname = stripped
    return NextResponse.rewrite(url, { request: { headers } })
  }
  return NextResponse.next({ request: { headers } })
}

// Не чіпаємо адмінку, API, службові рути, внутрішні файли Next і будь-які
// статичні файли (з розширенням: /img/..., /video/..., favicon.svg, sitemap.xml).
export const config = {
  matcher: ['/((?!_next|admin|api|forms|my-route|.*\\.).*)'],
}
