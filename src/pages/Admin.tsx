import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  ArrowLeft, Building2, Check, Eye, ImagePlus, KeyRound, LogOut, MapPin,
  Pencil, Plus, Save, ShieldCheck, Trash2, Upload, X,
} from 'lucide-react'
import { getListings, SITE, saveListings, saveSiteInfo, type Listing, type ListingType, type SiteInfo } from '@/lib/site'
import { hasAccount, hasSession, login, logout, register } from '@/lib/admin'

type ListingDraft = Omit<Listing, 'id'> & { id?: string }

const EMPTY_LISTING: ListingDraft = {
  type: 'sale',
  title: '',
  location: '',
  price: '',
  priceNote: '',
  specs: [],
  badge: '',
  description: '',
}

const INPUT_CLASS =
  'min-h-11 w-full rounded-lg border border-white/10 bg-[#111114] px-3.5 text-sm text-[var(--paper)] placeholder:text-white/35 outline-none transition focus:border-[var(--yellow)]'
const LABEL_CLASS = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--paper-dim)]'

function imageAsDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) return Promise.reject(new Error('Choose an image file.'))
  if (file.size > 12 * 1024 * 1024) return Promise.reject(new Error('Choose an image smaller than 12 MB.'))

  return createImageBitmap(file).then((bitmap) => new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height))
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext('2d')
    if (!context) {
      bitmap.close()
      reject(new Error('This browser could not prepare the image.'))
      return
    }
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('This image could not be compressed. Please try another file.'))
      } else if (blob.size > 650_000) {
        reject(new Error('The compressed image is still too large. Choose a smaller image.'))
      } else {
        const reader = new FileReader()
        reader.onerror = () => reject(new Error('This image could not be read. Please try again.'))
        reader.onload = () => typeof reader.result === 'string'
          ? resolve(reader.result)
          : reject(new Error('This image could not be read. Please try again.'))
        reader.readAsDataURL(blob)
      }
    }, 'image/jpeg', 0.76)
  }))
}

function listingDraft(listing: Listing): ListingDraft {
  return { ...listing, specs: [...listing.specs] }
}

export default function Admin() {
  const [mode, setMode] = useState<'login' | 'setup'>(hasAccount() ? 'login' : 'setup')
  const [authed, setAuthed] = useState(hasSession())
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [listings, setListings] = useState<Listing[]>(getListings)
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(() => ({ ...SITE, addressLines: [...SITE.addressLines] }))
  const [draft, setDraft] = useState<ListingDraft>({ ...EMPTY_LISTING })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isReadingImage, setIsReadingImage] = useState(false)
  const [currentSection, setCurrentSection] = useState<'listings' | 'business'>('listings')

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAuthError('')
    try {
      if (mode === 'setup') {
        if (password !== confirmPassword) {
          setAuthError('The passwords do not match.')
          return
        }
        await register(password)
        setMode('login')
        setPassword('')
        setConfirmPassword('')
        setAuthError('Password created. Sign in to continue.')
        return
      }
      if (await login(password)) {
        setAuthed(true)
        setPassword('')
      } else {
        setAuthError('That password is not correct.')
      }
    } catch (cause) {
      setAuthError(cause instanceof Error ? cause.message : 'Could not set up admin access.')
    }
  }

  function updateDraft<K extends keyof ListingDraft>(key: K, value: ListingDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  async function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setError('')
    setNotice('')
    setIsReadingImage(true)
    try {
      updateDraft('image', await imageAsDataUrl(file))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not upload this image.')
    } finally {
      setIsReadingImage(false)
    }
  }

  function resetDraft() {
    setDraft({ ...EMPTY_LISTING })
    setEditingId(null)
  }

  function submitListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setNotice('')
    if (!draft.title.trim() || !draft.location.trim() || !draft.price.trim()) {
      setError('Enter a property title, location and price before saving.')
      return
    }

    const nextListing: Listing = {
      ...draft,
      id: editingId ?? `BN-${Date.now()}`,
      title: draft.title.trim(),
      location: draft.location.trim(),
      price: draft.price.trim(),
      priceNote: draft.priceNote?.trim() || undefined,
      badge: draft.badge?.trim() || undefined,
      description: draft.description?.trim() || undefined,
      specs: draft.specs.map((spec) => spec.trim()).filter(Boolean),
    }
    const nextListings = editingId
      ? listings.map((listing) => listing.id === editingId ? nextListing : listing)
      : [nextListing, ...listings]

    try {
      saveListings(nextListings)
      setListings(nextListings)
      setNotice(editingId ? 'Classified updated.' : 'Classified published on this browser.')
      resetDraft()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save this classified.')
    }
  }

  function editListing(listing: Listing) {
    setDraft(listingDraft(listing))
    setEditingId(listing.id)
    setError('')
    setNotice('')
    setCurrentSection('listings')
    document.getElementById('classified-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function deleteListing(id: string) {
    const listing = listings.find((item) => item.id === id)
    if (!listing || !window.confirm(`Remove "${listing.title}" from the public listings?`)) return
    const nextListings = listings.filter((item) => item.id !== id)
    try {
      saveListings(nextListings)
      setListings(nextListings)
      if (editingId === id) resetDraft()
      setNotice('Classified removed from this browser.')
      setError('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not remove this classified.')
    }
  }

  function submitBusinessInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setNotice('')
    if (!/^\d{10}$/.test(siteInfo.phone1) || !/^\d{10}$/.test(siteInfo.phone2)) {
      setError('Enter both phone numbers as 10 digits.')
      return
    }
    if (!/^\d{10,15}$/.test(siteInfo.whatsapp)) {
      setError('Enter the WhatsApp number using digits only, including country code.')
      return
    }
    const nextInfo = {
      ...siteInfo,
      addressLines: siteInfo.addressLines.map((line) => line.trim()).filter(Boolean),
    }
    if (!nextInfo.addressLines.length) {
      setError('Enter at least one line of the office address.')
      return
    }
    try {
      saveSiteInfo(nextInfo)
      setSiteInfo(nextInfo)
      setNotice('Business information saved. Open the public preview to see the updated website.')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save business information.')
    }
  }

  function signOut() {
    logout()
    setAuthed(false)
    setMode('login')
  }

  if (!authed) {
    return (
      <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[var(--ink)] px-4 py-12">
        <div className="admin-orbit admin-orbit--one" aria-hidden />
        <div className="admin-orbit admin-orbit--two" aria-hidden />
        <a href="/" className="absolute left-5 top-5 z-10 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--paper-dim)] transition hover:text-[var(--yellow)]">
          <ArrowLeft size={16} aria-hidden /> Back to website
        </a>
        <section className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#1b1b1f]/95 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--yellow)] text-[var(--ink)]">
            {mode === 'setup' ? <ShieldCheck size={22} /> : <KeyRound size={22} />}
          </div>
          <p className="font-mono2 text-[11px] uppercase tracking-[0.24em] text-[var(--yellow)]">B.N. Associates · Private area</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            {mode === 'setup' ? 'Set your password' : 'Admin sign in'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--paper-dim)]">
            {mode === 'setup'
              ? 'Create a password to protect this browser’s admin panel. No username or email is needed.'
              : 'Enter your admin password to manage classified listings and business details.'}
          </p>
          <form onSubmit={submitAuth} className="mt-7 space-y-4">
            <div>
              <label htmlFor="admin-password" className={LABEL_CLASS}>Password</label>
              <input
                id="admin-password"
                className={INPUT_CLASS}
                type="password"
                autoComplete={mode === 'setup' ? 'new-password' : 'current-password'}
                minLength={8}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {mode === 'setup' && (
              <div>
                <label htmlFor="admin-confirm-password" className={LABEL_CLASS}>Confirm password</label>
                <input
                  id="admin-confirm-password"
                  className={INPUT_CLASS}
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            )}
            {authError && (
              <p role="status" className={`rounded-lg border px-3.5 py-3 text-sm ${authError.startsWith('Password created') ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : 'border-[var(--red)]/40 bg-[var(--red)]/10 text-[#ffaaaa]'}`}>
                {authError}
              </p>
            )}
            <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--yellow)] px-5 font-bold text-[var(--ink)] transition hover:bg-[var(--yellow-soft)]">
              {mode === 'setup' ? 'Create password' : 'Unlock admin panel'}
            </button>
          </form>
          <p className="mt-5 text-xs leading-relaxed text-[var(--paper-faint)]">
            This static website stores its password and edits in this browser only. It does not provide server-side authentication or sync changes to other devices.
          </p>
        </section>
      </main>
    )
  }

  const siteField = (key: keyof Omit<SiteInfo, 'addressLines'>, value: string) => {
    setSiteInfo((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="min-h-[100dvh] bg-[#111114] text-[var(--paper)]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#151518]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="/" className="flex items-center gap-3" aria-label="B.N. Associates public website">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--yellow)] text-sm font-black text-[var(--ink)]">BN</span>
            <span>
              <span className="block text-sm font-extrabold leading-tight">B.N. Associates</span>
              <span className="font-mono2 text-[9px] uppercase tracking-[0.2em] text-[var(--paper-faint)]">Website admin</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-[var(--paper-dim)] transition hover:border-[var(--yellow)]/50 hover:text-[var(--yellow)]">
              <Eye size={15} aria-hidden /> <span className="hidden sm:inline">Preview website</span><span className="sm:hidden">Preview</span>
            </a>
            <button type="button" onClick={signOut} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-[var(--paper-dim)] transition hover:border-[var(--red)]/60 hover:text-white" aria-label="Sign out">
              <LogOut size={15} aria-hidden /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1f] p-6 sm:p-8">
          <div className="admin-orbit admin-orbit--banner" aria-hidden />
          <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.26em] text-[var(--yellow)]">Control room · {new Date().toLocaleDateString()}</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Manage your website</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--paper-dim)]">Update property classifieds and your business contact information.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3.5 py-2 text-xs font-semibold text-emerald-200">
              <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" aria-hidden /> Password protected
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#1b1b1f] p-4">
            <p className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--paper-faint)]">Published classifieds</p>
            <p className="mt-1 text-2xl font-extrabold">{listings.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#1b1b1f] p-4">
            <p className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--paper-faint)]">Office location</p>
            <p className="mt-1 flex items-center gap-1.5 truncate text-sm font-bold"><MapPin size={15} className="text-[var(--yellow)]" aria-hidden />{siteInfo.addressLines.at(-1) || 'Add your address'}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#1b1b1f] p-4">
            <p className="font-mono2 text-[10px] uppercase tracking-widest text-[var(--paper-faint)]">Primary contact</p>
            <p className="mt-1 text-sm font-bold">{siteInfo.phone1Display}</p>
          </div>
        </div>

        <div className="mb-6 flex gap-2 border-b border-white/10">
          <button type="button" onClick={() => setCurrentSection('listings')} className={`min-h-11 border-b-2 px-3 text-sm font-bold transition ${currentSection === 'listings' ? 'border-[var(--yellow)] text-[var(--yellow)]' : 'border-transparent text-[var(--paper-faint)] hover:text-[var(--paper)]'}`}>
            Classifieds
          </button>
          <button type="button" onClick={() => setCurrentSection('business')} className={`min-h-11 border-b-2 px-3 text-sm font-bold transition ${currentSection === 'business' ? 'border-[var(--yellow)] text-[var(--yellow)]' : 'border-transparent text-[var(--paper-faint)] hover:text-[var(--paper)]'}`}>
            Business information
          </button>
        </div>

        {(error || notice) && (
          <div role={error ? 'alert' : 'status'} className={`mb-5 flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${error ? 'border-[var(--red)]/40 bg-[var(--red)]/10 text-[#ffaaaa]' : 'border-emerald-500/25 bg-emerald-500/10 text-emerald-200'}`}>
            {error ? <X size={17} className="mt-0.5 shrink-0" aria-hidden /> : <Check size={17} className="mt-0.5 shrink-0" aria-hidden />}
            {error || notice}
          </div>
        )}

        {currentSection === 'listings' ? (
          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
            <section id="classified-form" className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#1b1b1f] p-5 sm:p-6">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-[var(--yellow)]">{editingId ? 'Edit classified' : 'New classified'}</p>
                  <h2 className="mt-1 text-xl font-extrabold">{editingId ? 'Update property details' : 'Add a property listing'}</h2>
                </div>
                {editingId && <button type="button" onClick={resetDraft} className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-xs font-semibold text-[var(--paper-dim)] hover:text-white"><X size={14} aria-hidden /> Cancel edit</button>}
              </div>
              <form onSubmit={submitListing} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="listing-title" className={LABEL_CLASS}>Property title *</label>
                    <input id="listing-title" className={INPUT_CLASS} placeholder="e.g. 2 BHK Builder Floor" required value={draft.title} onChange={(event) => updateDraft('title', event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="listing-type" className={LABEL_CLASS}>Category *</label>
                    <select id="listing-type" className={INPUT_CLASS} value={draft.type} onChange={(event) => updateDraft('type', event.target.value as ListingType)}>
                      <option value="sale">For sale</option><option value="rent">For rent</option><option value="plot">Plot / JV</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="listing-price" className={LABEL_CLASS}>Price *</label>
                    <input id="listing-price" className={INPUT_CLASS} placeholder="e.g. ₹ 38 Lakh" required value={draft.price} onChange={(event) => updateDraft('price', event.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="listing-location" className={LABEL_CLASS}>Location *</label>
                    <input id="listing-location" className={INPUT_CLASS} placeholder="Neighbourhood, locality" required value={draft.location} onChange={(event) => updateDraft('location', event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="listing-badge" className={LABEL_CLASS}>Badge <span className="normal-case tracking-normal">(optional)</span></label>
                    <input id="listing-badge" className={INPUT_CLASS} placeholder="New, Hot Deal…" value={draft.badge ?? ''} onChange={(event) => updateDraft('badge', event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="listing-price-note" className={LABEL_CLASS}>Price note <span className="normal-case tracking-normal">(optional)</span></label>
                    <input id="listing-price-note" className={INPUT_CLASS} placeholder="Negotiable" value={draft.priceNote ?? ''} onChange={(event) => updateDraft('priceNote', event.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="listing-specs" className={LABEL_CLASS}>Property highlights <span className="normal-case tracking-normal">(comma separated)</span></label>
                    <input id="listing-specs" className={INPUT_CLASS} placeholder="72 gaj, 2nd floor, parking" value={draft.specs.join(', ')} onChange={(event) => updateDraft('specs', event.target.value.split(',').map((spec) => spec.trim()).filter(Boolean))} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="listing-description" className={LABEL_CLASS}>Description <span className="normal-case tracking-normal">(optional)</span></label>
                    <textarea id="listing-description" className={`${INPUT_CLASS} min-h-20 resize-y py-3`} placeholder="Share a few more details…" value={draft.description ?? ''} onChange={(event) => updateDraft('description', event.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <span className={LABEL_CLASS}>Property photo <span className="normal-case tracking-normal">(optional · JPG/PNG/WebP)</span></span>
                    <label htmlFor="listing-image" className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 px-4 text-sm font-semibold text-[var(--paper-dim)] transition hover:border-[var(--yellow)]/60 hover:text-[var(--yellow)]">
                      {isReadingImage ? <span>Preparing photo…</span> : <><ImagePlus size={17} aria-hidden />{draft.image ? 'Choose a different photo' : 'Upload property photo'}</>}
                    </label>
                    <input id="listing-image" type="file" accept="image/*" className="sr-only" onChange={chooseImage} disabled={isReadingImage} />
                    {draft.image && (
                      <div className="relative mt-3 w-fit">
                        <img src={draft.image} alt="Classified preview" className="h-28 w-44 rounded-lg border border-white/10 object-cover" />
                        <button type="button" onClick={() => updateDraft('image', undefined)} aria-label="Remove photo" className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--red)] text-white"><X size={14} aria-hidden /></button>
                      </div>
                    )}
                    <p className="mt-2 text-[11px] text-[var(--paper-faint)]">Photos are resized and stored on this device with your listings.</p>
                  </div>
                </div>
                <button type="submit" disabled={isReadingImage} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--yellow)] px-5 font-bold text-[var(--ink)] transition hover:bg-[var(--yellow-soft)] disabled:cursor-not-allowed disabled:opacity-50">
                  {editingId ? <Save size={17} aria-hidden /> : <Plus size={17} aria-hidden />}
                  {editingId ? 'Save changes' : 'Publish classified'}
                </button>
              </form>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#1b1b1f] p-5 sm:p-6">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div><p className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-[var(--yellow)]">On your website</p><h2 className="mt-1 text-xl font-extrabold">Your classifieds</h2></div>
                <span className="font-mono2 text-xs text-[var(--paper-faint)]">{listings.length} total</span>
              </div>
              {listings.length ? (
                <ul className="space-y-3">
                  {listings.map((listing) => (
                    <li key={listing.id} className="flex gap-3 rounded-xl border border-white/10 bg-[#141416] p-3">
                      {listing.image
                        ? <img src={listing.image} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                        : <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[var(--paper-faint)]"><Building2 size={22} aria-hidden /></div>}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{listing.title}</p>
                        <p className="mt-1 flex items-center gap-1 truncate text-xs text-[var(--paper-faint)]"><MapPin size={12} className="shrink-0" aria-hidden />{listing.location}</p>
                        <p className="mt-1 text-sm font-extrabold text-[var(--yellow)]">{listing.price}</p>
                        <div className="mt-2 flex gap-1">
                          <button type="button" onClick={() => editListing(listing)} className="inline-flex min-h-8 items-center gap-1 rounded-md border border-white/10 px-2 text-[11px] font-semibold text-[var(--paper-dim)] hover:border-[var(--yellow)]/50 hover:text-[var(--yellow)]"><Pencil size={12} aria-hidden /> Edit</button>
                          <button type="button" onClick={() => deleteListing(listing.id)} className="inline-flex min-h-8 items-center gap-1 rounded-md border border-white/10 px-2 text-[11px] font-semibold text-[var(--paper-dim)] hover:border-[var(--red)]/50 hover:text-[#ffaaaa]"><Trash2 size={12} aria-hidden /> Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-xl border border-dashed border-white/10 px-5 py-10 text-center">
                  <Upload size={23} className="mx-auto text-[var(--paper-faint)]" aria-hidden />
                  <p className="mt-3 text-sm font-semibold">No classifieds yet</p>
                  <p className="mt-1 text-xs text-[var(--paper-faint)]">Add your first property using the form.</p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <section className="rounded-2xl border border-white/10 bg-[#1b1b1f] p-5 sm:p-7">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono2 text-[10px] uppercase tracking-[0.24em] text-[var(--yellow)]">Public website details</p>
                <h2 className="mt-1 text-xl font-extrabold">Business information</h2>
                <p className="mt-1 text-sm text-[var(--paper-dim)]">These details appear in your website header, contact section and footer.</p>
              </div>
              <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 self-start rounded-lg border border-white/10 px-3 text-xs font-semibold text-[var(--paper-dim)] transition hover:border-[var(--yellow)]/50 hover:text-[var(--yellow)] sm:self-auto"><Eye size={15} aria-hidden /> Preview public site</a>
            </div>
            <form onSubmit={submitBusinessInfo} className="grid gap-x-5 gap-y-4 md:grid-cols-2">
              <div><label htmlFor="business-brand" className={LABEL_CLASS}>Brand name</label><input id="business-brand" className={INPUT_CLASS} value={siteInfo.brand} onChange={(event) => siteField('brand', event.target.value)} required /></div>
              <div><label htmlFor="business-brand-sub" className={LABEL_CLASS}>Brand subtitle</label><input id="business-brand-sub" className={INPUT_CLASS} value={siteInfo.brandSub} onChange={(event) => siteField('brandSub', event.target.value)} required /></div>
              <div><label htmlFor="business-owner" className={LABEL_CLASS}>Owner / contact name</label><input id="business-owner" className={INPUT_CLASS} value={siteInfo.owner} onChange={(event) => siteField('owner', event.target.value)} required /></div>
              <div><label htmlFor="business-tagline" className={LABEL_CLASS}>Tagline</label><input id="business-tagline" className={INPUT_CLASS} value={siteInfo.tagline} onChange={(event) => siteField('tagline', event.target.value)} required /></div>
              <div><label htmlFor="business-phone-1" className={LABEL_CLASS}>Primary phone · 10 digits</label><input id="business-phone-1" className={INPUT_CLASS} inputMode="numeric" maxLength={10} value={siteInfo.phone1} onChange={(event) => siteField('phone1', event.target.value.replace(/\D/g, ''))} required /></div>
              <div><label htmlFor="business-phone-1-display" className={LABEL_CLASS}>Primary phone display</label><input id="business-phone-1-display" className={INPUT_CLASS} value={siteInfo.phone1Display} onChange={(event) => siteField('phone1Display', event.target.value)} required /></div>
              <div><label htmlFor="business-phone-2" className={LABEL_CLASS}>Office phone · 10 digits</label><input id="business-phone-2" className={INPUT_CLASS} inputMode="numeric" maxLength={10} value={siteInfo.phone2} onChange={(event) => siteField('phone2', event.target.value.replace(/\D/g, ''))} required /></div>
              <div><label htmlFor="business-phone-2-display" className={LABEL_CLASS}>Office phone display</label><input id="business-phone-2-display" className={INPUT_CLASS} value={siteInfo.phone2Display} onChange={(event) => siteField('phone2Display', event.target.value)} required /></div>
              <div><label htmlFor="business-whatsapp" className={LABEL_CLASS}>WhatsApp · country code + number</label><input id="business-whatsapp" className={INPUT_CLASS} inputMode="numeric" value={siteInfo.whatsapp} onChange={(event) => siteField('whatsapp', event.target.value.replace(/\D/g, ''))} required /></div>
              <div><label htmlFor="business-hours" className={LABEL_CLASS}>Opening hours</label><input id="business-hours" className={INPUT_CLASS} value={siteInfo.hours} onChange={(event) => siteField('hours', event.target.value)} required /></div>
              <div className="md:col-span-2"><label htmlFor="business-address" className={LABEL_CLASS}>Office address · one line per row</label><textarea id="business-address" className={`${INPUT_CLASS} min-h-24 resize-y py-3`} value={siteInfo.addressLines.join('\n')} onChange={(event) => setSiteInfo((current) => ({ ...current, addressLines: event.target.value.split('\n') }))} required /></div>
              <div className="md:col-span-2"><label htmlFor="business-maps" className={LABEL_CLASS}>Google Maps link</label><input id="business-maps" className={INPUT_CLASS} type="url" value={siteInfo.mapsUrl} onChange={(event) => siteField('mapsUrl', event.target.value)} required /></div>
              <div className="pt-2 md:col-span-2"><button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--yellow)] px-5 font-bold text-[var(--ink)] transition hover:bg-[var(--yellow-soft)] sm:w-auto"><Save size={17} aria-hidden /> Save business information</button></div>
            </form>
          </section>
        )}

        <p className="mt-8 flex items-start gap-2 rounded-xl border border-amber-200/10 bg-amber-100/[0.03] p-4 text-xs leading-relaxed text-[var(--paper-faint)]">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[var(--yellow)]" aria-hidden />
          Changes and photos are stored only in this browser’s local storage. This static site has no server, so the password is a convenience lock—not server-side security—and updates will not publish to other visitors or devices. Use a connected CMS/backend to publish shared live changes.
        </p>
      </div>
    </main>
  )
}
