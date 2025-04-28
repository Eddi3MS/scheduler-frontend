import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

const authRoutes = ['/', '/register']

const publicRoutes = [...authRoutes, '/not-allowed']

const adminRouterPrefix = '/admin'

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

      if (authRoutes.includes(pathname)) {
        const route = parsed.role === 'admin' ? '/admin' : '/user'
        return NextResponse.redirect(new URL(route, request.url))
      }

      if (pathname.startsWith(adminRouterPrefix) && parsed.role !== 'admin') {
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
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
