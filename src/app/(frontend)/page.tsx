import Hero from '../../components/sections/Hero'
import ServicesServer from '../../components/sections/ServicesServer'
import Cases from '../../components/sections/Cases'
import BriefsServer from '../../components/sections/BriefsServer'
import TestimonialsServer from '../../components/sections/TestimonialsServer'
import About from '../../components/sections/About'
import ContactServer from '../../components/sections/ContactServer'
import ScriptOnMount from '../../components/ScriptOnMount'
import { pageMeta } from '../../lib/seo'

export const metadata = pageMeta({
  title: 'Kolir — брендингова агенція: бренди, айдентика, сайти',
  description:
    'Брендингова агенція Kolir: нейминг, візуальна айдентика, вебдизайн і моушн для брендів, що зростають. Налаштуй яскравість свого бізнесу.',
  path: '/',
  absoluteTitle: true,
})

export default function HomePage() {
  return (
    <main className="kolir-page">
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
