export type User = {
  email: string
  name: string
  role: 'admin' | 'client' | 'provider'
  id: string
} | null
