import { useEffect, useState } from 'react'
import { ArrowUp, MessageCircle, Phone, Settings2 } from 'lucide-react'
import { SITE, telHref, waHref } from '@/lib/site'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="/admin"
        className="fixed bottom-20 left-4 z-40 inline-flex min-h-10 items-center gap-2 rounded-full border hairline bg-[var(--ink-2)]/95 px-4 font-mono2 text-xs font-bold text-[var(--yellow)] shadow-lg shadow-black/40 backdrop-blur transition-colors hover:border-[var(--yellow)] hover:bg-[var(--yellow-surface)] hover:text-[var(--ink-foreground)] sm:bottom-6 sm:left-6"
        aria-label="Open admin panel"
      >
        <Settings2 size={15} aria-hidden />
        Admin Panel
      </a>

      {/* Floating WhatsApp */}
      <a
        href={waHref(`Namaste ${SITE.brand} ${SITE.brandSub}! I have a property enquiry.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="cta-breathe fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl shadow-black/50 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      >
        <MessageCircle size={26} strokeWidth={2.2} aria-hidden />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-40 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border hairline bg-[var(--ink-2)] text-[var(--yellow)] shadow-lg shadow-black/40 transition-transform hover:scale-105 sm:bottom-24 sm:right-6"
        >
          <ArrowUp size={19} aria-hidden />
        </button>
      )}

      {/* Mobile sticky call bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t hairline bg-[var(--ink)]/97 backdrop-blur-md sm:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <a
          href={telHref(SITE.phone1)}
          className="flex min-h-14 items-center justify-center gap-2 text-sm font-bold text-[var(--yellow)]"
        >
          <Phone size={18} aria-hidden /> Call Now
        </a>
        <a
          href={waHref(`Namaste ${SITE.brand} ${SITE.brandSub}! I have a property enquiry.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center gap-2 bg-[var(--red)] text-sm font-bold text-white"
        >
          <MessageCircle size={18} aria-hidden /> WhatsApp
        </a>
      </div>
    </>
  )
}
