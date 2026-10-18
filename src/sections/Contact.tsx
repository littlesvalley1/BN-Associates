import { useState, type FormEvent } from 'react'
import { Clock, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { SITE, telHref, waHref } from '@/lib/site'

const SERVICE_TYPES = ['Buy a property', 'Sell my property', 'Rent — I need a place', 'Rent out — I have a property', 'Plot collaboration / JV', 'Free valuation']

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState(SERVICE_TYPES[0])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return setError('Please enter your name.')
    if (!/^\d{10}$/.test(phone.trim())) return setError('Please enter a valid 10-digit mobile number.')
    setError('')
    const text = `Namaste ${SITE.brand} ${SITE.brandSub}!\n\nName: ${name.trim()}\nPhone: ${phone.trim()}\nRequirement: ${type}${message.trim() ? `\nDetails: ${message.trim()}` : ''}`
    window.open(waHref(text), '_blank', 'noopener,noreferrer')
  }

  const inputCls =
    'min-h-12 w-full rounded-md border hairline bg-[var(--ink)] px-4 text-base text-[var(--paper)] placeholder:text-[var(--paper-faint)] outline-none transition-colors focus:border-[var(--yellow)]'

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — info */}
        <div>
          <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--yellow)]">07 / Get in touch</p>
          <h2 className="reveal mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl" style={{ ['--i' as string]: 1 }}>
            One call away from your <span className="text-[var(--yellow)]">next property.</span>
          </h2>
          <p className="reveal mt-5 max-w-[48ch] text-[var(--paper-dim)]" style={{ ['--i' as string]: 2 }}>
            Walk into our office, call directly, or drop a WhatsApp — we reply fast, seven days a week.
          </p>

          <div className="reveal mt-9 space-y-5" style={{ ['--i' as string]: 3 }}>
            <a href={telHref(SITE.phone1)} className="group flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[var(--red)] text-white transition-colors group-hover:bg-[var(--red-deep)]">
                <Phone size={20} aria-hidden />
              </span>
              <span>
                <span className="block font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)]">{SITE.owner}</span>
                <span className="block font-mono2 text-xl font-bold text-[var(--yellow)]">{SITE.phone1Display}</span>
              </span>
            </a>
            <a href={telHref(SITE.phone2)} className="group flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border hairline text-[var(--yellow)] transition-colors group-hover:border-[var(--yellow)]">
                <Phone size={20} aria-hidden />
              </span>
              <span>
                <span className="block font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)]">Office</span>
                <span className="block font-mono2 text-xl font-bold text-[var(--paper)]">{SITE.phone2Display}</span>
              </span>
            </a>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border hairline text-[var(--yellow)] transition-colors group-hover:border-[var(--yellow)]">
                <MapPin size={20} aria-hidden />
              </span>
              <span>
                <span className="block font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)]">Office address</span>
                <span className="block leading-snug text-[var(--paper)]">{SITE.addressLines.join(' ')}</span>
                <span className="font-mono2 mt-1 inline-block text-xs font-bold uppercase tracking-wider text-[var(--yellow)] underline underline-offset-4">
                  Open in Google Maps →
                </span>
              </span>
            </a>
            <p className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border hairline text-[var(--yellow)]">
                <Clock size={20} aria-hidden />
              </span>
              <span>
                <span className="block font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)]">Hours</span>
                <span className="block text-[var(--paper)]">{SITE.hours}</span>
              </span>
            </p>
          </div>
        </div>

        {/* Right — WhatsApp enquiry form */}
        <div className="reveal rounded-xl border hairline bg-[var(--ink-2)] p-6 sm:p-9" style={{ ['--i' as string]: 2 }}>
          <p className="font-mono2 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[var(--yellow)]">
            <Send size={14} aria-hidden /> Direct enquiry — lands on our WhatsApp
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4" noValidate={false}>
            <div>
              <label htmlFor="c-name" className="mb-1.5 block text-sm font-semibold">
                Your Name
              </label>
              <input id="c-name" className={inputCls} placeholder="e.g. Rahul Verma" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="c-phone" className="mb-1.5 block text-sm font-semibold">
                Mobile Number
              </label>
              <input
                id="c-phone"
                className={inputCls}
                placeholder="10-digit mobile"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                autoComplete="tel-national"
              />
            </div>
            <div>
              <label htmlFor="c-type" className="mb-1.5 block text-sm font-semibold">
                I want to
              </label>
              <select id="c-type" className={inputCls} value={type} onChange={(e) => setType(e.target.value)}>
                {SERVICE_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-1.5 block text-sm font-semibold">
                Details <span className="font-normal text-[var(--paper-faint)]">(optional)</span>
              </label>
              <textarea
                id="c-msg"
                className={`${inputCls} min-h-24 resize-y py-3`}
                placeholder="Budget, preferred area, plot size…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {error && (
              <p role="alert" className="rounded-md border border-[var(--red)]/60 bg-[var(--red)]/10 px-4 py-2.5 text-sm font-semibold text-[#ff8a8a]">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="cta-breathe flex min-h-13 w-full items-center justify-center gap-2.5 rounded-md bg-[var(--red)] px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-[var(--red-deep)]"
            >
              <MessageCircle size={19} aria-hidden />
              Send on WhatsApp
            </button>
            <p className="text-center text-xs text-[var(--paper-faint)]">
              Opens WhatsApp with your message pre-filled — no sign-up, no spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
