'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'

import type { Photo } from '@/lib/images'

const categoryLabel: Record<Photo['category'], string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  work: 'Work in progress',
}

type LightboxProps = {
  photos: Photo[]
  index: number | null
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null
  const total = photos.length

  const goPrev = useCallback(() => {
    if (index === null) return
    onNavigate((index - 1 + total) % total)
  }, [index, total, onNavigate])

  const goNext = useCallback(() => {
    if (index === null) return
    onNavigate((index + 1) % total)
  }, [index, total, onNavigate])

  useEffect(() => {
    if (!isOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, goPrev, goNext])

  const photo = index !== null ? photos[index] : null

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-ink-950/95 backdrop-blur-sm transition-opacity duration-300 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <span className="font-mono text-xs font-semibold tracking-widest text-ink-200 uppercase">
            {photo ? (
              <>
                <span className="text-brand-light">{categoryLabel[photo.category]}</span>
                {` · ${(index ?? 0) + 1} / ${total}`}
              </>
            ) : (
              ''
            )}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery viewer"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-brand/60 hover:text-brand-light"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>

        {/* Stage */}
        <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
          {/* Prev */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-brand/60 hover:text-brand-light sm:left-6 sm:size-14"
          >
            <ChevronLeftIcon className="size-6 sm:size-7" />
          </button>

          <DialogPanel className="flex w-full max-w-5xl flex-col items-center">
            <AnimatePresence mode="wait">
              {photo && (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1600}
                    height={1067}
                    sizes="(min-width: 1024px) 64rem, 100vw"
                    priority
                    className="h-auto max-h-[72vh] w-full object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {photo?.caption && (
              <motion.p
                key={`${photo.src}-caption`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="mt-5 text-center text-base font-medium text-white sm:text-lg"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand align-middle" />
                {photo.caption}
              </motion.p>
            )}
          </DialogPanel>

          {/* Next */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-brand/60 hover:text-brand-light sm:right-6 sm:size-14"
          >
            <ChevronRightIcon className="size-6 sm:size-7" />
          </button>
        </div>
      </div>
    </Dialog>
  )
}
