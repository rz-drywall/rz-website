import type { MetadataRoute } from 'next'

// Policy: allow crawlers that surface content with attribution (driving
// referral traffic via answer engines and AI search) while blocking
// pure-training crawlers that don't return traffic.

const AI_ANSWER_ENGINES = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'YouBot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'cohere-ai',
]

const BLOCKED_BOTS = [
  // AI training-only crawlers
  'GPTBot',
  'anthropic-ai',
  'Bytespider',
  'AI2Bot',
  'AI2Bot-Dolma',
  'Diffbot',
  'FacebookBot',
  'ImagesiftBot',
  'img2dataset',
  'Omgilibot',
  'Omgili',
  'ICC-Crawler',
  // SEO tool crawlers
  'SemrushBot',
  'SemrushBot-OCOB',
  'AhrefsBot',
  'MJ12bot',
  'DotBot',
  'Rogerbot',
  'PetalBot',
  'DataForSeoBot',
  // Misc bad bots
  'MegaIndex.ru',
  'BLEXBot',
  'VelenPublicWebCrawler',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: AI_ANSWER_ENGINES, allow: '/' },
      { userAgent: BLOCKED_BOTS, disallow: '/' },
    ],
    sitemap: 'https://www.rzdrywall.online/sitemap.xml',
    host: 'https://www.rzdrywall.online',
  }
}
