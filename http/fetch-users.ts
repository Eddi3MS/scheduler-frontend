'use server'
import { fetchWithToken } from '@/lib/fetch-with-token'

export async function getUsers() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/user/users`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!res.ok) {
    return []
  }
  const data = await res.json()
  return data
}

export async function updateUserRole(
  id: string,
  values: { role: 'admin' | 'provider' | 'client' }
) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/user/users/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }
  )
  console.log('🚀 ~ res:', res)

  if (!res.ok) {
    return false
  }

  const data = await res.json()

  console.log(data)

  return true
}
