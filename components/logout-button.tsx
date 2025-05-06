'use client'
import { useUser } from '@/providers/user-context'
import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
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
import logout from '@/actions/logout'

export default function LogoutButton() {
  const { setUser } = useUser()
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    setUser(null)
    setTimeout(() => {
      router.push('/')
    }, 50)
  }
  return (
    <AlertDialog>
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
