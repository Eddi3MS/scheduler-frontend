'use server'
import { fetchWithToken } from '@/lib/fetch-with-token'

export async function getAvailableTime(
  serviceId: string,
  providerId: string,
  date: string
) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/appointments/get-available?serviceId=${serviceId}&providerId=${providerId}&date=${date}`,
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

export async function getOwnAppointments() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/appointments/me`,
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

export async function getProviderAppointments() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/appointments/list-by-provider`,
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

export async function getProviderFutureAppointments() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/appointments/list-future-by-provider`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await res.json()
  if (!res.ok) {
    return []
  }
  return data
}

export async function createAppointment(values: any) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/appointments/`,
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
