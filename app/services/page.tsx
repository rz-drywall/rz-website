import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ServicesClient } from './services-client'

export const metadata: Metadata = {
  title: 'Drywall Services',
  description:
    'Residential and commercial drywall services across the Lincoln area — installation, repair, remodels, texture matching, Level 5 smooth, popcorn ceiling removal, tenant build-outs, ceilings, and commercial finishing. Free estimates.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ServicesClient />
      </main>
      <Footer />
    </>
  )
}
