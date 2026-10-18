export interface SiteInfo {
  brand: string
  brandSub: string
  owner: string
  tagline: string
  phone1: string
  phone2: string
  phone1Display: string
  phone2Display: string
  whatsapp: string
  addressLines: string[]
  mapsUrl: string
  hours: string
}

const SITE_STORAGE_KEY = 'bn-associates:site'
const LISTINGS_STORAGE_KEY = 'bn-associates:listings'

const DEFAULT_SITE: SiteInfo = {
  brand: 'B.N.',
  brandSub: 'ASSOCIATES',
  owner: 'Preetpal Singh',
  tagline: 'Nilothi Extn. के trusted property experts',
  phone1: '9599643948',
  phone2: '8860800791',
  phone1Display: '95996-43948',
  phone2Display: '88608-00791',
  whatsapp: '919599643948',
  addressLines: [
    'Plot No. C-2, Teacher Vihar, Shop No. 4,',
    'Near Medicine Factory,',
    'Nilothi Extn., New Delhi – 110041',
  ],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Teacher+Vihar+Nilothi+Extension+New+Delhi+110041',
  hours: 'Mon – Sun · 9:00 AM – 8:00 PM',
}

function readSiteInfo(): SiteInfo {
  const stored = localStorage.getItem(SITE_STORAGE_KEY)
  if (!stored) return { ...DEFAULT_SITE, addressLines: [...DEFAULT_SITE.addressLines] }

  const saved: unknown = JSON.parse(stored)
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
    throw new Error('Saved business information is invalid. Please correct the local site data.')
  }
  const merged = { ...DEFAULT_SITE, ...saved } as SiteInfo
  const textFields: (keyof Omit<SiteInfo, 'addressLines'>)[] = [
    'brand', 'brandSub', 'owner', 'tagline', 'phone1', 'phone2', 'phone1Display',
    'phone2Display', 'whatsapp', 'mapsUrl', 'hours',
  ]
  if (textFields.some((field) => typeof merged[field] !== 'string') ||
      !Array.isArray(merged.addressLines) ||
      !merged.addressLines.every((line) => typeof line === 'string')) {
    throw new Error('Saved business information has invalid fields. Please correct the local site data.')
  }
  return merged
}

function isListingType(value: unknown): value is ListingType {
  return value === 'sale' || value === 'rent' || value === 'plot'
}

function validateListings(value: unknown): Listing[] {
  if (!Array.isArray(value)) throw new Error('Saved classifieds must be a list.')
  for (const item of value) {
    if (!item || typeof item !== 'object' ||
        typeof item.id !== 'string' ||
        !isListingType(item.type) ||
        typeof item.title !== 'string' ||
        typeof item.location !== 'string' ||
        typeof item.price !== 'string' ||
        !Array.isArray(item.specs) ||
        !item.specs.every((spec: unknown) => typeof spec === 'string') ||
        (item.image !== undefined && typeof item.image !== 'string') ||
        (item.description !== undefined && typeof item.description !== 'string')) {
      throw new Error('A saved classified has invalid information. Please correct the local site data.')
    }
  }
  return value as Listing[]
}

function readListings(): Listing[] {
  const stored = localStorage.getItem(LISTINGS_STORAGE_KEY)
  return stored ? validateListings(JSON.parse(stored)) : DEFAULT_LISTINGS
}

export const SITE = readSiteInfo()

export function telHref(num: string) {
  return `tel:+91${num}`
}

export function waHref(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export type ListingType = 'sale' | 'rent' | 'plot'

export interface Listing {
  id: string
  type: ListingType
  title: string
  location: string
  price: string
  priceNote?: string
  specs: string[]
  badge?: string
  description?: string
  image?: string
}

const DEFAULT_LISTINGS: Listing[] = [
  {
    id: 'L01',
    type: 'sale',
    title: '2 BHK Builder Floor',
    location: 'Teacher Vihar, Nilothi Extn.',
    price: '₹ 38 Lakh',
    priceNote: 'negotiable',
    specs: ['72 gaj', '2nd floor', '2 bath', 'Car parking'],
    badge: 'Hot Deal',
  },
  {
    id: 'L02',
    type: 'plot',
    title: 'Residential Plot',
    location: 'Nilothi Village, near Main Road',
    price: '₹ 85 Lakh',
    specs: ['100 gaj', '25 ft road', 'East facing', 'Clear title'],
    badge: 'New',
  },
  {
    id: 'L03',
    type: 'rent',
    title: '1 BHK for Family',
    location: 'Nilothi Extn., Block C',
    price: '₹ 8,500 /mo',
    specs: ['45 gaj', 'Semi-furnished', 'Separate meter', '24×7 water'],
  },
  {
    id: 'L04',
    type: 'sale',
    title: 'Commercial Shop',
    location: 'Main Market, Nilothi Extn.',
    price: '₹ 32 Lakh',
    specs: ['120 sq ft', 'Corner facing', 'High footfall', 'Ready registry'],
    badge: 'Investment',
  },
  {
    id: 'L05',
    type: 'rent',
    title: '3 BHK Independent Floor',
    location: 'Teacher Vihar, Nilothi Extn.',
    price: '₹ 18,000 /mo',
    specs: ['100 gaj', 'Ground floor', '3 bath', 'Balcony + parking'],
  },
  {
    id: 'L06',
    type: 'plot',
    title: 'Corner Plot — JV Possible',
    location: 'Nilothi Extn., near Medicine Factory',
    price: '₹ 1.1 Cr',
    priceNote: 'collaboration open',
    specs: ['150 gaj', 'Two-side open', '30 ft road', 'JV / collaboration'],
    badge: 'JV Open',
  },
]

export const LISTINGS: Listing[] = readListings()

export function getListings(): Listing[] {
  return readListings()
}

export function saveSiteInfo(info: SiteInfo) {
  localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(info))
}

export function saveListings(listings: Listing[]) {
  localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(validateListings(listings)))
}

export const AREAS = [
  'Nilothi Extn.',
  'Teacher Vihar',
  'Nilothi Village',
  'Nangloi',
  'Kamal Vihar',
  'Jwala Puri',
  'Paschim Vihar',
  'Peera Garhi',
  'Udyog Nagar',
  'Mundka',
  'Bakkarwala',
  'Ranhaula',
]

export const SERVICES = [
  {
    id: '01',
    title: 'Sale & Purchase',
    desc: 'Flats, builder floors, plots, shops and commercial property — verified titles, fair market price, complete paperwork till registry.',
    points: ['Residential & builder floors', 'Plots — clear title verified', 'Commercial shops & spaces', 'Registry & documentation support'],
  },
  {
    id: '02',
    title: 'Renting',
    desc: 'Homes, floors, shops, office space and PG — genuine owners, verified tenants, transparent brokerage with rent agreement done right.',
    points: ['Family & bachelor floors', 'Shops & office space', 'PG & shared accommodation', 'Rent agreement assistance'],
  },
  {
    id: '03',
    title: 'Collaboration',
    desc: 'Joint-venture and development partnerships for plot owners — we connect you with trusted builders and structure a fair deal.',
    points: ['Plot + builder joint ventures', 'Property development tie-ups', 'Fair sharing structure', 'End-to-end deal management'],
  },
]
