'use server'
import { fetchWithToken } from '@/lib/fetch-with-token'
import { ServiceSchema } from '@/types/forms'

export async function getServices() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/services`,
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

export async function getOwnServices() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/services/own`,
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

export async function getServicesByProviderId(id: string) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/services/by-provider/${id}`,
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

export async function getService(id: string) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/services/${id}`,
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

export async function updateService(id: string, values: ServiceSchema) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/services/${id}`,
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

export async function createService(values: ServiceSchema) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/services/`,
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
