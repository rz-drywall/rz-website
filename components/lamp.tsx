'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function LampEffect({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-end overflow-visible',
        className
      )}
    >
      {/* Main container for lamp effect */}
      <div className="relative flex w-full items-end justify-center">
        {/* Left beam - shining up and outward */}
        <motion.div
          initial={{ opacity: 0.5, width: '20rem' }}
          whileInView={{ opacity: 1, width: '50%' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute bottom-0 right-1/2 h-[20rem] w-1/2 bg-gradient-conic from-[#fff7ad] via-transparent to-transparent [--conic-position:from_70deg_at_center_bottom]"
        />

        {/* Right beam - shining up and outward */}
        <motion.div
          initial={{ opacity: 0.5, width: '20rem' }}
          whileInView={{ opacity: 1, width: '50%' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute bottom-0 left-1/2 h-[20rem] w-1/2 bg-gradient-conic from-transparent via-transparent to-[#fff7ad] [--conic-position:from_290deg_at_center_bottom]"
        />

        {/* Bright center glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[15rem] w-full bg-gradient-to-t from-[#fff7ad] via-[#fef08a]/50 to-transparent opacity-60 blur-2xl" />

        {/* The bright lamp bar/line - full width */}
        <motion.div
          initial={{ width: '30%' }}
          whileInView={{ width: '100%' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-full bg-[#fffbcc] shadow-[0_0_40px_15px_rgba(255,247,173,0.8)]"
        />

        {/* Glow orb at center bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-24 w-[60%] rounded-full bg-[#fff7ad] opacity-70 blur-3xl" />

        {/* Secondary wider glow for reflection effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full h-32 w-full rounded-full bg-[#fef08a] opacity-40 blur-3xl" />
      </div>
    </div>
  )
}
