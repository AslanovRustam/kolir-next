import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

// Приймає всі форми сайту (бриф / контакт / волонтер):
// 1) зберігає заявку в колекції `submissions` (видно в адмінці),
// 2) шле лист-сповіщення на MAIL_TO.
// Шлях НЕ під /api — там catch-all Payload.
const MAIL_TO = process.env.MAIL_TO || 'hello@kolir.agency'

type Kind = 'brief' | 'contact' | 'volunteer'
type Body = { kind: Kind; briefType?: string; data: Record<string, string> }

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const subjectOf = (kind: Kind, briefType: string | undefined, name: string) => {
  const who = name ? ` — ${name}` : ''
  if (kind === 'brief') return `Бриф: ${briefType || '—'}${who}`
  if (kind === 'volunteer') return `Волонтер${who}`
  return `Контакт-форма${who}`
}

type Attachment = { filename: string; content: Buffer; contentType?: string }

export async function POST(req: Request) {
  try {
    // Форми з файлами шлють multipart/form-data, без файлів — JSON.
    const ct = req.headers.get('content-type') || ''
    let body: Body
    const attachments: Attachment[] = []

    if (ct.includes('multipart/form-data')) {
      const fd = await req.formData()
      body = {
        kind: String(fd.get('kind') || '') as Kind,
        briefType: fd.get('briefType') ? String(fd.get('briefType')) : undefined,
        data: JSON.parse(String(fd.get('data') || '{}')),
      }
      for (const entry of fd.getAll('files')) {
        if (entry instanceof File && entry.size > 0) {
          attachments.push({
            filename: entry.name,
            content: Buffer.from(await entry.arrayBuffer()),
            contentType: entry.type || undefined,
          })
        }
      }
    } else {
      body = (await req.json()) as Body
    }

    if (!body?.kind || !body?.data || typeof body.data !== 'object') {
      return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 })
    }

    // Honeypot: боти заповнюють приховане поле — тихо «підтверджуємо» й виходимо.
    if (body.data._hp) return NextResponse.json({ ok: true })

    const data = body.data
    const name = data.name || data.fullname || ''
    const email = data.email || (data.contact?.includes('@') ? data.contact : '') || ''
    const phone = data.phone || data.tel || ''
    const subject = subjectOf(body.kind, body.briefType, name)

    const payload = await getPayload({ config })

    // 1) Зберігаємо заявку (навіть якщо лист не піде — лід не втрачено)
    await payload.create({
      collection: 'submissions',
      overrideAccess: true,
      data: {
        kind: body.kind,
        briefType: body.briefType || undefined,
        subject,
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        data,
      },
    })

    // 2) Лист-сповіщення
    const rows = Object.entries(data).filter(([k, v]) => k !== '_hp' && String(v).trim() !== '')
    const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
    const html =
      `<h2>${esc(subject)}</h2><table cellpadding="6" style="border-collapse:collapse">` +
      rows
        .map(
          ([k, v]) =>
            `<tr><td style="border:1px solid #ddd;vertical-align:top"><b>${esc(k)}</b></td>` +
            `<td style="border:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`,
        )
        .join('') +
      '</table>'

    try {
      await payload.sendEmail({
        to: MAIL_TO,
        replyTo: email || undefined,
        subject,
        text,
        html,
        ...(attachments.length ? { attachments } : {}),
      })
    } catch (err) {
      // Заявку вже збережено — не валимо відповідь користувачу.
      console.error('[forms/submit] email failed:', err)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[forms/submit] error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
