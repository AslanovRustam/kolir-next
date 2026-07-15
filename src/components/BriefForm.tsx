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
    tooBig: t('Файли завеликі (максимум 4 МБ). Надішліть їх на hello@kolir.agency.'),
  }
  // Ліміт тіла запиту на Vercel ≈ 4.5 МБ — тримаємо запас.
  const MAX_FILES_BYTES = 4 * 1024 * 1024
  const [status, setStatus] = useState<{ text: string; cls: string }>({ text: '', cls: '' })
  // form.reset() у success-гілці синхронно тригерить onReset — гард, щоб він НЕ
  // стирав повідомлення про успіх (тільки ручний reset-кнопка чистить статус).
  const skipReset = useRef(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data: Record<string, string> = {}
    const files: File[] = []
    let ok = true

    Array.prototype.forEach.call(form.elements, (el: Element) => {
      const f = el as HTMLInputElement | HTMLTextAreaElement
      if (!f.name) return
      f.classList.remove('is-invalid')

      // Файлові поля: беремо самі File-обʼєкти (у .value браузер віддає
      // фейковий шлях C:\fakepath\…), а в дані пишемо лише імена файлів.
      if ((f as HTMLInputElement).type === 'file') {
        const picked = Array.from((f as HTMLInputElement).files ?? [])
        picked.forEach((file) => files.push(file))
        data[f.name] = picked.map((file) => file.name).join(', ')
        if (f.hasAttribute('required') && picked.length === 0) {
          ok = false
          f.classList.add('is-invalid')
        }
        return
      }

      const val = typeof f.value === 'string' ? f.value.trim() : ''
      data[f.name] = val
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
    if (files.reduce((sum, f) => sum + f.size, 0) > MAX_FILES_BYTES) {
      setStatus({ text: MSG.tooBig, cls: 'is-error' })
      return
    }

    setStatus({ text: MSG.sending, cls: '' })
    try {
      // multipart — щоб файли реально доїхали й прикріпились до листа
      const fd = new FormData()
      fd.append('kind', 'brief')
      fd.append('briefType', data.brief_type ?? '')
      fd.append('data', JSON.stringify(data))
      files.forEach((file) => fd.append('files', file, file.name))

      const res = await fetch('/forms/submit', { method: 'POST', body: fd })
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
