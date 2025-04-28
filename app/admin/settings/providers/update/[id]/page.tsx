import Header from '@/components/header'
import { getProvider, updateProvider } from '@/http/fetch-providers'
import { ProviderSchema } from '@/types/forms'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ProviderForm from '../../components/provider-form'

export default async function UpdateProvider({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const provider = await getProvider(id)

  const onProviderSubmit = async (values: ProviderSchema) => {
    'use server'
    return await updateProvider(id, values)
  }

  return (
    <main className="flex flex-col gap-4 p-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Header />
      <Link
        href="/admin/settings/providers"
        className="underline flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Link>

      <ProviderForm onSubmit={onProviderSubmit} initValues={provider} />
    </main>
  )
}
