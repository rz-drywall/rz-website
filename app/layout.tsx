import type { Metadata, Viewport } from 'next'
import React from 'react'

import '@/styles/tailwind.css'
import { company, serviceAreas } from '@/lib/site'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f59f6',
}

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    template: '%s | RZ Drywall',
    default: 'RZ Drywall | Residential & Commercial Drywall in Lincoln, Nebraska',
  },
  description:
    'RZ Drywall delivers expert residential and commercial drywall installation, repair, texture, and finishing across the Lincoln area. 22+ years of craftsmanship. Free estimates.',
  applicationName: 'RZ Drywall',
  authors: [{ name: 'RZ Drywall', url: company.url }],
  creator: 'RZ Drywall',
  publisher: 'RZ Drywall',
  category: 'business',
  keywords: [
    'drywall Lincoln',
    'drywall repair Lincoln',
    'drywall installation',
    'commercial drywall',
    'residential drywall',
    'texture matching',
    'popcorn ceiling removal',
    'drywall contractor Lincoln NE',
    'Lincoln Nebraska drywall',
    'basement finishing Lincoln',
    'Waverly drywall',
    'Seward drywall',
    'Omaha drywall',
  ],
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: company.url },
  openGraph: {
    title: 'RZ Drywall | Residential & Commercial Drywall in Lincoln, Nebraska',
    description:
      'Expert drywall installation, repair, texture, and finishing across Lincoln. 22+ years of craftsmanship. Free estimates.',
    url: company.url,
    siteName: 'RZ Drywall',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/photos/hero-living.jpg', width: 1600, height: 1067, alt: 'RZ Drywall finished interior' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RZ Drywall | Residential & Commercial Drywall in Lincoln, Nebraska',
    description:
      'Expert drywall installation, repair, texture, and finishing across Lincoln. 22+ years of craftsmanship.',
    images: ['/photos/hero-living.jpg'],
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: company.name,
  image: `${company.url}/photos/hero-living.jpg`,
  '@id': company.url,
  url: company.url,
  telephone: company.phone,
  email: company.email,
  priceRange: '$$',
  foundingDate: String(company.foundedYear),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lincoln',
    addressRegion: 'NE',
    addressCountry: 'US',
  },
  areaServed: serviceAreas.map((name) => ({ '@type': 'City', name })),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:00',
    closes: '18:00',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '24',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700,800&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="bg-white text-ink-950 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
