'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * RZ Drywall logo — renders the real brand mark (/public/logo.png).
 * Transparent corners, so it sits on both light and dark backgrounds.
 * `dark` adds a subtle glow for extra legibility on dark surfaces.
 */
export function Logo({
  dark = false,
  className,
}: {
  dark?: boolean
  className?: string
}) {
  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={clsx(className, 'inline-flex select-none items-center')}
    >
      <Image
        src="/logo.png"
        alt="RZ Drywall LLC"
        width={707}
        height={647}
        priority
        className={clsx(
          'h-11 w-auto',
          dark && 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]',
        )}
      />
    </motion.span>
  )
}
