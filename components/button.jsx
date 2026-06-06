'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Link } from './link'
import { forwardRef } from 'react'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-6 py-2.5',
    'rounded-full border border-transparent bg-gray-950',
    'text-sm font-medium whitespace-nowrap text-white',
    'transition-all duration-200',
    'data-disabled:bg-gray-950 data-disabled:opacity-40',
    'hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-950/25',
  ),
  secondary: clsx(
    'inline-flex items-center justify-center px-6 py-2.5',
    'rounded-full border border-gray-200 bg-white',
    'text-sm font-medium whitespace-nowrap text-gray-950',
    'transition-all duration-200',
    'data-disabled:opacity-40',
    'hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-6 py-2.5',
    'rounded-full border border-gray-300 bg-transparent',
    'text-sm font-medium whitespace-nowrap text-gray-950',
    'transition-all duration-200',
    'data-disabled:opacity-40',
    'hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg',
  ),
  ghost: clsx(
    'inline-flex items-center justify-center px-6 py-2.5',
    'rounded-full border border-transparent bg-transparent',
    'text-sm font-medium whitespace-nowrap text-gray-950',
    'transition-all duration-200',
    'data-disabled:opacity-40',
    'hover:bg-gray-100',
  ),
  // Secondary "Call …" treatment for dark heroes / CTA bands.
  // Pair with a leading <PhoneIcon className="size-4" /> in the label.
  call: clsx(
    'inline-flex items-center justify-center gap-2 px-7 py-3',
    'rounded-full border border-white/40 bg-white/5 backdrop-blur-sm',
    'text-sm font-semibold whitespace-nowrap text-white',
    'transition-all duration-200',
    'data-disabled:opacity-40',
    'hover:border-white/60 hover:bg-white/10',
  ),
}

// Squish animation on press
const buttonMotion = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 17
  }
}

// Motion-enabled Link component
const MotionLink = motion.create(
  forwardRef(function MotionLinkInner({ href, ...props }, ref) {
    return <Link ref={ref} href={href} {...props} />
  })
)

export function Button({ variant = 'primary', className = '', ...props }) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return (
      <motion.button
        {...buttonMotion}
        className={className}
        {...props}
      />
    )
  }

  // For links, wrap with motion for squish animation
  return (
    <MotionLink
      {...buttonMotion}
      className={className}
      {...props}
    />
  )
}
