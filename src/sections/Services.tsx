import { Check, Handshake, Home, KeyRound } from 'lucide-react'
import { SERVICES, waHref } from '@/lib/site'

const ICONS = [Home, KeyRound, Handshake]

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28">
      <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--yellow)]">01 / What we do</p>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="reveal max-w-[18ch] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl" style={{ ['--i' as string]: 1 }}>
          Three services. <span className="text-[var(--yellow)]">One honest dealer.</span>
        </h2>
        <p className="reveal max-w-[46ch] text-[var(--paper-dim)]" style={{ ['--i' as string]: 2 }}>
          Everything on our visiting card — done properly, in writing, with verified papers.
        </p>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border hairline bg-[var(--line)] md:grid-cols-3">
        {SERVICES.map((s, idx) => {
          const Icon = ICONS[idx]
          return (
            <article
              key={s.id}
              className="reveal group relative bg-[var(--ink-2)] p-7 transition-colors duration-300 hover:bg-[var(--ink-3)] lg:p-9"
              style={{ ['--i' as string]: idx + 1 }}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono2 text-sm text-[var(--paper-faint)]">{s.id}</span>
                <Icon size={30} strokeWidth={1.6} className="text-[var(--yellow)]" aria-hidden />
              </div>
              <h3 className="mt-8 text-2xl font-extrabold tracking-tight text-[var(--yellow)]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-dim)]">{s.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--paper)]">
                    <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[var(--red)]" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={waHref(`Namaste! I want to enquire about: ${s.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 items-center gap-2 font-mono2 text-sm font-bold uppercase tracking-wider text-[var(--paper)] underline decoration-[var(--red)] decoration-2 underline-offset-8 transition-colors hover:text-[var(--yellow)]"
              >
                Ask about this →
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
