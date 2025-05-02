import { getProvider, getProviders } from '@/http/fetch-providers'
import { createService } from '@/http/fetch-services'
import { ServiceSchema } from '@/types/forms'
import { Provider } from '@/types/provider'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ServiceForm from '../components/service-form'
import getUserId from '@/actions/get-user-id'

export default async function CreateProvider() {
  const onProviderSubmit = async (values: ServiceSchema) => {
    'use server'
    return await createService(values)
  }

  const id = await getUserId()
  const provider = await getProvider(id)

  return (
    <>
      <Link
        href="/provider/settings/services"
        className="underline flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Link>

      <ServiceForm
        onSubmit={onProviderSubmit}
        initValues={{
          providerId: provider._id,
          name: '',
          price: '',
          duration: '',
        }}
      />
    </>
  )
}
