import Script from 'next/script'
import { GA_ID } from '../lib/gtag'

// GA4 (gtag.js). Вантажиться лише якщо задано NEXT_PUBLIC_GA_ID.
// strategy="afterInteractive" — не блокує LCP.
export default function GoogleAnalytics() {
  if (!GA_ID) return null
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  )
}
