'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'
import { gallery, type Photo } from '@/lib/images'
import { company, stats } from '@/lib/site'

import { Lightbox } from './_components/lightbox'

type FilterKey = 'all' | Photo['category']

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All work' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'work', label: 'In progress' },
]

const filterCounts: Record<FilterKey, number> = {
  all: gallery.length,
  residential: gallery.filter((p) => p.category === 'residential').length,
  commercial: gallery.filter((p) => p.category === 'commercial').length,
  work: gallery.filter((p) => p.category === 'work').length,
}

const projectsStat = stats.find((s) => s.label === 'Projects completed')
const yearsStat = stats.find((s) => s.label === 'Years in business')

const heroChips = [
  { label: 'Average rating', value: '5.0', stars: true },
  ...(projectsStat ? [{ label: 'Projects completed', value: `${projectsStat.value.toLocaleString()}+` }] : []),
  ...(yearsStat ? [{ label: 'Years in business', value: `${yearsStat.value}+` }] : []),
  { label: 'Coverage', value: company.license },
]

const categoryTag: Record<Photo['category'], string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  work: 'In progress',
}

export function GalleryClient() {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? gallery : gallery.filter((photo) => photo.category === filter)),
    [filter],
  )

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-ink-950 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]"
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Subheading rule dark>
              The Portfolio
            </Subheading>
            <Heading as="h1" dark className="mt-4">
              Our work speaks
              <span className="text-brand"> for itself.</span>
            </Heading>
            <Lead className="mt-6 text-white/85">
              {company.yearsExperience}+ years of flawless walls and clean finishes across {company.region}. Browse a
              selection of recent residential and commercial projects — and a few shots from the field.
            </Lead>
          </div>

          {/* Trust strip */}
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-4">
            {heroChips.map((chip) => (
              <div key={chip.label} className="bg-ink-950 px-5 py-4">
                <dt className="text-[0.7rem] font-medium tracking-wide text-ink-400 uppercase">{chip.label}</dt>
                <dd className="mt-1 flex items-center gap-1.5 text-lg font-semibold text-white">
                  {chip.stars && <StarIcon className="size-4 text-accent" />}
                  {chip.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ───────── Filter + grid ───────── */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          {/* Filter — segmented control */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex flex-wrap gap-1 rounded-full bg-ink-100 p-1 ring-1 ring-ink-950/5">
              {filters.map(({ key, label }) => {
                const isActive = filter === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    aria-pressed={isActive}
                    className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'text-white' : 'text-ink-500 hover:text-ink-900'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-brand shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                    <span
                      className={`relative z-10 rounded-full px-1.5 py-0.5 text-[0.7rem] font-bold tabular-nums ${
                        isActive ? 'bg-white/20 text-white' : 'bg-ink-200 text-ink-600'
                      }`}
                    >
                      {filterCounts[key]}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Result count */}
            <p className="shrink-0 text-sm font-semibold text-ink-500">
              <span className="text-ink-950 tabular-nums">{visible.length}</span>{' '}
              {visible.length === 1 ? 'project' : 'projects'} shown
            </p>
          </div>

          {/* Masonry grid */}
          {visible.length === 0 ? (
            <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-ink-900">No projects in this category yet.</p>
              <p className="mt-2 max-w-md text-ink-500">
                We are always adding new work. In the meantime, browse all of our projects or reach out about yours.
              </p>
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="mt-6 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
              >
                View all work
              </button>
            </div>
          ) : (
            <motion.div layout className="mt-9 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
              <AnimatePresence mode="popLayout">
                {visible.map((photo) => {
                  return (
                    <motion.button
                      key={photo.src}
                      type="button"
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setActiveIndex(visible.indexOf(photo))}
                      aria-label={`View larger: ${photo.caption ?? photo.alt}`}
                      className="group relative block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl bg-ink-100 text-left shadow-sm ring-1 ring-ink-950/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-ink-950/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={1600}
                        height={1067}
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        loading="lazy"
                        className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />

                      {/* Caption — persistent base gradient, deepens on hover */}
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/90 via-ink-950/35 to-transparent p-4 transition-all duration-300 group-hover:from-ink-950/95 sm:from-ink-950/0 sm:via-ink-950/0 sm:p-5 sm:opacity-0 sm:[background:linear-gradient(to_top,rgba(8,9,12,0.88),rgba(8,9,12,0.1),transparent)] sm:group-hover:opacity-100">
                        <span className="font-mono text-[0.65rem] font-semibold tracking-widest text-brand-light uppercase sm:text-[0.7rem]">
                          {categoryTag[photo.category]}
                        </span>
                        {photo.caption && (
                          <span className="mt-1 text-sm font-medium text-white sm:mt-1.5 sm:text-base">
                            {photo.caption}
                          </span>
                        )}
                      </figcaption>

                      {/* Corner indicator — faint persistent, lifts on hover */}
                      <span className="pointer-events-none absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full bg-brand text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-1 sm:opacity-80">
                        <ArrowUpRightIcon className="size-4" />
                      </span>
                    </motion.button>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </Container>
      </section>

      {/* ───────── Lightbox ───────── */}
      <Lightbox
        photos={visible}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  )
}
