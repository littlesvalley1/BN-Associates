import { useEffect, useState } from 'react'
import { Menu, Moon, Phone, Sun, X } from 'lucide-react'
import { SITE, telHref } from '@/lib/site'

type Theme = 'dark' | 'light'

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Listings', href: '#listings' },
  { label: 'Calculators', href: '#tools' },
  { label: 'Why Us', href: '#why' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b hairline transition-colors duration-300 ${
        scrolled || open ? 'bg-[var(--ink)]/95 backdrop-blur-md' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-baseline gap-1.5" aria-label={`${SITE.brand} ${SITE.brandSub} home`}>
          <span className="text-2xl font-extrabold tracking-tight text-[var(--yellow)]">{SITE.brand}</span>
          <span className="text-sm font-bold tracking-[0.22em] text-[var(--paper)]">{SITE.brandSub}</span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="whitespace-nowrap font-mono2 text-[13px] uppercase tracking-wider text-[var(--paper-dim)] transition-colors hover:text-[var(--yellow)]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telHref(SITE.phone1)}
            className="flex min-h-11 items-center gap-2 whitespace-nowrap font-mono2 text-sm font-bold text-[var(--yellow)] transition-colors hover:text-[var(--yellow-soft)]"
          >
            <Phone size={16} strokeWidth={2.4} aria-hidden />
            {SITE.phone1Display}
          </a>
          <a
            href="#contact"
            className="min-h-11 whitespace-nowrap rounded-md bg-[var(--red)] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--red-deep)]"
          >
            Enquire Now
          </a>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
          aria-pressed={theme === 'light'}
          title={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
          className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border hairline px-2.5 text-[var(--paper)] transition-colors hover:border-[var(--yellow)] hover:text-[var(--yellow)] sm:px-3"
        >
          {theme === 'dark' ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
          <span className="hidden font-mono2 text-[11px] font-bold uppercase tracking-wide sm:inline lg:hidden">
            {theme === 'dark' ? 'Day' : 'Night'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-[var(--paper)] lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t hairline bg-[var(--ink)] lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6" aria-label="Mobile navigation">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b hairline text-base font-semibold text-[var(--paper)] last:border-0"
              >
                {n.label}
              </a>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3 pb-2">
              <a
                href={telHref(SITE.phone1)}
                className="flex min-h-12 items-center justify-center gap-2 rounded-md border hairline font-mono2 text-sm font-bold text-[var(--yellow)]"
              >
                <Phone size={16} aria-hidden /> Call Now
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-md bg-[var(--red)] text-sm font-bold text-white"
              >
                Enquire Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
