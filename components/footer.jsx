'use client'

import { CheckBadgeIcon, EnvelopeIcon, MapPinIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { company, nav, serviceAreas, social } from '@/lib/site'
import { Button } from './button'
import { Link } from './link'
import { Logo } from './logo'

function CallToAction() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand to-brand-darker px-6 py-16 shadow-2xl shadow-brand/30 ring-1 ring-inset ring-white/15 sm:px-14">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-light/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-28 -left-16 size-80 rounded-full bg-brand-darker/40 blur-3xl"
      />
      <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl"
          >
            Ready for walls done right?
          </motion.h2>
          <p className="mt-4 text-lg text-white/85">
            Free estimates across {company.region}.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm font-medium text-white/90">
            <CheckBadgeIcon className="size-5 shrink-0 text-white" />
            Same-week estimates · The price we quote is the price you pay
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            href="/contact"
            className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand shadow-lg shadow-brand-darker/30 hover:bg-ink-50"
          >
            Get a Free Estimate
          </Button>
          <Button
            href={company.phoneHref}
            className="gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/20"
          >
            <PhoneIcon className="size-5 shrink-0" />
            Call {company.phone}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  const year = 2026
  return (
    <footer className="bg-ink-950 text-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
        <CallToAction />

        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="lg:col-span-1">
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              {company.shortPitch}
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <Link href={company.phoneHref} className="flex items-center gap-3 text-white/80 hover:text-brand">
                <PhoneIcon className="size-4 shrink-0 text-brand" />
                {company.phone}
              </Link>
              <Link href={company.emailHref} className="flex items-center gap-3 text-white/80 hover:text-brand">
                <EnvelopeIcon className="size-4 shrink-0 text-brand" />
                {company.email}
              </Link>
              <div className="flex items-center gap-3 text-white/55">
                <ClockIcon className="size-4 shrink-0 text-brand" />
                {company.hours}
              </div>
              <div className="flex items-center gap-3 text-white/55">
                <MapPinIcon className="size-4 shrink-0 text-brand" />
                {company.baseCity}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/" className="text-white/70 hover:text-brand">Home</Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 hover:text-brand">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Service Areas</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
              {serviceAreas.map((area) => (
                <li key={area} className="text-white/70">{area}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-white/40">
              Don&apos;t see your city?{' '}
              <Link href="/contact" className="font-medium text-brand hover:underline">
                Ask us — we travel.
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {year} {company.name}. {company.license}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/50">
            <Link href={social.yelp} className="hover:text-brand">Yelp</Link>
            <Link href={social.facebook} className="hover:text-brand">Facebook</Link>
            <Link href={social.instagram} className="hover:text-brand">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
