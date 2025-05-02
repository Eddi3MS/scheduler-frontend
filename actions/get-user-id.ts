'use server'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export default async function getUserId() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  const user = await verifyToken(token!)

  return user.id
}
