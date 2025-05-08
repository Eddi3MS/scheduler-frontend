'use server'
import { fetchWithToken } from '@/lib/fetch-with-token'
import { ApiResponse } from './type'
import { Service } from '@/types/service'
import { ServiceSchema } from '@/types/forms'

export async function getServices(): Promise<ApiResponse<Service[]>> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/services`,
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
        error: data?.message || 'Erro ao buscar serviços.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function getOwnServices(): Promise<ApiResponse<Service[]>> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/services/own`,
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
        error: data?.message || 'Erro ao buscar serviços.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function getServicesByProviderId(
  id: string
): Promise<ApiResponse<Service[]>> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/services/by-provider/${id}`,
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
        error: data?.message || 'Erro ao buscar serviços.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function getService(
  id: string
): Promise<ApiResponse<Service | null>> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/services/${id}`,
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
        error: data?.message || 'Erro ao buscar serviço.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function updateService(
  id: string,
  values: ServiceSchema
): Promise<ApiResponse<Service | null>> {
  try {
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

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: data?.message || 'Erro ao atualizar serviço.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function createService(
  values: ServiceSchema
): Promise<ApiResponse<Service | null>> {
  try {
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

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: data?.message || 'Erro ao atualizar serviço.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}
