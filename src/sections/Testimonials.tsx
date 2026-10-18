import { Quote, Star } from 'lucide-react'

const ITEMS = [
  {
    name: 'Rajesh Kumar',
    role: 'Bought 2 BHK · Teacher Vihar',
    text: 'Preetpal ji showed us exactly what matched our budget — no time waste. Registry done in one week, papers crystal clear. Best dealer in Nilothi.',
  },
  {
    name: 'Sunita Devi',
    role: 'Sold plot · Nilothi Village',
    text: 'I was worried about brokers cheating me on rate. B.N. Associates got me a better price than I expected and their commission was told upfront.',
  },
  {
    name: 'Amit Sharma',
    role: 'Rented shop · Nilothi Extn. Main Market',
    text: 'Needed a shop urgently for my business. Got three verified options in two days and the rent agreement was made the same evening. Highly recommended.',
  },
]

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28" aria-label="Testimonials">
      <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--yellow)]">05 / Word on the street</p>
      <h2 className="reveal mt-4 max-w-[20ch] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl" style={{ ['--i' as string]: 1 }}>
        Neighbours who <span className="text-[var(--yellow)]">dealt with us.</span>
      </h2>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {ITEMS.map((t, idx) => (
          <figure key={t.name} className="reveal flex flex-col rounded-xl border hairline bg-[var(--ink-2)] p-7" style={{ ['--i' as string]: idx + 1 }}>
            <Quote size={26} className="text-[var(--red)]" strokeWidth={1.8} aria-hidden />
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--paper)]">“{t.text}”</blockquote>
            <figcaption className="mt-6 border-t hairline pt-4">
              <div className="flex gap-0.5" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[var(--yellow)] text-[var(--yellow)]" aria-hidden />
                ))}
              </div>
              <p className="mt-2 font-bold text-[var(--paper)]">{t.name}</p>
              <p className="font-mono2 text-xs uppercase tracking-wider text-[var(--paper-faint)]">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
