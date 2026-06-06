'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLongRightIcon,
  ArrowRightIcon,
  PhoneIcon,
  StarIcon,
} from '@heroicons/react/24/solid'
import {
  BanknotesIcon,
  SparklesIcon,
  ClockIcon,
  ShieldCheckIcon,
  HomeModernIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { Link } from '@/components/link'
import { Heading, Subheading } from '@/components/text'
import { AnimatedNumber } from '@/components/animated-number'
import { TiltCard } from '@/components/tilt-card'

import {
  company,
  residentialServices,
  commercialServices,
  process,
  testimonials,
  stats,
  serviceAreas,
  type Service,
} from '@/lib/site'
import {
  heroImage,
  residentialImage,
  commercialImage,
  gallery,
} from '@/lib/images'

/* ---------------------------------- motion --------------------------------- */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

/* ----------------------------------- HERO ---------------------------------- */

function Hero() {
  return (
    <section className="relative -mt-[72px] flex min-h-[92vh] items-center overflow-hidden bg-ink-950 pt-[72px] text-white">
      <Image
        src={heroImage}
        alt="Freshly finished interior with flawless drywall"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      {/* layered charcoal gradients for legibility + drama */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40"
      />
      {/* amber glow accent */}
      <div
        aria-hidden
        className="absolute -bottom-32 -left-24 size-[28rem] rounded-full bg-brand/20 blur-[120px]"
      />

      <Container className="relative w-full">
        <div className="max-w-3xl py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-brand-light" />
            <span className="font-mono text-[11px] font-semibold tracking-widest text-white/80 uppercase">
              Est. {company.foundedYear} · {company.baseCity}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-5xl font-medium tracking-tighter text-balance sm:text-6xl lg:text-7xl"
          >
            Flawless walls.
            <br />
            <span className="text-brand-light">Honest work.</span>{' '}
            Lincoln built.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl"
          >
            {company.shortPitch}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              href="/contact"
              className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white hover:bg-brand-light hover:shadow-lg hover:shadow-brand/30"
            >
              Get a Free Estimate
            </Button>
            <Button variant="call" href={company.phoneHref} className="">
              <PhoneIcon className="size-4 shrink-0" />
              Call {company.phone}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/55"
          >
            <span className="font-semibold text-white/80">
              {company.yearsExperience}+ years
            </span>
            <span className="text-white/25">·</span>
            <span>{company.license}</span>
            <span className="text-white/25">·</span>
            <span>{company.region}</span>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/* --------------------------------- STATS BAR -------------------------------- */

function StatsBar() {
  return (
    <section className="border-t border-white/10 bg-ink-950 py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-baseline justify-center text-5xl font-medium tracking-tighter text-white lg:justify-start lg:text-6xl">
                {stat.prefix && (
                  <span className="text-brand-light">{stat.prefix}</span>
                )}
                <AnimatedNumber start={0} end={stat.value} decimals={0} />
                {stat.suffix && (
                  <span className="text-brand-light">{stat.suffix}</span>
                )}
              </div>
              <div className="mt-2 text-sm font-medium tracking-wide text-white/60 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------ SERVICES PATHWAYS --------------------------- */

function Pathway({
  image,
  alt,
  eyebrow,
  title,
  description,
  Icon,
}: {
  image: string
  alt: string
  eyebrow: string
  title: string
  description: string
  Icon: typeof HomeModernIcon
}) {
  return (
    <Link
      href="/services"
      className="group relative block overflow-hidden rounded-3xl bg-ink-950"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
        <div className="flex size-11 items-center justify-center rounded-xl bg-brand text-white">
          <Icon className="size-6" strokeWidth={1.8} />
        </div>
        <p className="mt-5 font-mono text-[11px] font-semibold tracking-widest text-brand-light uppercase">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-3xl font-medium tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-2 max-w-md text-white/70">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
          Explore services
          <ArrowLongRightIcon className="size-5 text-brand-light transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <TiltCard
      className="h-full rounded-2xl"
      tiltAmount={5}
      scale={1.01}
      shadowColor="rgba(11,12,14,0.12)"
    >
      <Link
        href="/services"
        className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7 transition-colors duration-300 hover:border-brand/40"
      >
        <h4 className="text-lg font-semibold tracking-tight text-ink-950">
          {service.title}
        </h4>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
          {service.blurb}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark">
          Learn more
          <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </TiltCard>
  )
}

function Services() {
  const cards = [...residentialServices, ...commercialServices]
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <motion.div {...fadeUp} className="max-w-2xl">
          <Subheading>What we do</Subheading>
          <Heading as="h2" className="mt-3 text-4xl! sm:text-5xl! lg:text-6xl!">
            Two sides of the trade, one standard of craft.
          </Heading>
          <p className="mt-5 text-lg text-ink-500">
            From a single patched ceiling to a full commercial build-out, every
            job gets the same meticulous finish.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <Pathway
              image={residentialImage}
              alt="Finished residential living space"
              eyebrow="Homeowners"
              title="Residential Drywall"
              description="Installation, repair, remodels, and texture matching that makes your home feel new again."
              Icon={HomeModernIcon}
            />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <Pathway
              image={commercialImage}
              alt="Finished commercial office interior"
              eyebrow="Businesses"
              title="Commercial Drywall"
              description="Tenant improvements, ceilings, and high-volume finishing delivered on schedule and to code."
              Icon={BuildingOffice2Icon}
            />
          </motion.div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (cards.length % 4) * 0.07 }}
          >
            <Link
              href="/services"
              className="group flex h-full flex-col justify-between rounded-2xl bg-brand p-7 text-white transition-colors duration-300 hover:bg-brand-light"
            >
              <h4 className="text-lg font-semibold tracking-tight text-balance">
                Every drywall service, one trusted crew.
              </h4>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                See all services
                <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/* ---------------------------------- WHY RZ ---------------------------------- */

const valueProps = [
  {
    Icon: BanknotesIcon,
    title: 'The price we quote is the price you pay',
    text: 'Clear written estimates with no surprise add-ons. What we shake hands on is what shows up on the invoice.',
  },
  {
    Icon: SparklesIcon,
    title: 'Meticulous finish & texture matching',
    text: 'Knockdown, orange peel, or Level 5 smooth — blended so seamlessly you cannot tell where the work was done.',
  },
  {
    Icon: ClockIcon,
    title: 'On time, clean job sites',
    text: 'We protect your space, show up when we say we will, and clean up like we were never there.',
  },
  {
    Icon: ShieldCheckIcon,
    title: `${company.yearsExperience}+ years, licensed & insured`,
    text: `Two decades of Lincoln-area craftsmanship behind every wall, fully licensed and insured for your peace of mind.`,
  },
]

function WhyRZ() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div
        aria-hidden
        className="absolute -right-32 top-0 size-96 rounded-full bg-brand/10 blur-[120px]"
      />
      <Container className="relative">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Subheading dark>Why RZ Drywall</Subheading>
          <Heading
            as="h2"
            dark
            className="mt-3 text-4xl! sm:text-5xl! lg:text-6xl!"
          >
            Built on craft, trust, and a clean handshake.
          </Heading>
        </motion.div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {valueProps.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group bg-ink-950 p-8 transition-colors duration-300 hover:bg-ink-900 sm:p-10"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-brand/15 text-brand-light transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <Icon className="size-6" strokeWidth={1.8} />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-white/70">{text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* --------------------------------- PROCESS ---------------------------------- */

function Process() {
  return (
    <section className="bg-ink-50 py-24 sm:py-32">
      <Container>
        <motion.div {...fadeUp} className="max-w-2xl">
          <Subheading>How it works</Subheading>
          <Heading as="h2" className="mt-3 text-4xl! sm:text-5xl! lg:text-6xl!">
            Four steps from quote to walkthrough.
          </Heading>
        </motion.div>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-5xl font-medium tracking-tighter text-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i < process.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-gradient-to-r from-ink-200 to-transparent lg:block"
                  />
                )}
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink-950">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------ GALLERY PREVIEW ----------------------------- */

function GalleryPreview() {
  const items = gallery.slice(0, 6)
  // editorial layout: vary spans for a masonry feel
  const spans = [
    'sm:col-span-2 sm:row-span-2',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-1 sm:row-span-1',
    'sm:col-span-2 sm:row-span-1',
  ]

  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <motion.div
          {...fadeUp}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <Subheading>Recent work</Subheading>
            <Heading
              as="h2"
              className="mt-3 text-4xl! sm:text-5xl! lg:text-6xl!"
            >
              Walls worth showing off.
            </Heading>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-950"
          >
            View full gallery
            <ArrowLongRightIcon className="size-5 text-brand-dark transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-3 lg:auto-rows-[230px]">
          {items.map((photo, i) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`group relative row-span-1 overflow-hidden rounded-2xl bg-ink-100 ${spans[i]}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
              {photo.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm font-semibold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                  {photo.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------- TESTIMONIALS ------------------------------- */

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div
        aria-hidden
        className="absolute -left-32 bottom-0 size-96 rounded-full bg-brand/10 blur-[120px]"
      />
      <Container className="relative">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Subheading dark>What clients say</Subheading>
          <Heading
            as="h2"
            dark
            className="mt-3 text-4xl! sm:text-5xl! lg:text-6xl!"
          >
            A reputation built one wall at a time.
          </Heading>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <StarIcon key={s} className="size-5 text-accent" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-white/85 text-pretty">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                  {t.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </span>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-white/60">{t.location}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------- SERVICE AREAS ------------------------------ */

function ServiceAreas() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div {...fadeUp}>
            <Subheading>Where we work</Subheading>
            <Heading
              as="h2"
              className="mt-3 text-4xl! sm:text-5xl! lg:text-6xl!"
            >
              Proudly serving the Lincoln area.
            </Heading>
            <p className="mt-5 text-lg text-ink-500">
              {company.region}. Do not see your town on the list? Reach out — we
              likely cover it.
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-light"
              >
                Check your area
              </Button>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="flex flex-wrap gap-3"
          >
            {serviceAreas.map((area) => {
              const isBase = area === company.baseCity.split(',')[0]
              return (
                <span
                  key={area}
                  className={
                    isBase
                      ? 'inline-flex items-center gap-2 rounded-full border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-white'
                      : 'rounded-full border border-ink-200 bg-ink-50 px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors duration-200 hover:border-brand/50 hover:bg-brand/5 hover:text-ink-950'
                  }
                >
                  {isBase && (
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-white"
                    />
                  )}
                  {area}
                </span>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/* ----------------------------------- PAGE ----------------------------------- */

export function HomeClient() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <StatsBar />
        <Services />
        <WhyRZ />
        <Process />
        <GalleryPreview />
        <Testimonials />
        <ServiceAreas />
      </main>
      <Footer />
    </>
  )
}
