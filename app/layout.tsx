import getUserId from '@/actions/get-user-id'
import { Toaster } from '@/components/ui/toaster'
import { UserContextProvider } from '@/providers/user-context'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'
import './globals.css'
import { QueryProvider } from '@/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sua Marca | Agendamentos',
  description: 'Agende seus serviços de forma rápida e eficiente.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initUser = await getUserId()

  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} bg-gradient-to-b from-gray-50 to-gray-100`}
      >
        <QueryProvider>
          <UserContextProvider initUser={initUser}>
            {children}
            <Toaster />
          </UserContextProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
