import Header from '@/components/header'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex container min-h-dvh flex-col gap-4 p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      {children}
    </main>
  )
}
