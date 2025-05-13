export type User = {
  email: string
  name: string
  role: 'admin' | 'client' | 'provider'
  _id: string
}

export const redirectPaths = {
  admin: '/admin',
  client: '/user',
  provider: '/provider',
} as const
