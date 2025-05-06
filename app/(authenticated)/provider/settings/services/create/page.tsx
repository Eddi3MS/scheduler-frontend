import getUserId from '@/actions/get-user-id'
import { getProvider } from '@/http/fetch-providers'
import { createService } from '@/http/fetch-services'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ServiceForm from '../components/service-form'

export default async function CreateService() {
  const onProviderSubmit = async (values: any) => {
    'use server'
    return await createService(values)
  }

  const user = await getUserId()

  if (!user) {
    redirect('/')
  }

  const provider = await getProvider(user.id)

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
