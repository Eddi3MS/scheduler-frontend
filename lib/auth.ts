'use server'

import { jwtVerify } from 'jose'

const key = new TextEncoder().encode(process.env.JWT_SECRET_BD)

type SessionData = {
  id: string
  role: 'client' | 'admin' | 'provider'
  email: string
  name: string
}

export async function verifyToken(input: string) {
  try {
    console.log(process.env.JWT_SECRET_BD, input, key)
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })
    return payload as SessionData
  } catch (error) {
    console.log(error)
    return null
  }
}
