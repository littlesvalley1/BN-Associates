import { useMemo, useState } from 'react'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { LISTINGS, SITE, telHref, waHref, type ListingType } from '@/lib/site'

const FILTERS: { key: 'all' | ListingType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'sale', label: 'For Sale' },
  { key: 'rent', label: 'For Rent' },
  { key: 'plot', label: 'Plots / JV' },
]

const TYPE_LABEL: Record<ListingType, string> = {
  sale: 'SALE',
  rent: 'RENT',
  plot: 'PLOT / JV',
}

export default function Listings() {
  const [filter, setFilter] = useState<'all' | ListingType>('all')
  const shown = useMemo(
    () => (filter === 'all' ? LISTINGS : LISTINGS.filter((l) => l.type === filter)),
    [filter],
  )

  return (
    <section id="listings" className="border-y hairline bg-[var(--ink-2)]/50">
      <div className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28">
        <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--yellow)]">02 / Current listings</p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="reveal max-w-[20ch] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl" style={{ ['--i' as string]: 1 }}>
            Available around <span className="text-[var(--yellow)]">Nilothi Extn.</span>
          </h2>
          <p className="reveal max-w-[46ch] text-[var(--paper-dim)]" style={{ ['--i' as string]: 2 }}>
            A sample of current inventory — stock changes fast. Call or WhatsApp for the latest list with photos.
          </p>
        </div>

        {/* filter chips */}
        <div className="reveal mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter listings">
          {FILTERS.map((f) => {
            const active = filter === f.key
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className={`flex min-h-11 items-center gap-2 rounded-full border px-5 font-mono2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? 'border-[var(--yellow)] bg-[var(--yellow-surface)] text-[var(--ink-foreground)] shadow-[0_0_18px_rgb(255_212_0/0.35)]'
                    : 'hairline text-[var(--paper-dim)] hover:border-[var(--yellow)] hover:text-[var(--yellow)]'
                }`}
              >
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${active ? 'bg-[var(--ink)]' : 'bg-[var(--red)]'}`} />
                {f.label}
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((l, idx) => (
            <article
              key={l.id}
              className="group flex flex-col rounded-xl border hairline bg-[var(--ink-2)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--yellow)]/60"
              style={{ ['--i' as string]: idx % 3 }}
            >
              {l.image && (
                <img
                  src={l.image}
                  alt={`${l.title} property`}
                  loading="lazy"
                  className="mb-5 aspect-[16/10] w-full rounded-lg object-cover"
                />
              )}
              <div className="flex items-center justify-between">
                <span className="font-mono2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--red)]">
                  {TYPE_LABEL[l.type]}
                </span>
                {l.badge && (
                  <span className="rounded-sm bg-[var(--yellow-surface)] px-2 py-0.5 font-mono2 text-[11px] font-bold uppercase tracking-wide text-[var(--ink-foreground)]">
                    {l.badge}
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-[var(--paper)]">{l.title}</h3>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[var(--paper-dim)]">
                <MapPin size={14} className="shrink-0 text-[var(--yellow)]" aria-hidden />
                {l.location}
              </p>

              {l.description && <p className="mt-3 text-sm leading-relaxed text-[var(--paper-dim)]">{l.description}</p>}

              <p className="mt-5 text-2xl font-extrabold text-[var(--yellow)]">
                {l.price}
                {l.priceNote && (
                  <span className="ml-2 align-middle font-mono2 text-[11px] font-normal uppercase tracking-wider text-[var(--paper-faint)]">
                    {l.priceNote}
                  </span>
                )}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {l.specs.map((s) => (
                  <li
                    key={s}
                    className="rounded-sm border hairline px-2 py-1 font-mono2 text-[11px] uppercase tracking-wide text-[var(--paper-dim)]"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2.5 border-t hairline pt-5">
                <a
                  href={waHref(`Namaste! I'm interested in listing ${l.id} — ${l.title} (${l.location}, ${l.price}). Please share details & photos.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[var(--red)] text-sm font-bold text-white transition-colors hover:bg-[var(--red-deep)]"
                >
                  <MessageCircle size={16} aria-hidden /> Enquire
                </a>
                <a
                  href={telHref(SITE.phone1)}
                  aria-label={`Call about ${l.title}`}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-md border hairline text-[var(--yellow)] transition-colors hover:border-[var(--yellow)]"
                >
                  <Phone size={16} aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-8 text-center font-mono2 text-xs uppercase tracking-[0.2em] text-[var(--paper-faint)]">
          * Listing availability &amp; prices change daily — confirm on call: {SITE.phone1Display}
        </p>
      </div>
    </section>
  )
}
