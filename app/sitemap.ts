import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.rzdrywall.online'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: '2026-06-01', changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: '2026-06-01', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: '2026-06-01', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: '2026-06-01', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: '2026-06-01', changeFrequency: 'monthly', priority: 0.8 },
  ]
}
