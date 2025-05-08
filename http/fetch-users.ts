'use server'
import { fetchWithToken } from '@/lib/fetch-with-token'
import { ApiResponse } from './type'
import { User } from '@/types/user'

export async function getUsers(): Promise<ApiResponse<User[]>> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/user/users`,
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
        error: data?.message || 'Erro ao listar usuários.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}

export async function updateUserRole(
  id: string,
  values: { role: 'admin' | 'provider' | 'client' }
): Promise<ApiResponse<User>> {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/user/users/${id}`,
      {
        method: 'PUT',
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
        error: data?.message || 'Erro ao atualizar usuário.',
      }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Erro de conexão com o servidor.' }
  }
}
