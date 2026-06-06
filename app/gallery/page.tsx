import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { company } from '@/lib/site'

import { GalleryClient } from './gallery-client'

export const metadata: Metadata = {
  title: 'Our Work — Drywall Project Gallery',
  description:
    'Browse RZ Drywall’s finished residential and commercial projects across the Lincoln area — installation, repair, texture, Level 5 smooth finishes, and work in progress.',
  alternates: { canonical: `${company.url}/gallery` },
  openGraph: {
    title: 'Our Work — RZ Drywall Project Gallery',
    description:
      'Finished residential and commercial drywall projects across Lincoln. 22+ years of flawless walls.',
    url: `${company.url}/gallery`,
    type: 'website',
  },
}

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <GalleryClient />
      </main>
      <Footer />
    </>
  )
}
