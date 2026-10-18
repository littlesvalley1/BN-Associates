import plotPhoto from '@/assets/nilothi-residential-plot.jpg'
import homePhoto from '@/assets/nilothi-family-home.jpg'
import officePhoto from '@/assets/bn-associates-office.jpg'

const PHOTOS = [
  {
    src: plotPhoto,
    alt: 'Residential plot among homes in the Nilothi area',
    label: 'Plots around Nilothi',
  },
  {
    src: homePhoto,
    alt: 'Multi-storey family home in West Delhi',
    label: 'Homes for every family',
  },
  {
    src: officePhoto,
    alt: 'B.N. Associates property office in the neighborhood',
    label: 'Your local property team',
  },
]

export default function PropertyShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="showcase-title">
      <div className="max-w-2xl">
        <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--yellow)]">
          Around the neighborhood
        </p>
        <h2 id="showcase-title" className="reveal mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Local places. <span className="text-[var(--yellow)]">Real people.</span>
        </h2>
        <p className="reveal mt-4 max-w-[54ch] leading-relaxed text-[var(--paper-dim)]">
          A glimpse of the homes, plots and local team serving Nilothi Extn. and nearby West Delhi.
        </p>
      </div>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PHOTOS.map((photo, index) => (
          <figure
            key={photo.src}
            className="reveal group overflow-hidden rounded-xl border hairline bg-[var(--ink-2)]"
            style={{ ['--i' as string]: index }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <figcaption className="px-5 py-4 font-semibold text-[var(--paper)]">{photo.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
