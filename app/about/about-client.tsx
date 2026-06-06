'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  SwatchIcon,
  HomeModernIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

import { AnimatedNumber } from '@/components/animated-number'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'
import { aboutImage, workImages } from '@/lib/images'
import {
  company,
  serviceAreas,
  stats,
  testimonials,
} from '@/lib/site'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

const values = [
  {
    icon: SparklesIcon,
    title: 'Top-Notch Craftsmanship',
    body: 'We treat every wall and ceiling like it is going in our own home — straight lines, seamless seams, and a finish that disappears into the room.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Honest, Transparent Pricing',
    body: 'You get a clear written quote up front. The price we quote is the price you pay — no surprise add-ons, no creeping change orders.',
  },
  {
    icon: ClockIcon,
    title: 'Reliable & Punctual',
    body: 'We show up when we say we will and keep your project moving. Communication stays clear from the first call to the final walkthrough.',
  },
  {
    icon: SwatchIcon,
    title: 'Clean Worksites',
    body: 'We protect your space, contain the dust, and clean up like we were never there. Meticulous on the wall and on the floor.',
  },
]

const homeownerPoints = [
  'Repairs and textures matched so closely you cannot find the seam',
  'Respect for your home — floors protected, dust contained, daily cleanup',
  'Friendly, straight answers from the people actually doing the work',
  'Free, no-pressure estimates with a price you can count on',
]

const businessPoints = [
  'Crews sized to hit your schedule and turnover dates',
  'Tenant build-outs, demising walls, and Level 5 finishing to spec',
  'Built to plan, code, and inspection the first time',
  'A dependable subcontractor your GC and trades can plan around',
]

export function AboutClient() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0">
          <Image
            src={aboutImage}
            alt="RZ Drywall crew finishing a jobsite"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/45" />
        </div>

        <Container className="relative pt-36 pb-24 sm:pt-44 sm:pb-32">
          <motion.div {...fadeUp} className="max-w-3xl">
            <Subheading dark>About {company.name}</Subheading>
            <Heading
              as="h1"
              dark
              className="mt-4 text-4xl text-balance sm:text-6xl"
            >
              Flawless walls. Honest work.{' '}
              <span className="text-brand-light">Lincoln built.</span>
            </Heading>
            <Lead className="mt-6 text-white/85">{company.shortPitch}</Lead>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                href="/contact"
                className="rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-white hover:bg-brand-light"
              >
                Get a free estimate
              </Button>
              <Button
                href={company.phoneHref}
                className="gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/10"
              >
                <PhoneIcon className="size-4 shrink-0" />
                Call {company.phone}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 2. OUR STORY */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div {...fadeUp}>
              <Subheading>Our story</Subheading>
              <Heading as="h2" className="mt-4 text-balance">
                {company.yearsExperience}+ years of building Lincoln, wall by wall.
              </Heading>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink-700">
                <p>
                  {company.name} got its start in {company.foundedYear} with a simple idea:
                  do the work right, treat people fairly, and let the finished walls speak for
                  themselves. More than two decades later, that family-run mindset still shapes
                  every job we touch across {company.region}.
                </p>
                <p>
                  We are drywall specialists, not generalists. From a single bedroom patch to a
                  full commercial build-out, our crews bring the same meticulous attention to
                  detail — hanging clean, taping tight, and texturing to match so the repair
                  vanishes into the room. It is the kind of craftsmanship that only comes from
                  doing one thing, well, for {company.yearsExperience} years.
                </p>
                <p>
                  What keeps homeowners and businesses calling us back is the combination of
                  top-notch craftsmanship and exceptional service. We quote honestly, show up
                  on time, keep your space clean, and stay until you are genuinely happy.
                  Surpassing customer expectations is not a slogan here — it is how we have
                  grown, one referral at a time.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="relative"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-xl shadow-ink-950/10">
                <Image
                  src={workImages.crew}
                  alt="RZ Drywall craftsmen at work on a jobsite"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-brand px-7 py-5 shadow-lg shadow-brand/30 sm:block">
                <p className="text-3xl font-semibold tracking-tight text-white">
                  Est. {company.foundedYear}
                </p>
                <p className="mt-1 text-sm font-medium text-white/80">
                  Family-run &amp; locally rooted
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. STATS */}
      <section className="bg-ink-950 py-20 sm:py-24">
        <Container>
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <Subheading dark>By the numbers</Subheading>
            <Heading as="h2" dark className="mt-4 text-balance">
              Two decades of proof.
            </Heading>
          </motion.div>

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink-800/60 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="bg-ink-950 px-6 py-10 text-center"
              >
                <dt className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  {stat.prefix}
                  <AnimatedNumber
                    start={0}
                    end={stat.value}
                    decimals={stat.suffix === '.0' ? 1 : 0}
                  />
                  {stat.suffix !== '.0' ? (
                    <span className="text-brand">{stat.suffix}</span>
                  ) : null}
                </dt>
                <dd className="mt-3 text-sm font-medium tracking-wide text-ink-400 uppercase">
                  {stat.label}
                </dd>
              </motion.div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 4. VALUES */}
      <section className="bg-ink-50 py-24 sm:py-32">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl">
            <Subheading>What we stand for</Subheading>
            <Heading as="h2" className="mt-4 text-balance">
              The standards behind every finish.
            </Heading>
            <Lead className="mt-6">
              The details you do not see are the ones that make the wall look effortless. These
              are the principles our crews carry onto every jobsite.
            </Lead>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="group flex flex-col rounded-3xl border border-ink-200/70 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-ink-950/5"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/15 text-brand-dark transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <value.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-950">{value.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{value.body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. WHY HOMEOWNERS & BUSINESSES CHOOSE US */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <Subheading>Why people choose us</Subheading>
            <Heading as="h2" className="mt-4 text-balance">
              One crew. Two kinds of clients. Zero compromises.
            </Heading>
          </motion.div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <motion.div
              {...fadeUp}
              className="flex flex-col rounded-3xl border border-ink-200/70 bg-ink-50 p-8 sm:p-10"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-ink-950 text-brand-light">
                <HomeModernIcon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink-950">
                Homeowners
              </h3>
              <p className="mt-3 text-ink-600">
                Your home is personal. We treat it that way — careful, clean, and finished to
                a standard you will be proud of for years.
              </p>
              <ul className="mt-6 space-y-3">
                {homeownerPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-ink-700">
                    <CheckCircleIcon
                      className="mt-0.5 size-5 shrink-0 text-brand-dark"
                      aria-hidden="true"
                    />
                    <span className="text-[15px] leading-relaxed sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="flex flex-col rounded-3xl bg-ink-950 p-8 sm:p-10"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand text-white">
                <BuildingOffice2Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                Businesses
              </h3>
              <p className="mt-3 text-ink-300">
                Commercial work runs on schedule and spec. We bring the crew size, the
                finishing chops, and the dependability to keep your project on track.
              </p>
              <ul className="mt-6 space-y-3">
                {businessPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-ink-200">
                    <CheckCircleIcon
                      className="mt-0.5 size-5 shrink-0 text-brand-light"
                      aria-hidden="true"
                    />
                    <span className="text-[15px] leading-relaxed sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-ink-50 py-24 sm:py-32">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl">
            <Subheading>In their words</Subheading>
            <Heading as="h2" className="mt-4 text-balance">
              The walls speak. So do our clients.
            </Heading>
          </motion.div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="flex flex-col rounded-3xl border border-ink-200/70 bg-white p-8 shadow-sm"
              >
                <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <StarIcon key={s} className="size-5 text-accent" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-ink-800">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-200/70 pt-5">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand-dark"
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <p className="font-semibold text-ink-950">{t.name}</p>
                    <p className="text-sm text-ink-600">{t.location}</p>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. SERVICE AREAS */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <motion.div {...fadeUp}>
              <Subheading>Where we work</Subheading>
              <Heading as="h2" className="mt-4 text-balance">
                Proudly serving {company.region}.
              </Heading>
              <Lead className="mt-6">
                Based in {company.baseCity}, our crews cover the city, the surrounding
                Lancaster County towns, and the communities out toward Omaha. Do not see your
                town? Reach out — chances are good we can help.
              </Lead>
              <Button
                href="/contact"
                className="mt-8 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-light"
              >
                Ask about your area
              </Button>
            </motion.div>

            <motion.ul
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="grid grid-cols-2 gap-3 self-center sm:grid-cols-3"
            >
              {serviceAreas.map((area) => {
                const isHome = area.startsWith('Lincoln')
                return (
                  <li
                    key={area}
                    className={
                      isHome
                        ? 'flex items-center gap-2.5 rounded-2xl border border-brand bg-brand px-4 py-3.5 text-sm font-semibold text-white'
                        : 'flex items-center gap-2.5 rounded-2xl border border-ink-200/70 bg-ink-50 px-4 py-3.5 text-sm font-medium text-ink-800'
                    }
                  >
                    <MapPinIcon
                      className={
                        isHome
                          ? 'size-4 shrink-0 text-white'
                          : 'size-4 shrink-0 text-brand-dark'
                      }
                      aria-hidden="true"
                    />
                    {area}
                  </li>
                )
              })}
            </motion.ul>
          </div>
        </Container>
      </section>

    </>
  )
}
