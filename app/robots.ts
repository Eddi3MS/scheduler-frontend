import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/register', '/login', '/'],
        disallow: ['/admin/', '/provider/', '/user/'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/sitemap.xml`,
  }
}
