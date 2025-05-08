'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <img
        src="/404.jpg"
        alt="Página não encontrada"
        className="w-96  mb-8 aspect-video"
      />

      <h1 className="text-3xl font-bold text-gray-800">
        Página não encontrada
      </h1>
      <p className="mt-4 text-gray-600 text-center max-w-md">
        Ops! A página que você está procurando não existe ou foi removida.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Voltar para a página inicial
      </Link>
    </section>
  )
}
