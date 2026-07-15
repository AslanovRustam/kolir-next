// GA4: id береться з env NEXT_PUBLIC_GA_ID (не задано → аналітика не вантажиться).
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

// Відправка події в GA4. Безпечно у SSR і коли gtag ще не завантажений.
export function track(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params ?? {})
  }
}
