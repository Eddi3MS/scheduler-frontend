import Header from '@/components/header'
import { getProviders } from '@/http/fetch-providers'
import { createService } from '@/http/fetch-services'
import { ServiceSchema } from '@/types/forms'
import { Provider } from '@/types/provider'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ServiceForm from '../components/service-form'

export default async function CreateProvider() {
  const onProviderSubmit = async (values: ServiceSchema) => {
    'use server'
    return await createService(values)
  }

  const providers: Provider[] = await getProviders()

  const providerOptions = providers.map((p) => ({ name: p.name, id: p._id }))

  return (
    <main className="flex flex-col gap-4 p-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Header />
      <Link
        href="/admin/settings/providers"
        className="underline flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Link>

      <ServiceForm
        onSubmit={onProviderSubmit}
        providerOptions={providerOptions}
      />
    </main>
  )
}
