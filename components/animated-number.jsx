'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function usePrefersReducedMotion() {
  let [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    let mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    let onChange = (e) => setReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function AnimatedNumber({ start, end, decimals = 0 }) {
  let ref = useRef(null)
  let isInView = useInView(ref, { once: true, amount: 0.5 })
  let prefersReducedMotion = usePrefersReducedMotion()

  // Track when the spring has settled so we can render the exact target,
  // avoiding a mid-animation frame that reads e.g. "1,996" for a 2,000 target.
  let [settled, setSettled] = useState(false)

  let value = useMotionValue(start)
  let spring = useSpring(value, { damping: 30, stiffness: 100 })

  let format = (num) =>
    num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

  let display = useTransform(spring, format)

  useEffect(() => {
    let factor = Math.pow(10, decimals)
    let round = (n) => Math.round(n * factor) / factor

    if (prefersReducedMotion) {
      // Snap straight to the target, no animation.
      spring.jump(end)
      setSettled(true)
      return
    }

    if (!isInView) return

    setSettled(false)
    value.set(end)

    // Land exactly on the rounded target once the spring is close enough.
    let unsubscribe = spring.on('change', (latest) => {
      if (round(latest) === round(end)) {
        spring.jump(end)
        setSettled(true)
      }
    })
    return () => unsubscribe()
  }, [start, end, decimals, isInView, prefersReducedMotion, value, spring])

  return (
    <motion.span ref={ref}>
      {settled ? format(end) : <motion.span>{display}</motion.span>}
    </motion.span>
  )
}
