import type { Metadata } from 'next'
import { company } from '@/lib/site'
import { HomeClient } from './home-client'

export const metadata: Metadata = {
  title: `${company.name} — Drywall Installation, Repair & Finishing in Lincoln, Nebraska`,
  description: `${company.shortPitch} Serving ${company.region}. Free estimates — the price we quote is the price you pay.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${company.name} — ${company.tagline}`,
    description: company.shortPitch,
    url: company.url,
    siteName: company.name,
    type: 'website',
  },
}

export default function Home() {
  return <HomeClient />
}
