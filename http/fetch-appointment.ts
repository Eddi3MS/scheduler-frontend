'use server'
import { fetchWithToken } from '@/lib/fetch-with-token'

export async function getAvailableTime(
  serviceId: string,
  providerId: string,
  date: string
) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/appointments/get-available?serviceId=${serviceId}&providerId=${providerId}&date=${date}`,
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
    `${process.env.NEXT_PUBLIC_API_BASE}/appointments/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  console.log('🚀 ~ getOwnAppointments ~ res:', res)

  if (!res.ok) {
    return []
  }
  const data = await res.json()
  return data
}

export async function createAppointment(values: any) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_BASE}/appointments/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }
  )
  console.log('🚀 ~ createAppointment ~ res:', res)

  if (!res.ok) {
    return false
  }

  const data = await res.json()
  console.log('🚀 ~ createAppointment ~ data:', data)
  return true
}
