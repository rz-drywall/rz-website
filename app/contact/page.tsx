import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { company } from '@/lib/site'

import { ContactClient } from './contact-client'

export const metadata: Metadata = {
  title: 'Contact & Free Estimate',
  description: `Get a free, no-surprises drywall estimate from ${company.name} in ${company.baseCity}. Residential and commercial. The price we quote is the price you pay.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact ${company.name} — Free Estimate`,
    description:
      'Request a free residential or commercial drywall estimate. The price we quote is the price you pay.',
    url: `${company.url}/contact`,
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ContactClient />
      </main>
      <Footer />
    </>
  )
}
