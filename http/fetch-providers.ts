import { fetchWithToken } from '@/lib/fetch-with-token'
import { ProviderSchema } from '@/types/forms'

export async function getProviders() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/providers/`,
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

export async function getProvider(id: string) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/providers/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!res.ok) {
    return null
  }
  const data = await res.json()
  return data
}

export async function updateProvider(id: string, values: ProviderSchema) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/providers/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }
  )

  if (!res.ok) {
    return false
  }

  return true
}

export async function createProvider(values: ProviderSchema) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/providers/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }
  )

  if (!res.ok) {
    return false
  }
  return true
}
