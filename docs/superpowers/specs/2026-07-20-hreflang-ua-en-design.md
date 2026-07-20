# 7.4 Двуязычность hreflang UA/EN — дизайн

Дата: 2026-07-20
Статус: одобрен к реализации

## Проблема

Сейчас локаль (`uk`/`en`) хранится в cookie `locale`. EN-контент отдаётся на **тех же URL**,
что и UK, по значению cookie. Последствия для SEO:

- Googlebot (без cookie) видит только `uk` → EN-версия **не индексируется вообще**.
- Нет `hreflang`, нет `x-default`.
- Подмена контента по cookie на одном URL — паттерн, близкий к soft-cloaking.

Задача 7.4: перенести EN на **отдельные индексируемые серверные URL** (`/en/...`),
добавить `hreflang` UA/EN/x-default на каждой паре страниц и корректный `<html lang>`.

## URL-структура (решено)

- `uk` — корень без префикса: `/`, `/portfolio`, `/portfolio/dotpay`, `/brief/website`.
- `en` — префикс `/en`: `/en`, `/en/portfolio`, `/en/portfolio/dotpay`, `/en/brief/website`.
- `x-default` → UK-версия (корень).

## Архитектура (решено): middleware + rewrite

Локаль определяется **из URL**, не из cookie. Файлы страниц **не переезжают** —
middleware переписывает `/en/*` на тот же внутренний путь и прокидывает локаль заголовком.

### 1. `src/middleware.ts` (новый)

- `matcher` исключает: `/admin`, `/api`, `/_next`, `/forms`, `/my-route`, файлы с расширением
  (`favicon.svg`, `/img`, `/video`, `/js`, `/fonts` и т.п.).
- Логика:
  - Если `pathname === '/en'` или начинается с `/en/`:
    - вычислить `stripped = pathname.slice(3) || '/'` (`/en/portfolio` → `/portfolio`, `/en` → `/`);
    - `NextResponse.rewrite(url(stripped))` с request-заголовками `x-locale=en`, `x-pathname=stripped`;
  - иначе: пропустить с request-заголовками `x-locale=uk`, `x-pathname=pathname`.
- Заголовки ставятся через `NextResponse.rewrite(url, { request: { headers } })` /
  `NextResponse.next({ request: { headers } })`, чтобы `headers()` в RSC их видел.

### 2. `src/lib/locale.ts`

`getLocale()` читает `(await headers()).get('x-locale')`, дефолт `uk`. Сигнатура `async`
сохраняется — **все вызовы `getLocale()` остаются без изменений**. Импорт `cookies` убираем.

Добавить хелпер `getPathname()` → `(await headers()).get('x-pathname') ?? '/'` (для переключателя).

### 3. Cookie локали — удаляется

- `src/lib/locale-cookie.ts` и вся логика cookie в `Header.tsx` убираются.
- Источник истины локали — только URL. Авто-редиректов по cookie/Accept-Language **нет**
  (x-default = uk, безопасно для краулеров).

## Метаданные + hreflang

### 4. `src/lib/seo.ts` — `pageMeta()`

Новые параметры:

```ts
pageMeta({
  title, description, path, ogImage?, absoluteTitle?,
  locale: 'uk' | 'en',           // обязательный
  avail?: { uk: boolean; en: boolean }, // по умолчанию { uk: true, en: true }
})
```

Поведение:

- `canonical`: `locale === 'en' ? '/en' + path : (path || '/')`.
- `alternates.languages`: строится только по доступным локалям из `avail`:
  - `uk` → `path` (если `avail.uk`);
  - `en` → `/en` + path (если `avail.en`);
  - `x-default` → UK-путь если доступен, иначе EN-путь.
- `openGraph.locale`: `en` → `en_US`, `uk` → `uk_UA`.
- Бренд-суффикс `| Kolir` и `title.template` — без изменений.

Примечание: `path` для главной = `''`; canonical главной uk = `/`, en = `/en`.

### 5. Страницы: `export const metadata` → `export async function generateMetadata()`

Каждая из 14 страниц читает `getLocale()` и выбирает uk/en `title`+`description`.
Паттерн для статических страниц:

```ts
const META = {
  uk: { title: '…', description: '…' },
  en: { title: '…', description: '…' },
}
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMeta({ ...META[locale], path: '/brief/website', locale })
}
```

Страницы в скоупе: `/`, `/portfolio`, `/portfolio/[slug]`, `/support`, `/volunteer`,
`/privacy`, `/about`, `/brief/{logobook,website,brandbook,landing-page,video,banner,playable}`.

**EN-тексты title/description пишем сейчас** (решение согласовано) — по одному на страницу.

### 6. `/about` — нормализация (входит в 7.4)

Сейчас: голый `metadata`, `title: 'Про нас · Kolir'` → двойной бренд «Про нас · Kolir | Kolir»,
нет canonical, не через `pageMeta`, нет в sitemap.
Правка: перевести на `generateMetadata` + `pageMeta` (uk/en), добавить в sitemap.

### 7. SEO-тексты кейсов: `src/data/caseSeo.ts`

Тип записи расширяется опциональным `en` (uk остаётся на верхнем уровне — минимум правок
к существующим записям):

```ts
Record<string, {
  title: string; description: string;         // uk
  en?: { title: string; description: string } // en
}>
```

В `generateMetadata` кейса: `locale === 'en' && seo.en ? seo.en : { title, description }`;
если ни `en`, ни `uk` записи нет — шаблон-fallback (как сейчас).

### 8. hreflang для локале-эксклюзивных кейсов

Кейсы, доступные только в одной локали, **не должны** давать hreflang на 404:
`med-bat` (только uk), `ctendo` / `wirex-banners` (только en), `wirex-brand` (скрыт полностью).

В `generateMetadata` и в `page` кейса берём видимость из `caseLocales(work)` и передаём
как `avail` в `pageMeta`. Эксклюзивная локаль не получает `alternate` и не выставляет
canonical на несуществующий URL. Кейс, невидимый в текущей локали, → `notFound()` (как сейчас).

## `<html lang>`

### 9. `src/app/(frontend)/layout.tsx`

`RootLayout` делаем `async`, читаем `getLocale()` → `<html lang={locale}>`. Прочий контент
layout без изменений. Статический `metadata` layout оставляем (дефолтный title uk —
показывается только если страница не задала свой; все страницы задают).

## Sitemap

### 10. `src/app/sitemap.ts`

- Каждой записи добавляем `alternates: { languages: {...} }` с uk/en URL (только для доступных
  локалей кейса).
- Формируем записи для **обеих** локалей:
  - uk-набор: текущие пути + кейсы, видимые в uk;
  - en-набор: те же статические пути с префиксом `/en` + кейсы, видимые в en
    (теперь в sitemap появятся `ctendo`, `wirex-banners` под `/en/portfolio/...`).
- Добавить `/about` в статические пути.
- `lastModified`: для статических страниц — дата билда допустима; **опционально** для кейсов
  использовать реальную дату (вне обязательного скоупа 7.4, помечаем как nice-to-have).

## Переключатель языка

### 11. `src/components/Header.tsx` + `HeaderServer.tsx`

- Убрать cookie + `router.refresh()`.
- `HeaderServer` (серверный) вычисляет текущую локаль и `x-pathname`, формирует
  `altHref` — URL той же страницы в другой локали:
  - UK↔EN: добавить/убрать префикс `/en`;
  - **если текущая страница — кейс, невидимый в целевой локали → `altHref = /portfolio`
    (или `/en/portfolio`)** (решение согласовано);
  - передаёт в `Header` пропсы: `locale`, `altHref`, (`uaHref`/`enHref` по необходимости).
- `Header` (клиентский): кнопки UA/EN — обычные `<Link>` на соответствующие URL.
  Свап логотипа (`LOGO_UK`/`LOGO_EN`) — по `locale` из пропса (без чтения cookie).

## Риск приёмки (вне кода)

EN-тело страниц собирается из словаря `makeT` (535 ключей `static-i18n.json`) + CMS-локали
`en` (Payload `localization: ['uk','en']`). **Перед отправкой `/en` в GSC** — контентный QA:
убедиться, что CMS-глобалы `en` заполнены и в теле нет украинских «дыр». Индексация
полу-украинских EN-страниц вредит. Это проверка на стороне контент-команды, не блокер кода.

## Тестирование

- Unit: `pageMeta()` — canonical/alternates для uk и en, для `avail` с одной локалью,
  для главной (`path=''`).
- Unit/integration: middleware — `/en/portfolio` → x-locale=en + x-pathname=/portfolio;
  `/portfolio` → uk; исключения (`/admin`, `/img/...`) не переписываются.
- E2E (Playwright): `/en/portfolio` отдаёт EN-контент и `<html lang="en">`;
  hreflang-теги присутствуют и указывают на существующие URL; переключатель ведёт корректно,
  а на эксклюзивном кейсе — на `/portfolio`.
- Ручная проверка: `/sitemap.xml` содержит en-URL и `xhtml:link` alternates; en-only кейсы
  появились под `/en`.

## Вне скоупа (не делаем в 7.4)

- Перевод «нейминг» → «неймінг» (стилистика).
- Расширение коротких описаний брифов/support до 140–160 (nice-to-have).
- Реальные `lastmod` по кейсам (nice-to-have).
- Авто-редирект по Accept-Language/гео.
