import Link from 'next/link'
import React from 'react'

export default function NotAllowed() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-red-500 font-bold text-2xl">Acesso negado.</h1>
      <Link href="/" className="text-muted-foreground underline mt-4">
        Voltar
      </Link>
    </main>
  )
}
