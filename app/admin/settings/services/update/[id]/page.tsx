import Header from '@/components/header'
import { getProviders } from '@/http/fetch-providers'
import { getService, updateService } from '@/http/fetch-services'
import { ServiceSchema } from '@/types/forms'
import { Provider } from '@/types/provider'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ServiceForm from '../../components/service-form'

export default async function UpdateProvider({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service: ServiceSchema = await getService(id)

  const providers: Provider[] = await getProviders()

  const providerOptions = providers.map((p) => ({ name: p.name, id: p._id }))

  const onProviderSubmit = async (values: ServiceSchema) => {
    'use server'
    return await updateService(id, values)
  }

  return (
    <main className="flex flex-col gap-4 p-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Header />
      <Link
        href="/admin/settings/services"
        className="underline flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Link>

      <ServiceForm
        onSubmit={onProviderSubmit}
        initValues={{
          name: service.name,
          providerId: service.providerId,
          price: service.price.toString(),
          duration: service.duration.toString(),
        }}
        providerOptions={providerOptions}
      />
    </main>
  )
}
