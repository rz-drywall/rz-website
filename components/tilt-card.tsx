'use client'

import React, { useRef, useState } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  glareOpacity?: number
  scale?: number
  shadowColor?: string
}

export function TiltCard({
  children,
  className = '',
  tiltAmount = 8,
  glareOpacity = 0.1,
  scale = 1.02,
  shadowColor = 'rgba(0, 0, 0, 0.1)'
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useSpring(0, { stiffness: 400, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 400, damping: 30 })
  const shadowX = useMotionValue(0)
  const shadowY = useMotionValue(4)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateXValue = (mouseY / (rect.height / 2)) * -tiltAmount
    const rotateYValue = (mouseX / (rect.width / 2)) * tiltAmount

    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)

    // Dynamic shadow based on tilt
    shadowX.set(rotateYValue * -0.5)
    shadowY.set(4 + Math.abs(rotateXValue) * 0.3)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    shadowX.set(0)
    shadowY.set(4)
  }

  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([x, y]) => `${x}px ${y}px 20px ${shadowColor}`
  )

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        className={`relative ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          boxShadow,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Subtle glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,${glareOpacity}) 0%, transparent 50%, transparent 100%)`,
            }}
          />
        </motion.div>

        {/* Content */}
        {children}
      </motion.div>
    </div>
  )
}
