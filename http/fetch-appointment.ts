'use server'
import { fetchWithToken } from '@/lib/fetch-with-token'
import { ApiResponse } from './type'
import { Appointment, ProviderAppointment } from '@/types/appointment'

export async function getAvailableTime(
  serviceId: string,
  providerId: string,
  date: string
): Promise<ApiResponse<string[]>> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/appointments/get-available?serviceId=${serviceId}&providerId=${providerId}&date=${date}`,
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
        error: data?.message || 'Erro ao buscar agendamentos.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function getOwnAppointments(): Promise<
  ApiResponse<Appointment[]>
> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/appointments/me`,
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
        error: data?.message || 'Erro ao buscar agendamentos.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function getProviderAppointments(): Promise<
  ApiResponse<ProviderAppointment[]>
> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/appointments/list-by-provider`,
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
        error: data?.message || 'Erro ao buscar agendamentos.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function getProviderFutureAppointments(): Promise<
  ApiResponse<ProviderAppointment[]>
> {
  try {
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
      return {
        success: false,
        error: data?.message || 'Erro ao buscar agendamentos.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function createAppointment(
  values: any
): Promise<ApiResponse<Appointment>> {
  try {
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
    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: data?.message || 'Erro ao buscar agendamentos.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}
