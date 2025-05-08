'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      setErrorMessage(decodeURIComponent(error))
    }
  }, [searchParams])

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-50">
      <h1 className="text-2xl font-bold text-red-700">Ocorreu um erro</h1>
      {errorMessage && (
        <p className="mt-4 text-red-600 text-center max-w-md">{errorMessage}</p>
      )}
      <Link href="/">Voltar</Link>
    </section>
  )
}
