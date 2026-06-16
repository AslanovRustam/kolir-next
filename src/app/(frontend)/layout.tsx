import React from 'react'
// Глобальні стилі сайту (порядок як у статиці: style → brife → animations → redesign)
import '../../site-css/style.css'
import '../../site-css/brife.css'
import '../../site-css/animations.css'
import '../../site-css/redesign.css'
import '../../site-css/override.css'

import HeaderServer from '../../components/HeaderServer'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Kolir — креативна агенція брендингу та дизайну',
  description:
    'Kolir — креативна агенція: брендинг, UI/UX, веброзробка, моушн та діджитал-маркетинг для амбіційних брендів.',
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
        <HeaderServer />
        {children}
        <Footer />
      </body>
    </html>
  )
}
