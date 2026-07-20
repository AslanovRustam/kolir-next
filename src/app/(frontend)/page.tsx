import Hero from '../../components/sections/Hero'
import ServicesServer from '../../components/sections/ServicesServer'
import Cases from '../../components/sections/Cases'
import BriefsServer from '../../components/sections/BriefsServer'
import TestimonialsServer from '../../components/sections/TestimonialsServer'
import About from '../../components/sections/About'
import ContactServer from '../../components/sections/ContactServer'
import ScriptOnMount from '../../components/ScriptOnMount'
import JsonLd from '../../components/JsonLd'
import type { Metadata } from 'next'
import { pageMeta } from '../../lib/seo'
import { getLocale } from '../../lib/locale'
import { organizationLd, websiteLd } from '../../lib/jsonld'

const META = {
  uk: {
    title: 'Kolir — брендингова агенція: бренди, айдентика, сайти',
    description:
      'Брендингова агенція Kolir: нейминг, візуальна айдентика, вебдизайн і моушн для брендів, що зростають. Налаштуй яскравість свого бізнесу.',
  },
  en: {
    title: 'Kolir — Branding Agency: Brands, Identity, Websites',
    description:
      'Kolir branding agency: naming, visual identity, web design and motion for growing brands. Tune the brightness of your business.',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMeta({ ...META[locale], path: '', locale, absoluteTitle: true })
}

export default function HomePage() {
  return (
    <main className="kolir-page">
      <JsonLd data={[organizationLd, websiteLd]} />
      <ScriptOnMount src="/js/hcase-stack.js" />
      <ScriptOnMount src="/js/logo-marquee.js" />
      <div className="shell">
        <Hero />
        <Cases />
        <ServicesServer />
        <BriefsServer />
        <TestimonialsServer />
        <About />
        <ContactServer />
      </div>
    </main>
  )
}
