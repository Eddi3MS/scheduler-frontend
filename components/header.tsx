'use client'
import React from 'react'
import LogoutButton from './logout-button'
import { useUser } from '@/providers/user-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const { user } = useUser()

  return (
    <header className="w-full flex items-center justify-between border-b pb-4">
      <div>
        <h1 className="text-2xl font-semibold">{user?.name}</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-3">
          {user?.role === 'admin' ? (
            <>
              <DropdownMenuItem asChild>
                <Button asChild variant="ghost" className="cursor-pointer">
                  <Link href="/admin">Usuários</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button asChild variant="ghost" className="cursor-pointer">
                  <Link href="/admin/settings/providers">Profissionais</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button asChild variant="ghost" className="cursor-pointer">
                  <Link href="/user">Sua Agenda</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button asChild variant="ghost" className="cursor-pointer">
                  <Link href="/scheduler">Agendar</Link>
                </Button>
              </DropdownMenuItem>
            </>
          ) : user?.role === 'provider' ? (
            <>
              <DropdownMenuItem asChild>
                <Button asChild variant="ghost" className="cursor-pointer">
                  <Link href="/provider">Agenda</Link>
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Button asChild variant="ghost" className="cursor-pointer">
                  <Link href="/provider/settings/services">Serviços</Link>
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Button asChild variant="ghost" className="cursor-pointer">
                  <Link href="/provider/settings">Configurações</Link>
                </Button>
              </DropdownMenuItem>
            </>
          ) : user?.role === 'client' ? (
            <>
              <DropdownMenuItem asChild>
                <Button asChild variant="ghost" className="cursor-pointer">
                  <Link href="/user">Sua Agenda</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button asChild variant="ghost" className="cursor-pointer">
                  <Link href="/scheduler">Agendar Novo</Link>
                </Button>
              </DropdownMenuItem>
            </>
          ) : null}

          <DropdownMenuItem asChild>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
