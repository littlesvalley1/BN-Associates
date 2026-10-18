import { Building2, MapPin, MessageCircle, Phone } from 'lucide-react'
import { SITE, telHref, waHref } from '@/lib/site'

const STATS = [
  { value: '15+', label: 'Years in Nilothi' },
  { value: '500+', label: 'Deals Closed' },
  { value: '12', label: 'Colonies Covered' },
  { value: '100%', label: 'Verified Titles' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* ambient grid + glow */}
      <div className="grid-overlay pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ffd400 0%, transparent 65%)' }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-24">
        {/* Left — copy */}
        <div>
          <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--yellow)]" style={{ ['--i' as string]: 0 }}>
            Prop. {SITE.owner} · New Delhi – 41
          </p>
          <h1
            className="reveal mt-5 text-balance text-[42px] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[68px]"
            style={{ ['--i' as string]: 1 }}
          >
            <span className="text-[var(--yellow)]">{SITE.brand}</span> {SITE.brandSub} —<br />
            <span className="text-[var(--paper)]">Nilothi's Property</span>
            <br />
            <span className="relative inline-block text-[var(--paper)]">
              Experts.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 220 10"
                fill="none"
                aria-hidden
                preserveAspectRatio="none"
              >
                <path d="M2 8C60 2 160 2 218 6" stroke="var(--red)" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p
            className="reveal mt-7 max-w-[52ch] text-lg leading-relaxed text-[var(--paper-dim)]"
            style={{ ['--i' as string]: 2 }}
          >
            {SITE.tagline}
          </p>

          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ ['--i' as string]: 3 }}>
            <a
              href={waHref(`Namaste ${SITE.brand} ${SITE.brandSub}! I want a free property valuation / enquiry.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-breathe flex min-h-12 items-center justify-center gap-2.5 rounded-md bg-[var(--red)] px-7 text-base font-bold text-white transition-colors hover:bg-[var(--red-deep)]"
            >
              <MessageCircle size={19} strokeWidth={2.4} aria-hidden />
              WhatsApp Enquiry
            </a>
            <a
              href={telHref(SITE.phone1)}
              className="flex min-h-12 items-center justify-center gap-2.5 rounded-md border hairline px-7 font-mono2 text-base font-bold text-[var(--yellow)] transition-colors hover:border-[var(--yellow)]"
            >
              <Phone size={18} strokeWidth={2.4} aria-hidden />
              {SITE.phone1Display}
            </a>
          </div>

          <dl className="reveal mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border hairline bg-[var(--line)] sm:grid-cols-4" style={{ ['--i' as string]: 4 }}>
            {STATS.map((s) => (
              <div key={s.label} className="bg-[var(--ink-2)] px-4 py-4">
                <dt className="font-mono2 order-2 mt-1 block text-[11px] uppercase tracking-wider text-[var(--paper-faint)]">
                  {s.label}
                </dt>
                <dd className="order-1 text-2xl font-extrabold text-[var(--yellow)]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — floating card visual echoing the visiting card */}
        <div className="reveal relative hidden lg:block" style={{ ['--i' as string]: 2 }} aria-hidden>
          <div className="animate-float relative mx-auto w-full max-w-sm">
            <div className="rounded-xl border hairline bg-[var(--ink-2)] p-6 shadow-2xl shadow-black/60">
              {/* house graphic */}
              <svg viewBox="0 0 320 190" className="w-full" role="img" aria-label="">
                <defs>
                  <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2a2a31" />
                    <stop offset="100%" stopColor="#1b1b1f" />
                  </linearGradient>
                </defs>
                <rect width="320" height="190" rx="8" fill="url(#heroSky)" />
                <g stroke="#ffd400" strokeWidth="2.5" fill="none" strokeLinejoin="round">
                  <path d="M60 150 V88 L120 52 L180 88 V150" />
                  <path d="M180 150 V70 L235 46 L290 70 V150" />
                  <rect x="96" y="104" width="30" height="46" />
                  <rect x="196" y="88" width="26" height="26" />
                  <rect x="240" y="88" width="26" height="26" />
                  <path d="M40 150 H305" strokeWidth="3" />
                </g>
                <g fill="#d92b2b">
                  <rect x="141" y="104" width="9" height="9" rx="1" />
                </g>
                <circle cx="272" cy="34" r="13" fill="none" stroke="#ffd400" strokeWidth="2" opacity="0.7" />
              </svg>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xl font-extrabold tracking-tight">
                    <span className="text-[var(--yellow)]">{SITE.brand}</span>{' '}
                    <span className="text-[var(--paper)]">{SITE.brandSub}</span>
                  </p>
                  <p className="font-mono2 mt-1 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)]">
                    Sale · Purchase · Renting · Collaboration
                  </p>
                </div>
                <Building2 size={30} className="text-[var(--red)]" strokeWidth={1.8} />
              </div>

              <div className="mt-5 space-y-2 border-t hairline pt-4 font-mono2 text-xs text-[var(--paper-dim)]">
                <p className="flex items-center gap-2">
                  <MapPin size={13} className="shrink-0 text-[var(--yellow)]" />
                  Teacher Vihar, Nilothi Extn., Delhi – 41
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={13} className="shrink-0 text-[var(--yellow)]" />
                  {SITE.phone1Display} · {SITE.phone2Display}
                </p>
              </div>
            </div>

            {/* floating badge */}
            <div className="absolute -left-6 -top-5 rounded-md bg-[var(--yellow-surface)] px-4 py-2 shadow-lg shadow-black/40">
              <p className="font-mono2 text-xs font-bold uppercase tracking-wider text-[var(--ink-foreground)]">
                Trusted since 2010
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ticker */}
      <div className="relative border-y hairline bg-[var(--ink-2)] py-3.5">
        <div className="flex overflow-hidden">
          <div className="animate-ticker flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-10" aria-hidden={dup === 1}>
                {['Property Sale', 'Purchase Assistance', 'Renting Solutions', 'Plot Collaboration', 'Free Valuation', 'Verified Titles', 'Nilothi Extn. Specialists'].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-10 font-mono2 text-sm uppercase tracking-[0.18em] text-[var(--paper-dim)]">
                      {t}
                      <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--red)]" />
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
