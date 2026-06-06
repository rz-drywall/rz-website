'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Star {
  id: number
  x: number
  y: number
  angle: number
  delay: number
  duration: number
}

export function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate random shooting stars
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 8; i++) {
        // Angles between 30 and 150 degrees (pointing generally downward toward globe)
        const angle = 30 + Math.random() * 120
        newStars.push({
          id: i,
          x: Math.random() * 100, // Random X position (%)
          y: Math.random() * 50, // Start in upper half (0-50%)
          angle: angle,
          delay: Math.random() * 8, // Random delay (0-8s)
          duration: 3 + Math.random() * 2, // Random duration (3-5s)
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {stars.map((star) => {
        // Calculate movement toward the globe (downward)
        const distance = 300
        const radians = (star.angle * Math.PI) / 180
        const xMovement = Math.cos(radians) * distance
        const yMovement = Math.sin(radians) * distance

        // Rotate the meteor perpendicular to direction of travel and flip it
        const visualAngle = star.angle - 90 + 180

        return (
          <motion.div
            key={star.id}
            className="absolute w-[2px] h-24 bg-gradient-to-t from-transparent via-white/50 to-white shadow-lg shadow-white/50"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              rotate: `${visualAngle}deg`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, xMovement],
              y: [0, yMovement],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 5 + Math.random() * 5, // Random pause between repeats (5-10s)
              ease: 'linear',
            }}
          />
        )
      })}
    </div>
  )
}
