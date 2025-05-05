'use server'
import { fetchWithToken } from '@/lib/fetch-with-token'
import { startOfDay } from 'date-fns'

export async function getClosedDates() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/closed-dates`,
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
  if (!data.length) return []
  return data.map((d: any) => startOfDay(new Date(d.date)))
}

export async function getClosedDays() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/weekly-closed-days`,
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
  if (!data.length) return []

  return data.map((d: any) => String(d.day))
}

export async function updateClosedDates(dates: Date[]) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/closed-dates`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dates: dates.map((date) => ({ date })) }),
    }
  )

  if (!res.ok) {
    return false
  }

  return true
}

export async function updateClosedDay(days: string[]) {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/weekly-closed-days`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ days: days.map((d) => ({ day: Number(d) })) }),
    }
  )

  if (!res.ok) {
    return false
  }
  return true
}
