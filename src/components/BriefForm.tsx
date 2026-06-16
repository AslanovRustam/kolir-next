'use client'

import { useRef, useState } from 'react'
import { makeT, type Locale } from '../lib/t'

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
    ok: t('Дякуємо! Бриф надіслано (демо-режим).'),
    err: t('Заповніть, будь ласка, обовʼязкові поля.'),
    bad: t('Перевірте правильність email.'),
  }
  const [status, setStatus] = useState<{ text: string; cls: string }>({ text: '', cls: '' })
  // form.reset() у success-гілці синхронно тригерить onReset — гард, щоб він НЕ
  // стирав повідомлення про успіх (тільки ручний reset-кнопка чистить статус).
  const skipReset = useRef(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    console.log('[Kolir demo brief] submit:', data)
    setTimeout(() => {
      skipReset.current = true
      form.reset()
      setStatus({ text: MSG.ok, cls: 'is-ok' })
    }, 700)
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
