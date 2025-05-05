import Header from '@/components/header'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  console.log(process.env.JWT_SECRET)
  return (
    <main className="flex container min-h-screen flex-col gap-4 p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      {children}
    </main>
  )
}
