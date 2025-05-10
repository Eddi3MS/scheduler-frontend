'use client'
import logout from '@/actions/logout'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useUser } from '@/providers/user-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'

export default function LogoutButton() {
  const [open, setOpen] = useState(false)
  const { setUser } = useUser()
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    setOpen(false)
    setUser(null)

    router.push('/')
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full hover:bg-red-500 hover:text-white"
        >
          Sair
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar ação!</AlertDialogTitle>
          <AlertDialogDescription>
            Você será desconectado do sistema
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-8"
          >
            Sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
