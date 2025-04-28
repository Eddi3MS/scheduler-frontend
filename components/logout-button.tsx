'use client'
import logout from '@/actions/logout'
import { useUser } from '@/contexts/user-context'
import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { setUser } = useUser()
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    setUser(null)
    router.push('/')
  }
  return (
    <Button onClick={handleLogout} variant="destructive" size="icon">
      <span className="sr-only">sair</span>
      <LogOut />
    </Button>
  )
}
