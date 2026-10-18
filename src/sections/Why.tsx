import { BadgeCheck, FileText, IndianRupee, MapPinned, ShieldCheck, Timer } from 'lucide-react'

const REASONS = [
  {
    icon: MapPinned,
    title: 'Hyper-local knowledge',
    desc: 'We live and work here — Teacher Vihar, Nilothi Extn. and 10+ nearby colonies. We know the real rate of every gali.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified titles only',
    desc: 'Every property is checked for clear title and genuine ownership before we show it to you. No disputed plots, ever.',
  },
  {
    icon: IndianRupee,
    title: 'Transparent brokerage',
    desc: 'Fixed, upfront commission told before the deal starts. No hidden charges at the registry table.',
  },
  {
    icon: FileText,
    title: 'Full paperwork support',
    desc: 'Agreement, registry, mutation and loan documentation — we stay with you till the last signature.',
  },
  {
    icon: Timer,
    title: 'Fast closures',
    desc: 'Serious buyers and sellers only. Most of our deals close within 2–3 visits.',
  },
  {
    icon: BadgeCheck,
    title: 'After-deal support',
    desc: 'Tenant verification, possession help, society transfer — we don\u2019t disappear after the deal.',
  },
]

const STEPS = [
  { n: 'A', title: 'Tell us your need', desc: 'One call or WhatsApp — budget, area, purpose. We shortlist matching options the same day.' },
  { n: 'B', title: 'Visit verified options', desc: 'We arrange site visits at your time, with papers ready to inspect. Ask anything.' },
  { n: 'C', title: 'Close with confidence', desc: 'Negotiation, agreement, registry — handled end to end with complete transparency.' },
]

export default function Why() {
  return (
    <section id="why" className="border-y hairline bg-[var(--ink-2)]/50">
      <div className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28">
        <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--yellow)]">04 / Why B.N. Associates</p>
        <h2 className="reveal mt-4 max-w-[22ch] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl" style={{ ['--i' as string]: 1 }}>
          Dealing property is easy. <span className="text-[var(--yellow)]">Dealing honestly is rare.</span>
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border hairline bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, idx) => (
            <div key={r.title} className="reveal bg-[var(--ink-2)] p-7 transition-colors hover:bg-[var(--ink-3)]" style={{ ['--i' as string]: idx % 3 }}>
              <r.icon size={26} strokeWidth={1.7} className="text-[var(--yellow)]" aria-hidden />
              <h3 className="mt-4 text-lg font-extrabold tracking-tight text-[var(--paper)]">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--paper-dim)]">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* process */}
        <div className="mt-16">
          <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--paper-faint)]">How a deal works with us</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, idx) => (
              <div key={s.n} className="reveal relative rounded-xl border hairline bg-[var(--ink)] p-7" style={{ ['--i' as string]: idx + 1 }}>
                <span className="font-mono2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--red)] text-base font-bold text-[var(--yellow)]">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--paper-dim)]">{s.desc}</p>
                {idx < 2 && (
                  <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 font-mono2 text-xl text-[var(--red)] md:block" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
