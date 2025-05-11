import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sua Marca',
    short_name: 'SM',
    description: 'App de agendamentos flexível',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/logo-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
