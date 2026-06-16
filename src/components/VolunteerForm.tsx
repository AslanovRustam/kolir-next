'use client'

import { useEffect, useRef, useState } from 'react'
import { makeT, type Locale } from '../lib/t'

// Демо-обробка форми волонтера (без бекенду): валідація + UI-стани, як у
// статичному forms.js та компоненті sections/Contact.tsx. Зберігаємо оригінальні
// класи/розмітку форми (.kform…), щоб застосувалися стилі volunteer.css.
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

// Кастомний випадаючий список «Спеціалізація» під стиль форми (CSS .kselect* вже
// є у volunteer.css). Нативний <select> прибрано — він давав стандартний
// системний дропдаун. Значення віддаємо у форму через прихований input[name=spec].
function SpecSelect({ t }: { t: (k: string) => string }) {
  const OPTIONS = [
    { value: '', label: t('Оберіть напрямок'), placeholder: true },
    { value: 'uiux', label: t('UI/UX Дизайн') },
    { value: 'graphics', label: t('Графіка / Ілюстрація') },
    { value: 'web', label: t('Веброзробка') },
    { value: 'motion', label: t('Моушн / Відео') },
  ]
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const current = OPTIONS.find((o) => o.value === value) || OPTIONS[0]

  return (
    <div
      className={`kform-field kform-field--select kselect${open ? ' is-open' : ''}`}
      ref={ref}
    >
      {/* значення для сабміту демо-форми */}
      <input type="hidden" name="spec" value={value} readOnly />
      <button
        id="vf-spec"
        type="button"
        className="kselect-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`kselect-label${value === '' ? ' is-placeholder' : ''}`}>
          {current.label}
        </span>
      </button>
      <span className="kform-chev" aria-hidden="true" />
      <ul className="kselect-menu" role="listbox">
        {OPTIONS.map((o) => (
          <li
            key={o.value || 'placeholder'}
            role="option"
            aria-selected={o.value === value}
            className={`kselect-opt${o.placeholder ? ' is-placeholder' : ''}${
              o.value === value ? ' is-selected' : ''
            }`}
            onClick={() => {
              setValue(o.value)
              setOpen(false)
            }}
          >
            {o.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function VolunteerForm({ locale }: { locale: Locale }) {
  const t = makeT(locale)
  const MSG = {
    sending: t('Надсилаємо…'),
    ok: t('Дякуємо! Заявку отримано (демо-режим).'),
    err: t('Заповніть, будь ласка, обовʼязкові поля.'),
    bad: t('Перевірте правильність email.'),
  }
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<{ text: string; cls: string }>({ text: '', cls: '' })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data: Record<string, string> = {}
    let ok = true

    Array.prototype.forEach.call(form.elements, (el: Element) => {
      const f = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (!f.name) return
      data[f.name] = f.value.trim()
      f.classList.remove('is-invalid')
      if (f.hasAttribute('required') && !f.value.trim()) {
        ok = false
        f.classList.add('is-invalid')
      }
    })

    if (!ok) {
      setStatus({ text: MSG.err, cls: 'is-error' })
      return
    }
    // Поле "contact" може бути email — якщо схоже на email, валідуємо формат.
    if (data.contact && data.contact.includes('@') && !isEmail(data.contact)) {
      setStatus({ text: MSG.bad, cls: 'is-error' })
      return
    }

    setStatus({ text: MSG.sending, cls: '' })
    // ДЕМО: тут буде реальне надсилання
    console.log('[Kolir volunteer demo form] submit:', data)
    setTimeout(() => {
      setStatus({ text: MSG.ok, cls: 'is-ok' })
      form.reset()
    }, 700)
  }

  return (
    <form className="kform" ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="kform-fields">
        <div className="kform-row">
          <label className="kform-label" htmlFor="vf-name">
            {t('Ім\'я')}
          </label>
          <div className="kform-field">
            <input id="vf-name" type="text" name="name" required placeholder={t('Як до вас звертатись')} />
          </div>
        </div>
        <div className="kform-row">
          <label className="kform-label" htmlFor="vf-contact">
            {t('Контакт')}
          </label>
          <div className="kform-field">
            <input id="vf-contact" type="text" name="contact" required placeholder={t('Telegram, email або телефон')} />
          </div>
        </div>
        <div className="kform-row">
          <label className="kform-label" htmlFor="vf-spec">
            {t('Спеціалізація')}
          </label>
          <SpecSelect t={t} />
        </div>
        <div className="kform-row kform-row--wide">
          <label className="kform-label" htmlFor="vf-about">
            {t('Кілька слів про себе (необов\'язково)')}
          </label>
          <div className="kform-field kform-field--area">
            <textarea
              id="vf-about"
              name="about"
              rows={3}
              placeholder={t('Досвід, посилання на портфоліо, скільки часу готовий виділити')}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="kform-btn" data-magnetic="0.2">
        {t('Відправити')}
      </button>
      <p className={`kform-status ${status.cls}`.trim()} role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  )
}
