import { fetchWithToken } from '@/lib/fetch-with-token'

export async function getProviders() {
  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/providers/`,
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
    `${process.env.NEXT_PUBLIC_API_PATH}/api/providers/user-id/${id}`,
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

export async function updateProvider(values: any) {
  const formData = new FormData()
  formData.append('workingHours', JSON.stringify(values.workingHours))

  if (values.closedDates)
    formData.append('closedDates', JSON.stringify(values?.closedDates))

  if (values.weeklyClosedDays)
    formData.append('weeklyClosedDays', JSON.stringify(values.weeklyClosedDays))

  if (values.image) {
    formData.append('image', values.image)
  }

  const res = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_PATH}/api/providers`,
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
