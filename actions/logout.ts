'use server'
import { cookies } from 'next/headers'

export default async function logout() {
  const cookieStore = await cookies()
  cookieStore.set('token', '', {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    domain: '.edsonmarcelo.com.br',
    path: '/',
    maxAge: 0,
  })
}
