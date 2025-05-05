import { jwtVerify } from 'jose'

const key = new TextEncoder().encode(process.env.JWT_SECRET)

type SessionData = {
  id: string
  role: 'client' | 'admin' | 'provider'
  email: string
  name: string
}

export async function verifyToken(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })
    return payload as SessionData
  } catch (error) {
    console.log(error)
    return null
  }
}
