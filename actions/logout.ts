'use server'
import { cookies } from 'next/headers'

export default async function logout() {
  const cookieStore = await cookies()
  cookieStore.set('token', '', {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    domain: process.env.COOKIE_DOMAIN,
    path: '/',
    maxAge: 0,
  })
}
