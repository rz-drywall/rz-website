'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'
import {
  HomeModernIcon,
  BuildingOffice2Icon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { Heading, Subheading, Lead } from '@/components/text'
import {
  company,
  residentialServices,
  commercialServices,
  specialties,
  process,
  type Service,
  type Step,
} from '@/lib/site'
import { commercialImage, residentialImage, workImages } from '@/lib/images'

const EASE = [0.22, 1, 0.36, 1] as const

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay, ease: EASE },
  }
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      {/* Accent image */}
      <div className="absolute inset-0">
        <Image
          src={workImages.taping}
          alt="RZ Drywall crew taping and finishing a wall"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/55 to-transparent" />
      </div>

      {/* Brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand/25 blur-[120px]"
      />

      <Container className="relative">
        <div className="max-w-3xl py-28 sm:py-36 lg:py-44">
          <motion.div {...fadeUp(0)}>
            <Subheading rule dark>
              What we build
            </Subheading>
          </motion.div>
          <motion.div {...fadeUp(0.08)}>
            <Heading as="h1" dark className="mt-4">
              Drywall services,
              <span className="mt-1 block text-brand-light">
                done{' '}
                <span className="relative inline-block">
                  right.
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-accent"
                  />
                </span>
              </span>
            </Heading>
          </motion.div>
          <motion.div {...fadeUp(0.16)}>
            <Lead className="mt-6 max-w-[60ch] text-white/85">
              Residential and commercial drywall for the Lincoln area —
              installed, repaired, textured, and finished by a crew that has been
              doing it for {company.yearsExperience}+ years.{' '}
              <span className="font-semibold text-white">
                The price we quote is the price you pay.
              </span>
            </Lead>
          </motion.div>
          <motion.div
            {...fadeUp(0.24)}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              href="/contact"
              className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-light"
            >
              Get a Free Estimate
            </Button>
            <Button variant="call" href={company.phoneHref} className="">
              <PhoneIcon className="size-4 shrink-0" />
              Call {company.phone}
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            {...fadeUp(0.32)}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/80"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="size-4 text-accent" />
                ))}
              </span>
              <span className="font-semibold text-white">5.0</span>
              rating
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1.5">
              <span className="font-semibold text-white">
                {company.yearsExperience} yrs
              </span>
              in business
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheckIcon className="size-4 text-brand-light" />
              Licensed &amp; insured
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="size-4 text-brand-light" />
              Lincoln &amp; Lancaster County
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Service card                                                               */
/* -------------------------------------------------------------------------- */

function ServiceCard({
  service,
  index,
  dark = false,
}: {
  service: Service
  index: number
  dark?: boolean
}) {
  const Icon = dark ? BuildingOffice2Icon : HomeModernIcon
  const [open, setOpen] = useState(false)
  return (
    <motion.article
      {...fadeUp((index % 2) * 0.08)}
      className={
        dark
          ? 'group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-brand/40 hover:bg-white/[0.05]'
          : 'group relative flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-ink-950/5'
      }
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className={
            dark
              ? 'flex size-11 flex-none items-center justify-center rounded-2xl bg-brand/20'
              : 'flex size-11 flex-none items-center justify-center rounded-2xl bg-brand/10'
          }
        >
          <Icon
            className={dark ? 'size-5 text-brand-light' : 'size-5 text-brand-dark'}
          />
        </span>
        <h3
          className={
            dark
              ? 'text-2xl font-medium tracking-tight text-white'
              : 'text-2xl font-medium tracking-tight text-ink-950'
          }
        >
          {service.title}
        </h3>
      </div>

      <p className={dark ? 'mt-4 text-ink-200' : 'mt-4 text-ink-500'}>
        {service.blurb}
      </p>

      {/* Detail list — collapsed behind a tap on mobile, always shown on sm+ */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={
            dark
              ? 'flex w-full items-center justify-between border-t border-white/10 pt-6 text-sm font-semibold text-brand-light sm:hidden'
              : 'flex w-full items-center justify-between border-t border-ink-100 pt-6 text-sm font-semibold text-brand-dark sm:hidden'
          }
        >
          What&rsquo;s included
          <ArrowRightIcon
            className={`size-4 transition-transform ${open ? 'rotate-90' : ''}`}
          />
        </button>
        <ul
          className={
            (open ? 'block ' : 'hidden ') +
            (dark
              ? 'mt-4 space-y-3 sm:mt-0 sm:block sm:border-t sm:border-white/10 sm:pt-6'
              : 'mt-4 space-y-3 sm:mt-0 sm:block sm:border-t sm:border-ink-100 sm:pt-6')
          }
        >
          {service.details.map((detail) => (
            <li key={detail} className="flex items-start gap-3">
              <span
                className={
                  dark
                    ? 'mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand/25'
                    : 'mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand/15'
                }
              >
                <CheckIcon
                  className={
                    dark
                      ? 'h-3.5 w-3.5 text-brand-light'
                      : 'h-3.5 w-3.5 text-brand-dark'
                  }
                />
              </span>
              <span
                className={
                  dark
                    ? 'text-sm leading-relaxed text-ink-200'
                    : 'text-sm leading-relaxed text-ink-700'
                }
              >
                {detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

/* -------------------------------------------------------------------------- */
/* Residential                                                                */
/* -------------------------------------------------------------------------- */

function Residential() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        {/* Feature row */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-ink-600 uppercase">
              <HomeModernIcon className="h-4 w-4 text-brand-dark" />
              Residential
            </span>
            <Heading as="h2" className="mt-6 !text-4xl sm:!text-5xl lg:!text-6xl">
              For the home you live in
            </Heading>
            <Lead className="mt-6 max-w-[60ch]">
              From a single patch to a whole-home refinish, we treat your house
              like our own — clean job sites, seamless texture matching, and a
              finish that is ready for paint and built to last.
            </Lead>
            <div className="mt-8">
              <Button
                href="/contact"
                className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-light"
              >
                Request a residential quote
              </Button>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.12)}
            className="relative"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl shadow-ink-950/10">
              <Image
                src={residentialImage}
                alt="Freshly finished residential living space by RZ Drywall"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-ink-950 px-6 py-5 text-white shadow-2xl sm:block">
              <p className="font-mono text-xs tracking-widest text-brand uppercase">
                Texture
              </p>
              <p className="mt-1 text-lg font-medium">Matched, not guessed</p>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {residentialServices.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Commercial (dark band)                                                     */
/* -------------------------------------------------------------------------- */

function Commercial() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            {...fadeUp(0.12)}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl ring-1 ring-white/10">
              <Image
                src={commercialImage}
                alt="Finished commercial office interior by RZ Drywall"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl sm:block">
              <div className="relative h-28 w-40">
                <Image
                  src={workImages.ceiling}
                  alt="Hard-lid ceiling drywall installation"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0)} className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-ink-200 uppercase ring-1 ring-white/10">
              <BuildingOffice2Icon className="h-4 w-4 text-brand" />
              Commercial
            </span>
            <Heading as="h2" dark className="mt-6 !text-4xl sm:!text-5xl lg:!text-6xl">
              For the spaces you run
            </Heading>
            <Lead className="mt-6 max-w-[60ch] text-ink-200">
              Tenant improvements, build-outs, and finishing crews that keep your
              project on schedule. We work to plan, code, and inspection — and we
              turn it over ready for paint, on time.
            </Lead>
            <div className="mt-8">
              <Button
                href="/contact"
                className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-light"
              >
                Discuss your project
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commercialServices.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} dark />
          ))}
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Specialties                                                                */
/* -------------------------------------------------------------------------- */

function Specialties() {
  return (
    <section className="bg-ink-50 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp(0)}>
            <Subheading>Where we go deep</Subheading>
            <Heading as="h2" className="mt-4 !text-4xl sm:!text-5xl">
              Specialties
            </Heading>
            <Lead className="mx-auto mt-6 max-w-[58ch]">
              The tricky work other contractors avoid is the work we are known
              for. If it has to blend in perfectly, this is the list.
            </Lead>
          </motion.div>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp((i % 3) * 0.06)}
              className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/[0.03] hover:shadow-md hover:shadow-ink-950/5"
            >
              <span className="flex size-9 flex-none items-center justify-center rounded-xl bg-brand/10 font-mono text-sm font-bold text-brand-dark transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-base font-medium tracking-tight text-ink-900">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Process                                                                    */
/* -------------------------------------------------------------------------- */

function ProcessStep({ step, index }: { step: Step; index: number }) {
  return (
    <motion.li {...fadeUp(index * 0.06)} className="relative pl-16">
      {/* Number node */}
      <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand font-mono text-base font-bold text-white shadow-lg shadow-brand/20">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="text-xl font-medium tracking-tight text-ink-950">
        {step.title}
      </h3>
      <p className="mt-2 leading-relaxed text-ink-500">{step.description}</p>
    </motion.li>
  )
}

function Process() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <motion.div {...fadeUp(0)} className="lg:sticky lg:top-28">
              <Subheading>How it goes</Subheading>
              <Heading as="h2" className="mt-4 !text-4xl sm:!text-5xl">
                A clean, predictable process
              </Heading>
              <Lead className="mt-6 max-w-[52ch]">
                No mystery, no moving targets. Four steps from first call to
                final walkthrough — the same way for every job.
              </Lead>
              <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50 px-5 py-4">
                <span className="font-mono text-3xl font-bold tracking-tight text-brand">
                  {company.yearsExperience}+
                </span>
                <span className="text-sm leading-snug text-ink-600">
                  years refining the
                  <br className="hidden sm:block" /> same dependable process
                </span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <ol className="relative space-y-12 before:absolute before:left-6 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-ink-100">
              {process.map((step, i) => (
                <ProcessStep key={step.title} step={step} index={i} />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Mid-page CTA band                                                          */
/* -------------------------------------------------------------------------- */

function CtaBand() {
  return (
    <section className="bg-white pb-24 sm:pb-32">
      <Container>
        <motion.div
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-3xl border border-ink-100 bg-ink-50 px-8 py-14 sm:px-12 sm:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
                <span className="size-1.5 rounded-full bg-accent" />
                Free, no-pressure estimate
              </p>
              <h2 className="mt-3 text-4xl font-medium tracking-tighter text-ink-950 sm:text-5xl">
                Tell us about your project
              </h2>
              <p className="mt-4 max-w-[60ch] text-lg text-ink-600">
                Residential or commercial — we come out, measure, and quote it
                straight. The price we quote is the price you pay.
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-700">
                <span className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} className="size-4 text-accent" />
                  ))}
                </span>
                Rated 5.0 · {company.yearsExperience} yrs · Licensed &amp; insured
              </p>
            </div>
            <div className="flex flex-none flex-col gap-3 sm:flex-row lg:flex-col">
              <Button
                href="/contact"
                className="group rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-light"
              >
                Get a Free Estimate
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                href={company.phoneHref}
                variant="outline"
                className="gap-2 border-ink-200 text-ink-950 hover:border-ink-300 hover:bg-white"
              >
                <PhoneIcon className="size-4 shrink-0" />
                {company.phone}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export function ServicesClient() {
  return (
    <>
      <Hero />
      <Residential />
      <Commercial />
      <Specialties />
      <Process />
      <CtaBand />
    </>
  )
}
