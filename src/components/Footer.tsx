import Link from 'next/link'
import { getPayload } from 'payload'
import config from '../payload.config'
import { getLocale } from '../lib/locale'

const SOCIALS = [
  { href: 'https://dribbble.com/kolir_agency', label: 'Dribbble', icon: '/img/uu.svg' },
  { href: 'https://www.behance.net/kolir_agency', label: 'Behance', icon: '/img/behances.svg' },
  { href: 'https://www.upwork.com/agencies/1714200155263229952/', label: 'Upwork', icon: '/img/up-work.svg' },
  { href: 'https://www.linkedin.com/company/koliragency/', label: 'LinkedIn', icon: '/img/linkedin.svg' },
  { href: 'https://www.instagram.com/kolir_agency/', label: 'Instagram', icon: '/img/instagram.svg' },
  { href: 'https://www.facebook.com/kolir.agency', label: 'Facebook', icon: '/img/facebook.svg' },
]

export default async function Footer() {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const f = await payload.findGlobal({ slug: 'footer', locale })
  const copy = f.copy || '© 2026 Kolir Agency. Усі права захищено.'
  const legal =
    f.legal || 'Усі дизайни, тексти та візуальні матеріали є інтелектуальною власністю компанії.'
  const privacyLink = f.privacyLink || 'Політика конфіденційності'

  return (
    <footer className="footerk" aria-label="Footer">
      <div className="footerk-shell">
        <div className="footerk-top">
          <div className="footerk-left">
            <Link className="footerk-logo-link" href="/" aria-label="Kolir">
              <img className="footerk-logo" src="/img/Logo%20-%20Kolir%20UA.svg" alt="Kolir" />
            </Link>
            <div className="footerk-copy">{copy}</div>
          </div>

          <hr className="footerkmob-hr" />

          <div className="footerk-socials" aria-label="Social links">
            {SOCIALS.map((s) => (
              <a key={s.label} className="footerk-social" href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <img src={s.icon} alt="" />
              </a>
            ))}
          </div>
        </div>

        <div className="footerk-hr" />

        <div className="footerk-mid">
          <div className="footerk-legal">
            <div className="footerk-copy">{legal}</div>
          </div>
          <div className="footerk-links">
            <Link href="/privacy" className="footerk-link">
              {privacyLink}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
