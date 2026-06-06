'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars2Icon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { company, nav } from '@/lib/site'
import { Button } from './button'
import { Link } from './link'
import { Logo } from './logo'

function DesktopNav({ solid }) {
  return (
    <nav className="relative hidden items-center gap-8 lg:flex">
      <div className="flex items-center gap-8">
        {nav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`group relative text-[14px] font-medium tracking-[0.01em] transition-colors duration-200 ${
              solid ? 'text-ink-700 hover:text-ink-950' : 'text-white/85 hover:text-white'
            }`}
          >
            {label}
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
          </Link>
        ))}
      </div>

      <div className="ml-2 flex items-center gap-5">
        <Link
          href={company.phoneHref}
          className={`flex items-center gap-2 text-[14px] font-semibold transition-colors ${
            solid ? 'text-ink-950 hover:text-brand-dark' : 'text-white hover:text-brand-light'
          }`}
        >
          <PhoneIcon className="size-4 text-accent" />
          {company.phone}
        </Link>
        <Button
          href="/contact"
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30"
        >
          Free Estimate
        </Button>
      </div>
    </nav>
  )
}

function MobileNavButton({ open, solid }) {
  return (
    <DisclosureButton
      className={`flex size-12 items-center justify-center self-center rounded-lg lg:hidden ${
        solid ? 'text-ink-900' : 'text-white'
      }`}
      aria-label="Toggle menu"
    >
      {open ? <XMarkIcon className="size-6" /> : <Bars2Icon className="size-6" />}
    </DisclosureButton>
  )
}

function MobileNav() {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="mb-4 flex flex-col gap-1 rounded-2xl border border-ink-100 bg-white p-3 shadow-xl">
        {nav.map(({ href, label }, i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            <Link
              href={href}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink-700 hover:bg-ink-50"
            >
              {label}
            </Link>
          </motion.div>
        ))}
        <div className="my-2 border-t border-ink-100" />
        <Link
          href={company.phoneHref}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold text-ink-950"
        >
          <PhoneIcon className="size-5 text-accent" />
          {company.phone}
        </Link>
        <Link
          href="/contact"
          className="mt-1 block w-full rounded-full bg-brand px-8 py-3.5 text-center text-sm font-semibold text-white"
        >
          Free Estimate
        </Link>
      </div>
    </DisclosurePanel>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Disclosure
      as="header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-100 bg-white/85 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-ink-950/80 via-ink-950/40 to-transparent'
      }`}
    >
      {({ open }) => {
        const solid = scrolled || open
        return (
          <>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
              <Link href="/" title="RZ Drywall — Home">
                <Logo dark={!solid} />
              </Link>
              <DesktopNav solid={solid} />
              <MobileNavButton open={open} solid={solid} />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <MobileNav />
            </div>
          </>
        )
      }}
    </Disclosure>
  )
}
