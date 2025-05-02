'use client'
import { Button } from '@/components/ui/button'
import { updateUserRole } from '@/http/fetch-users'
import React from 'react'

export default function UpdateRoleButton({ userId }: { userId: string }) {
  const handleUpdate = async () => {
    await updateUserRole(userId, { role: 'provider' })
  }
  return <Button onClick={handleUpdate}>Update to Provider</Button>
}
