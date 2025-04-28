export type User = {
  email: string
  name: string
  role: 'admin' | 'client'
  id: string
} | null
