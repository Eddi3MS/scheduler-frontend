import { Button } from '@/components/ui/button'
import { getService, updateService } from '@/http/fetch-services'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import ServiceForm from '../../components/service-form'

export default async function UpdateService({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await getService(id)

  if (!res.success) {
    redirect(`/feedback?error=${res.error}`)
  }

  if (!res.data) {
    return notFound()
  }

  const service = res.data

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
