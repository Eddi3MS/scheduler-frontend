'use client'
import { Button } from '@/components/ui/button'
import { updateUserRole } from '@/http/fetch-users'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function UpdateRoleButton({ userId }: { userId: string }) {
  const router = useRouter()
  const handleUpdate = async () => {
    const res = await updateUserRole(userId, { role: 'provider' })
    if (res) router.refresh()
  }
  return <Button onClick={handleUpdate}>Update to Provider</Button>
}
