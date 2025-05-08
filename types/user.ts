export type User = {
  email: string
  name: string
  role: 'admin' | 'client' | 'provider'
  _id: string
}
