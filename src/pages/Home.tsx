import { useReveal } from '@/hooks/useReveal'
import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import Services from '@/sections/Services'
import Listings from '@/sections/Listings'
import Tools from '@/sections/Tools'
import Why from '@/sections/Why'
import Testimonials from '@/sections/Testimonials'
import Faq from '@/sections/Faq'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'
import FloatingActions from '@/sections/FloatingActions'
import { AREAS, SITE } from '@/lib/site'
import { MapPin } from 'lucide-react'

function Areas() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-label="Areas we serve">
      <div className="reveal flex flex-col items-start gap-6 rounded-xl border hairline bg-[var(--ink-2)] p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.24em] text-[var(--yellow)]">Areas we serve</p>
          <p className="mt-2 max-w-[42ch] text-lg font-bold leading-snug text-[var(--paper)]">
            Based in {(SITE.addressLines.at(-1) || 'New Delhi').replace(',', '')} — dealing across West Delhi:
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <li
              key={a}
              className="flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 font-mono2 text-xs uppercase tracking-wide text-[var(--paper-dim)]"
            >
              <MapPin size={12} className="text-[var(--red)]" aria-hidden />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function Home() {
  useReveal()
  return (
    <div className="min-h-[100dvh]">
      <Header />
      <main>
        <Hero />
        <Services />
        <Listings />
        <Areas />
        <Tools />
        <Why />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      {/* spacer so the mobile sticky bar never covers footer content */}
      <div className="h-14 sm:hidden" aria-hidden />
    </div>
  )
}
