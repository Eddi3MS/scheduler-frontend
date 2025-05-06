import { getService, updateService } from '@/http/fetch-services'
import { Service } from '@/types/service'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ServiceForm from '../../components/service-form'

export default async function UpdateProvider({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service: Service = await getService(id)

  const onProviderSubmit = async (values: any) => {
    'use server'
    console.log('🚀 ~ onProviderSubmit ~ values:', values)
    return await updateService(id, values)
  }

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
          name: service.name,
          providerId: service.providerId,
          price: service.price.toString(),
          duration: service.duration.toString(),
          image: process.env.NEXT_PUBLIC_API_PATH + service.image,
        }}
      />
    </>
  )
}
