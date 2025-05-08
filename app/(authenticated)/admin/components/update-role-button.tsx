'use client'
import { Button } from '@/components/ui/button'
import { updateUserRole } from '@/http/fetch-users'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function UpdateRoleButton({
  userId,
  role,
}: {
  userId: string
  role: 'admin' | 'provider' | 'client'
}) {
  const router = useRouter()
  const handleUpdate = async () => {
    const res = await updateUserRole(userId, { role })
    if (res) router.refresh()
  }
  return <Button onClick={handleUpdate}>Update to Provider</Button>
}
