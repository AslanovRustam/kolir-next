import React from 'react'
import Script from 'next/script'
// Self-hosted Unbounded (@font-face) — замість зовнішнього render-blocking Google Fonts
import '../../site-css/unbounded.css'
// Глобальні стилі сайту (порядок як у статиці: style → brife → animations → redesign)
import '../../site-css/style.css'
import '../../site-css/brife.css'
import '../../site-css/animations.css'
import '../../site-css/redesign.css'
import '../../site-css/override.css'

import HeaderServer from '../../components/HeaderServer'
import Footer from '../../components/Footer'
import GoogleAnalytics from '../../components/GoogleAnalytics'
import { getLocale } from '../../lib/locale'

export const metadata = {
  // Базовий домен для абсолютних URL (canonical, OG, sitemap-посилання)
  metadataBase: new URL('https://www.kolir.agency'),
  // Уніфікований розділник бренду: сторінка задає лише ключ, «| Kolir» додається шаблоном
  title: {
    default: 'Брендингова агенція та дизайн-студія в Україні | Kolir',
    template: '%s | Kolir',
  },
  description:
    'Kolir — брендингова агенція та дизайн-студія: назви, айдентика, сайти та digital для брендів, що зростають.',
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Kolir',
    images: [{ url: '/img/og/default.jpg', width: 1200, height: 630, alt: 'Kolir' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/og/default.jpg'],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <body className="kolir-body">
        <GoogleAnalytics />
        <HeaderServer />
        {children}
        <Footer />
        {/* Pulse live chat (CRM). lazyOnload — вантажиться в простій після інтерактиву,
            щоб не бити по LCP/INP. next/script сам ставить async. */}
        <Script
          src="https://cdn.pulse.is/livechat/loader.js"
          data-live-chat-id="6a708ac104ed02b3a70dabb2"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
