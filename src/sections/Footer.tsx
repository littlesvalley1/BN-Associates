import { MapPin, Phone } from 'lucide-react'
import { SITE, telHref } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t-4 border-[var(--red)] bg-[var(--ink-2)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-2xl font-extrabold tracking-tight">
            <span className="text-[var(--yellow)]">{SITE.brand}</span> <span className="text-[var(--paper)]">{SITE.brandSub}</span>
          </p>
          <p className="mt-1 font-mono2 text-xs uppercase tracking-[0.2em] text-[var(--yellow)]">
            Property Dealer &amp; Real Estate Experts
          </p>
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-[var(--paper-dim)]">
            Specializing in Sale, Purchase, Renting &amp; Collaboration around Nilothi Extn. and West Delhi.
          </p>
        </div>

        <nav aria-label="Footer services">
          <h3 className="font-mono2 text-xs uppercase tracking-[0.24em] text-[var(--paper-faint)]">Our Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ['Property Sale', '#services'],
              ['Residential Purchase', '#services'],
              ['Renting Solutions', '#services'],
              ['Collaboration / JV Projects', '#services'],
              ['Current Listings', '#listings'],
              ['EMI & Area Calculators', '#tools'],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} className="inline-flex min-h-8 items-center text-[var(--paper-dim)] transition-colors hover:text-[var(--yellow)]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-mono2 text-xs uppercase tracking-[0.24em] text-[var(--paper-faint)]">Office &amp; Contact</h3>
          <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-[var(--paper-dim)]">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--red)]" aria-hidden />
            <span>
              {SITE.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </span>
          </p>
          <p className="mt-4 space-y-1.5 text-sm">
            <a href={telHref(SITE.phone1)} className="flex items-center gap-2.5 font-mono2 font-bold text-[var(--yellow)] hover:text-[var(--yellow-soft)]">
              <Phone size={15} aria-hidden /> {SITE.owner}: {SITE.phone1Display}
            </a>
            <a href={telHref(SITE.phone2)} className="flex items-center gap-2.5 font-mono2 font-bold text-[var(--paper)] hover:text-[var(--yellow)]">
              <Phone size={15} aria-hidden /> Office: {SITE.phone2Display}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t hairline bg-[var(--ink)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-6 text-center text-xs text-[var(--paper-faint)]">
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between sm:text-left">
            <p>© {new Date().getFullYear()} {SITE.brand} {SITE.brandSub} — Nilothi Extn.'s trusted property partner.</p>
            <p className="font-mono2">Prices indicative · Verify all documents before any transaction.</p>
          </div>
          <div className="studio-credit inline-flex items-center gap-2.5 rounded-full border hairline px-4 py-2.5">
            <span className="studio-credit__pulse h-2 w-2 shrink-0 rounded-full bg-[var(--yellow)]" aria-hidden />
            <span className="font-mono2 text-[10px] uppercase tracking-[0.15em] text-[var(--paper-faint)]">Designed by</span>
            <a
              href="https://growthmachinestudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 font-semibold text-[var(--paper)] transition-colors hover:text-[var(--yellow)]"
              aria-label="Designed by GrowthMachine Studio"
            >
              GrowthMachine Studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
