import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { company } from '@/lib/site'
import { AboutClient } from './about-client'

export const metadata: Metadata = {
  title: 'About',
  description: `${company.name} is a family-run residential and commercial drywall contractor serving ${company.region}. ${company.yearsExperience}+ years of craftsmanship, honest pricing, and meticulous attention to detail since ${company.foundedYear}.`,
  alternates: { canonical: `${company.url}/about` },
  openGraph: {
    title: `About ${company.name}`,
    description: `Family-run drywall craftsmen serving Lincoln since ${company.foundedYear}. Top-notch craftsmanship, honest pricing, and exceptional service.`,
    url: `${company.url}/about`,
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <AboutClient />
      </main>
      <Footer />
    </>
  )
}
