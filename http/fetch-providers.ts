import { fetchWithToken } from '@/lib/fetch-with-token'
import { ApiResponse } from './type'
import { Provider } from '@/types/provider'
import { ProviderSchema } from '@/types/forms'

export async function getProviders(): Promise<ApiResponse<Provider[]>> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/providers/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: data?.message || 'Erro ao buscar profissionais.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function getProvider(
  id: string
): Promise<ApiResponse<Provider | null>> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/providers/user-id/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: data?.message || 'Erro ao buscar profissional.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function updateProvider(
  values: ProviderSchema
): Promise<ApiResponse<Provider>> {
  try {
    const formData = new FormData()
    formData.append('workingHours', JSON.stringify(values.workingHours))

    if (values.closedDates)
      formData.append('closedDates', JSON.stringify(values?.closedDates))

    if (values.weeklyClosedDays)
      formData.append(
        'weeklyClosedDays',
        JSON.stringify(values.weeklyClosedDays)
      )

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

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: data?.message || 'Erro ao atualizar profissional.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}
