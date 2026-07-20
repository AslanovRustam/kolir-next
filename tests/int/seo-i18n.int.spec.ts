import { describe, it, expect } from 'vitest'
import { pageMeta } from '@/lib/seo'
import { localeHref } from '@/lib/localeHref'
import sitemap from '@/app/sitemap'

describe('pageMeta — canonical & hreflang', () => {
  it('uk: self-canonical без префікса + всі альтернативи', () => {
    const m = pageMeta({ title: 'X', description: 'd', path: '/portfolio', locale: 'uk' })
    expect(m.alternates?.canonical).toBe('/portfolio')
    expect(m.alternates?.languages).toEqual({
      uk: '/portfolio',
      en: '/en/portfolio',
      'x-default': '/portfolio',
    })
    expect((m.openGraph as { locale?: string })?.locale).toBe('uk_UA')
  })

  it('en: canonical під /en', () => {
    const m = pageMeta({ title: 'X', description: 'd', path: '/portfolio', locale: 'en' })
    expect(m.alternates?.canonical).toBe('/en/portfolio')
    expect((m.openGraph as { locale?: string })?.locale).toBe('en_US')
  })

  it('головна (path="") → uk="/" , en="/en"', () => {
    expect(pageMeta({ title: 'X', description: 'd', path: '', locale: 'uk' }).alternates?.canonical).toBe('/')
    expect(pageMeta({ title: 'X', description: 'd', path: '', locale: 'en' }).alternates?.canonical).toBe('/en')
    const langs = pageMeta({ title: 'X', description: 'd', path: '', locale: 'uk' }).alternates
      ?.languages as Record<string, string>
    expect(langs).toEqual({ uk: '/', en: '/en', 'x-default': '/' })
  })

  it('uk-only кейс: немає en-альтернативи, x-default = uk', () => {
    const langs = pageMeta({
      title: 'X',
      description: 'd',
      path: '/portfolio/med-bat',
      locale: 'uk',
      avail: { uk: true, en: false },
    }).alternates?.languages as Record<string, string>
    expect(langs.en).toBeUndefined()
    expect(langs.uk).toBe('/portfolio/med-bat')
    expect(langs['x-default']).toBe('/portfolio/med-bat')
  })

  it('en-only кейс: немає uk-альтернативи, x-default = en', () => {
    const langs = pageMeta({
      title: 'X',
      description: 'd',
      path: '/portfolio/ctendo',
      locale: 'en',
      avail: { uk: false, en: true },
    }).alternates?.languages as Record<string, string>
    expect(langs.uk).toBeUndefined()
    expect(langs.en).toBe('/en/portfolio/ctendo')
    expect(langs['x-default']).toBe('/en/portfolio/ctendo')
  })
})

describe('localeHref', () => {
  it('uk — без змін', () => {
    expect(localeHref('/portfolio', 'uk')).toBe('/portfolio')
    expect(localeHref('/', 'uk')).toBe('/')
  })
  it('en — префікс /en', () => {
    expect(localeHref('/portfolio', 'en')).toBe('/en/portfolio')
    expect(localeHref('/', 'en')).toBe('/en')
    expect(localeHref('/#contact', 'en')).toBe('/en/#contact')
  })
  it('en — зовнішні та вже-/en лишаються як є', () => {
    expect(localeHref('https://x.com', 'en')).toBe('https://x.com')
    expect(localeHref('/en/portfolio', 'en')).toBe('/en/portfolio')
  })
})

describe('sitemap — двомовність', () => {
  const urls = sitemap().map((e) => e.url)
  const SITE = 'https://www.kolir.agency'

  it('містить головну в обох локалях і /about', () => {
    expect(urls).toContain(`${SITE}`) // корінь без завершального слеша (як canonical Next)
    expect(urls).toContain(`${SITE}/en`)
    expect(urls).toContain(`${SITE}/about`)
    expect(urls).toContain(`${SITE}/en/about`)
  })

  it('en-only кейс ctendo — лише під /en', () => {
    expect(urls).toContain(`${SITE}/en/portfolio/ctendo`)
    expect(urls).not.toContain(`${SITE}/portfolio/ctendo`)
  })

  it('uk-only кейс med-bat — лише на корені', () => {
    expect(urls).toContain(`${SITE}/portfolio/med-bat`)
    expect(urls).not.toContain(`${SITE}/en/portfolio/med-bat`)
  })

  it('кожен запис має hreflang-alternates', () => {
    const home = sitemap().find((e) => e.url === `${SITE}`)
    expect(home?.alternates?.languages).toMatchObject({
      uk: `${SITE}`,
      en: `${SITE}/en`,
    })
  })
})
