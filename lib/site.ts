/**
 * RZ Drywall — central site content.
 * Single source of truth for company info, services, areas, and testimonials.
 * Edit copy here; pages and components read from this file.
 */

export const company = {
  name: 'RZ Drywall',
  legalName: 'RZ Drywall',
  tagline: 'Flawless walls. Honest work. Lincoln built.',
  shortPitch:
    'Residential and commercial drywall done right — installation, repair, texture, and finishing with 22+ years of craftsmanship behind every wall.',
  yearsExperience: 22,
  foundedYear: 2002,
  phone: '(916) 267-7388',
  phoneHref: 'tel:+19162677388',
  email: 'RZdrywall916@gmail.com',
  emailHref: 'mailto:RZdrywall916@gmail.com',
  license: 'Licensed & Insured',
  hours: 'Mon–Sat, 7:00 AM – 6:00 PM',
  baseCity: 'Lincoln, NE',
  region: 'the Lincoln metro & surrounding Lancaster County communities',
  url: 'https://www.rzdrywall.online',
} as const

export const social = {
  yelp: 'https://www.yelp.com/',
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
} as const

export const nav: { href: string; label: string }[] = [
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export type Service = {
  slug: string
  title: string
  blurb: string
  details: string[]
}

export const residentialServices: Service[] = [
  {
    slug: 'drywall-installation',
    title: 'Drywall Installation',
    blurb: 'New walls and ceilings hung clean, square, and ready for a perfect finish.',
    details: [
      'New construction & home additions',
      'Hanging, taping, and mudding',
      'Garage, basement & attic conversions',
      'Moisture-resistant board for baths & laundry',
    ],
  },
  {
    slug: 'drywall-repair',
    title: 'Drywall Repair',
    blurb: 'From doorknob dings to water damage — repairs that disappear into the wall.',
    details: [
      'Hole & crack patching',
      'Water & ceiling damage repair',
      'Popcorn ceiling removal',
      'Seamless texture & paint-ready blending',
    ],
  },
  {
    slug: 'remodels-additions',
    title: 'Remodels & Additions',
    blurb: 'The drywall backbone of your remodel, on schedule and on budget.',
    details: [
      'Kitchen & bathroom remodels',
      'Finished basements & bonus rooms',
      'Wall removal & reframing patch-ins',
      'Coordination with your GC or trades',
    ],
  },
  {
    slug: 'texture-finishing',
    title: 'Texture & Finishing',
    blurb: 'Knockdown, orange peel, smooth — matched flawlessly to your existing walls.',
    details: [
      'Texture matching for repairs',
      'Knockdown, orange peel & hand textures',
      'Imperfect (Level 5) smooth finishes',
      'Wallpaper removal & wall prep',
    ],
  },
]

export const commercialServices: Service[] = [
  {
    slug: 'commercial-buildout',
    title: 'Tenant Improvements & Build-Outs',
    blurb: 'Offices, retail, and restaurants framed and finished to spec.',
    details: [
      'Office & retail tenant improvements',
      'Metal stud framing & drywall',
      'Demising & partition walls',
      'Built to plan, code, and inspection',
    ],
  },
  {
    slug: 'commercial-ceilings',
    title: 'Ceilings & Acoustics',
    blurb: 'Drop grids, hard-lid ceilings, and sound assemblies done right.',
    details: [
      'Suspended (T-bar) acoustic ceilings',
      'Hard-lid & soffit drywall ceilings',
      'Fire-rated & sound-rated assemblies',
      'Insulation & access panels',
    ],
  },
  {
    slug: 'commercial-finishing',
    title: 'Commercial Finishing',
    blurb: 'High-volume taping and finishing crews that keep projects moving.',
    details: [
      'Level 4 & Level 5 finishing',
      'Spray texture at scale',
      'Multi-unit & multi-floor projects',
      'On-time turnover for paint',
    ],
  },
]

export const specialties: string[] = [
  'Basement finishing',
  'Texture matching',
  'Level 5 smooth finish',
  'Popcorn ceiling removal',
  'Water damage repair',
  'Soundproofing assemblies',
]

export type Step = { title: string; description: string }

export const process: Step[] = [
  {
    title: 'Free Estimate',
    description:
      'We come out, measure, and listen. You get a clear, written quote with no surprises — and the price we quote is the price you pay.',
  },
  {
    title: 'Schedule & Prep',
    description:
      'We lock in a date that works for you, protect your space, and arrive on time with the right crew and materials.',
  },
  {
    title: 'Hang, Tape & Texture',
    description:
      'Our crews hang, tape, mud, and texture with meticulous attention to detail — matching your existing walls seamlessly.',
  },
  {
    title: 'Clean Walkthrough',
    description:
      'We clean up like we were never there and walk the job with you. We are not done until you are happy.',
  },
]

export type Testimonial = {
  name: string
  location: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Mary K.',
    location: 'Waverly, NE',
    rating: 5,
    quote:
      'Their attention to detail was incredible. Communication was clear, they showed up when they said they would, and the pricing was more than fair. Our walls have never looked better.',
  },
  {
    name: 'Sean M.',
    location: 'Lincoln, NE',
    rating: 5,
    quote:
      'The repair work was impeccable — you genuinely cannot tell where the damage was. They were punctual, left the place spotless, and the final price matched the estimate exactly.',
  },
  {
    name: 'Carla T.',
    location: 'Seward, NE',
    rating: 5,
    quote:
      'We hired RZ for a full remodel and they handled all the drywall and texture. Professional crew, clean work, and they matched our existing texture perfectly. Highly recommend.',
  },
]

export type Stat = { value: number; suffix?: string; prefix?: string; label: string }

export const stats: Stat[] = [
  { value: 22, suffix: '+', label: 'Years in business' },
  { value: 2000, suffix: '+', label: 'Projects completed' },
  { value: 12, label: 'Communities served' },
  { value: 5, suffix: '.0', label: 'Average review rating' },
]

export const serviceAreas: string[] = [
  'Lincoln',
  'Waverly',
  'Hickman',
  'Eagle',
  'Bennet',
  'Firth',
  'Seward',
  'Crete',
  'Beatrice',
  'Ashland',
  'Gretna',
  'Omaha',
]
