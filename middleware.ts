import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

const authRoutes = ['/', '/register']

const publicRoutes = [...authRoutes, '/not-allowed']

const providerRouterPrefix = '/provider'

const adminRouterPrefix = '/admin'

const userRouterPrefix = '/user'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')

  const isPublicRoute = publicRoutes.includes(pathname)
  const res = NextResponse.next()

  if (!isPublicRoute && !token) {
    const newUrl = new URL('/not-allowed', request.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  if (token) {
    try {
      const parsed = await verifyToken(token.value)

      if (!parsed) {
        const newUrl = new URL('/not-allowed', request.nextUrl.origin)
        return NextResponse.redirect(newUrl)
      }

      if (authRoutes.includes(pathname)) {
        const route =
          parsed.role === 'admin'
            ? '/admin'
            : parsed.role === 'provider'
            ? '/provider'
            : '/user'
        return NextResponse.redirect(new URL(route, request.url))
      }

      if (
        (pathname.startsWith(adminRouterPrefix) && parsed.role !== 'admin') ||
        (pathname.startsWith(providerRouterPrefix) &&
          parsed.role !== 'provider') ||
        (pathname.startsWith(userRouterPrefix) && parsed.role === 'provider')
      ) {
        return NextResponse.redirect(new URL('/not-allowed', request.url))
      }
    } catch (error) {
      console.error('Error updating session:', error)
      res.cookies.delete('token')
      if (!isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  return res
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
