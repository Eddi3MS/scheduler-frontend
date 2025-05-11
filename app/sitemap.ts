import type { MetadataRoute } from 'next'

const hostUrl = process.env.NEXT_PUBLIC_SITE_DOMAIN!

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: hostUrl,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 1,
    },
    {
      url: `${hostUrl}/register`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 0.8,
    },
  ]
}
