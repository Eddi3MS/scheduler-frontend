import { getService, updateService } from '@/http/fetch-services'
import { Service } from '@/types/service'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ServiceForm from '../../components/service-form'
import { Button } from '@/components/ui/button'

export default async function UpdateProvider({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service: Service = await getService(id)

  const onProviderSubmit = async (values: any) => {
    'use server'
    return await updateService(id, values)
  }

  return (
    <>
      <Button asChild size="icon">
        <Link href="/provider/settings/services" className="flex items-center">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Voltar</span>
        </Link>
      </Button>

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
