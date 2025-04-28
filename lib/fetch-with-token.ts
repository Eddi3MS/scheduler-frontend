'use server'

import { cookies } from 'next/headers'

export async function fetchWithToken(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('token')?.value

  const headers = new Headers(init?.headers || {})

  if (cookie) {
    headers.set('Cookie', `token=${cookie}`)
  }

  const res = await fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  })

  return res
}
