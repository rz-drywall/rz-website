/**
 * RZ Drywall — image manifest.
 * Local royalty-free stock placeholders in /public/photos.
 * Swap the files (keep the names) to drop in real RZ project photos later.
 */

export type Photo = {
  src: string
  alt: string
  category: 'residential' | 'commercial' | 'work'
  caption?: string
}

const p = (name: string) => `/photos/${name}.jpg`

export const heroImage = p('hero-living')
export const heroJobsite = p('hero-jobsite')

export const residentialImage = p('res-interior-1')
export const commercialImage = p('com-office-1')
export const aboutImage = p('work-crew')
export const ctaImage = p('arch-1')

/** Curated gallery — used by the Gallery page and home showcase. */
export const gallery: Photo[] = [
  { src: p('res-interior-1'), alt: 'Freshly finished residential living space', category: 'residential', caption: 'Living room remodel — Lincoln' },
  { src: p('res-kitchen'), alt: 'Open-plan kitchen with smooth drywall finish', category: 'residential', caption: 'Kitchen addition — Waverly' },
  { src: p('res-living'), alt: 'Bright living room with flawless walls', category: 'residential', caption: 'Finished basement — Hickman' },
  { src: p('res-interior-2'), alt: 'Modern interior with clean ceilings', category: 'residential', caption: 'Ceiling repair & texture — Seward' },
  { src: p('res-bright'), alt: 'Sunlit room with smooth Level 5 walls', category: 'residential', caption: 'Level 5 smooth finish — Eagle' },
  { src: p('com-office-1'), alt: 'Finished commercial office interior', category: 'commercial', caption: 'Office tenant improvement — Lincoln' },
  { src: p('com-office-2'), alt: 'Open commercial workspace', category: 'commercial', caption: 'Retail build-out — Omaha' },
  { src: p('com-buildout'), alt: 'Commercial space under build-out', category: 'commercial', caption: 'Suite build-out — Gretna' },
  { src: p('work-taping'), alt: 'Drywall taping and mudding in progress', category: 'work', caption: 'Taping & mudding' },
  { src: p('work-ceiling'), alt: 'Ceiling drywall installation', category: 'work', caption: 'Hard-lid ceiling install' },
  { src: p('work-frame'), alt: 'Framing and drywall hanging', category: 'work', caption: 'Hanging board — new addition' },
  { src: p('work-detail'), alt: 'Detailed finishing work on a wall corner', category: 'work', caption: 'Corner & detail finishing' },
]

export const workImages = {
  taping: p('work-taping'),
  crew: p('work-crew'),
  tools: p('work-tools'),
  wall: p('work-wall'),
  engineer: p('work-engineer'),
  frame: p('work-frame'),
  ceiling: p('work-ceiling'),
  detail: p('work-detail'),
  paint: p('work-paint'),
  measure: p('work-measure'),
}
