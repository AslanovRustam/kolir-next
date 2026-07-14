import React from 'react'
// Глобальні стилі сайту (порядок як у статиці: style → brife → animations → redesign)
import '../../site-css/style.css'
import '../../site-css/brife.css'
import '../../site-css/animations.css'
import '../../site-css/redesign.css'
import '../../site-css/override.css'

import HeaderServer from '../../components/HeaderServer'
import Footer from '../../components/Footer'
import GoogleAnalytics from '../../components/GoogleAnalytics'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800;900&display=swap"
        />
      </head>
      <body className="kolir-body">
        <GoogleAnalytics />
        <HeaderServer />
        {children}
        <Footer />
      </body>
    </html>
  )
}
