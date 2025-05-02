import { Toaster } from '@/components/ui/toaster'
import { UserContextProvider } from '@/contexts/user-context'
import { verifyToken } from '@/lib/auth'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import type React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sua Marca | Agendamentos',
  description: 'Agende seus serviços de forma rápida e eficiente.',
}

const checkToken = async (token?: string) => {
  if (!token) return null
  try {
    return await verifyToken(token)
  } catch (error) {
    return null
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const initUser = await checkToken(cookieStore.get('token')?.value)

  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} bg-gradient-to-b from-gray-50 to-gray-100`}
      >
        <UserContextProvider initUser={initUser}>
          {children}
          <Toaster />
        </UserContextProvider>
      </body>
    </html>
  )
}
