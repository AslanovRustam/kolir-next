'use client'

import { useRef, useState } from 'react'

// Демо-обробка форми (без бекенду): валідація + UI-стани. Тексти — з CMS (пропси).
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export type ContactContent = {
  title: string
  sub: string
  kicker: string
  formTitle: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  msgLabel: string
  msgPlaceholder: string
  submitLabel: string
  mailTitle: string
  mailBody: string
  telegramTitle: string
  telegramBody: string
  officeTitle: string
  officeBody: string
  statusSending: string
  statusOk: string
  statusErr: string
  statusBad: string
}

export default function Contact({ content: c }: { content: ContactContent }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<{ text: string; cls: string }>({ text: '', cls: '' })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data: Record<string, string> = {}
    let ok = true

    Array.prototype.forEach.call(form.elements, (el: Element) => {
      const f = el as HTMLInputElement | HTMLTextAreaElement
      if (!f.name) return
      data[f.name] = f.value.trim()
      f.classList.remove('is-invalid')
      if (f.hasAttribute('required') && !f.value.trim()) {
        ok = false
        f.classList.add('is-invalid')
      }
    })

    if (!ok) {
      setStatus({ text: c.statusErr, cls: 'is-error' })
      return
    }
    if (data.email && !isEmail(data.email)) {
      setStatus({ text: c.statusBad, cls: 'is-error' })
      return
    }

    setStatus({ text: c.statusSending, cls: '' })
    console.log('[Kolir demo form] submit:', data)
    setTimeout(() => {
      setStatus({ text: c.statusOk, cls: 'is-ok' })
      form.reset()
    }, 700)
  }

  return (
    <section className="contactk" id="contact" aria-label="Contact">
      <div className="contactk-shell">
        <div className="contactk-card">
          <div className="contactk-deco" aria-hidden="true">
            <img className="contactk-pattern contactk-pattern--tr" src="/img/brand_line/r3.png" alt="" />
            <img className="contactk-pattern contactk-pattern--bl" src="/img/brand_line/r3.png" alt="" />
          </div>

          <div className="contactk-head" data-reveal="up">
            <div className="contactk-head-left">
              <h2 className="contactk-title">{c.title}</h2>
              <p className="contactk-sub">{c.sub}</p>
              <span className="contactk-line" aria-hidden="true" />
            </div>
            <div className="contactk-head-right">
              <span>{c.kicker}</span>
              <div className="contactk-underlines" aria-hidden="true">
                <span className="line line--purple" />
                <span className="line line--yellow" />
              </div>
            </div>
            <div className="briefs-kicker2">
              <span className="briefs-kline" aria-hidden="true" />
              <span className="briefs-ktext">{c.kicker}</span>
            </div>
          </div>

          <div className="contactk-grid">
            {/* Жовта карточка-форма */}
            <div className="ck-form">
              <div className="ck-form-left">
                <span className="ck-form-scribble" aria-hidden="true" />
                <div className="ck-form-title">{c.formTitle}</div>
              </div>
              <div className="ck-form-right">
                <form className="kform" ref={formRef} onSubmit={onSubmit} noValidate>
                  <div className="kform-fields">
                    <div className="kform-row">
                      <label className="kform-label" htmlFor="kf-name">
                        {c.nameLabel}
                      </label>
                      <div className="kform-field">
                        <input id="kf-name" type="text" name="name" required placeholder={c.namePlaceholder} />
                      </div>
                    </div>
                    <div className="kform-row">
                      <label className="kform-label" htmlFor="kf-email">
                        {c.emailLabel}
                      </label>
                      <div className="kform-field">
                        <input id="kf-email" type="email" name="email" required placeholder={c.emailPlaceholder} />
                      </div>
                    </div>
                    <div className="kform-row kform-row--wide">
                      <label className="kform-label" htmlFor="kf-msg">
                        {c.msgLabel}
                      </label>
                      <div className="kform-field kform-field--area">
                        <textarea id="kf-msg" name="message" rows={3} placeholder={c.msgPlaceholder} />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="kform-btn" data-magnetic="0.2">
                    {c.submitLabel}
                  </button>
                  <p className={`kform-status ${status.cls}`.trim()} role="status" aria-live="polite">
                    {status.text}
                  </p>
                </form>
              </div>
            </div>

            {/* Інфо-карточки */}
            <div className="ck-cards" data-reveal-stagger>
              <a className="ck-card" href="mailto:hello@kolir.agency">
                <div className="ck-top">
                  <img className="ck-ico" src="/img/contact/icon-mail.png" alt="" />
                  <div className="ck-ttl">{c.mailTitle}</div>
                </div>
                <div className="ck-body">{c.mailBody}</div>
              </a>

              <a className="ck-card" href="https://t.me/kolir_manager" target="_blank" rel="noreferrer">
                <div className="ck-top">
                  <img className="ck-ico" src="/img/contact/icon-telegram.png" alt="" />
                  <div className="ck-ttl">{c.telegramTitle}</div>
                </div>
                <div className="ck-body">{c.telegramBody}</div>
              </a>

              <div className="ck-card">
                <div className="ck-top">
                  <img className="ck-ico" src="/img/contact/icon-office.png" alt="" />
                  <div className="ck-ttl">{c.officeTitle}</div>
                </div>
                <div className="ck-body">{c.officeBody}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
