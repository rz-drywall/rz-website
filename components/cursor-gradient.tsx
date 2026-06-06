'use client'

import React, { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

interface CursorGradientProps {
  children: React.ReactNode
  className?: string
  gradientSize?: number
  gradientOpacity?: number
}

export function CursorGradient({
  children,
  className = '',
  gradientSize = 600,
  gradientOpacity = 0.15
}: CursorGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useSpring(0, { stiffness: 200, damping: 30 })
  const mouseY = useSpring(0, { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cursor-following gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: gradientSize,
            height: gradientSize,
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            background: `radial-gradient(circle, rgba(168, 85, 247, ${gradientOpacity}) 0%, rgba(255, 169, 249, ${gradientOpacity * 0.6}) 40%, transparent 70%)`,
            filter: 'blur(40px)'
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
