'use client'

import { useRef, useState } from 'react'
import { makeT, type Locale } from '../lib/t'
import { track } from '../lib/gtag'

// Демо-обробка бриф-форми (без бекенду): валідація + UI-стани, як у статичному forms.js / kolir-briefs.js.
// Рендерить серверну розмітку брифу (children) усередині клієнтської <form>.
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

type Props = {
  className?: string
  locale: Locale
  children: React.ReactNode
} & React.FormHTMLAttributes<HTMLFormElement>

export default function BriefForm({ className, locale, children, ...rest }: Props) {
  const t = makeT(locale)
  const MSG = {
    sending: t('Надсилаємо…'),
    ok: t('Дякуємо! Бриф надіслано. Ми звʼяжемось найближчим часом.'),
    err: t('Заповніть, будь ласка, обовʼязкові поля.'),
    bad: t('Перевірте правильність email.'),
    fail: t('Не вдалося надіслати. Спробуйте ще раз або напишіть на hello@kolir.agency.'),
  }
  const [status, setStatus] = useState<{ text: string; cls: string }>({ text: '', cls: '' })
  // form.reset() у success-гілці синхронно тригерить onReset — гард, щоб він НЕ
  // стирав повідомлення про успіх (тільки ручний reset-кнопка чистить статус).
  const skipReset = useRef(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data: Record<string, string> = {}
    let ok = true

    Array.prototype.forEach.call(form.elements, (el: Element) => {
      const f = el as HTMLInputElement | HTMLTextAreaElement
      if (!f.name) return
      const val = typeof f.value === 'string' ? f.value.trim() : ''
      data[f.name] = val
      f.classList.remove('is-invalid')
      if (f.hasAttribute('required') && !val) {
        ok = false
        f.classList.add('is-invalid')
      }
    })

    if (!ok) {
      setStatus({ text: MSG.err, cls: 'is-error' })
      return
    }
    if (data.email && !isEmail(data.email)) {
      setStatus({ text: MSG.bad, cls: 'is-error' })
      return
    }

    setStatus({ text: MSG.sending, cls: '' })
    try {
      const res = await fetch('/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'brief', briefType: data.brief_type, data }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      track('brief_submit', { brief_type: data.brief_type })
      skipReset.current = true
      form.reset()
      setStatus({ text: MSG.ok, cls: 'is-ok' })
    } catch (err) {
      console.error('[brief] submit failed:', err)
      setStatus({ text: MSG.fail, cls: 'is-error' })
    }
  }

  const onReset = () => {
    if (skipReset.current) {
      skipReset.current = false
      return
    }
    setStatus({ text: '', cls: '' })
  }

  return (
    <form className={className} onSubmit={onSubmit} onReset={onReset} noValidate {...rest}>
      {children}
      <p className={`kform-status ${status.cls}`.trim()} role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  )
}
