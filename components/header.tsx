'use client'
import React from 'react'
import LogoutButton from './logout-button'
import { useUser } from '@/contexts/user-context'

export default function Header() {
  const { user } = useUser()

  return (
    <header className="w-full flex items-center justify-between border-b pb-4">
      <div>
        <h1 className="text-2xl font-semibold">{user?.name}</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>
      <LogoutButton />
    </header>
  )
}
