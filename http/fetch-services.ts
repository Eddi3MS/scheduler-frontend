'use server'
import { fetchWithToken } from '@/lib/fetch-with-token'

export async function getServices() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/services`,
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
    `${process.env.NEXT_PUBLIC_API_PATH}/api/services/own`,
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
    `${process.env.NEXT_PUBLIC_API_PATH}/api/services/by-provider/${id}`,
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
    `${process.env.NEXT_PUBLIC_API_PATH}/api/services/${id}`,
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

export async function updateService(id: string, values: any) {
  const formData = new FormData()
  formData.append('name', values.name)
  formData.append('price', values.price)
  formData.append('duration', values.duration)
  if (values.image) {
    formData.append('image', values.image)
  }

  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/services/${id}`,
    {
      method: 'PUT',
      body: formData,
    }
  )

  if (!res.ok) {
    return false
  }

  return true
}

export async function createService(values: any) {
  const formData = new FormData()
  formData.append('name', values.name)
  formData.append('price', values.price)
  formData.append('providerId', values.providerId)
  formData.append('duration', values.duration)
  if (values.image) {
    formData.append('image', values.image)
  }

  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/services/`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!res.ok) {
    return false
  }
  return true
}
