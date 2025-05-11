import MotionCardsWrapper from '@/components/motion-cards-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getOwnServices } from '@/http/fetch-services'
import { formatBRL } from '@/lib/intl'
import { ChevronLeft, Pencil, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ServiceDeleteButton from './components/service-delete-button'
import { redirect } from 'next/navigation'

export default async function ServicesPage() {
  const res = await getOwnServices()

  if (!res.success) {
    redirect(`/feedback?error=${res.error}`)
  }

  const services = res.data

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Button asChild size="icon">
            <Link href="/provider" className="flex items-center">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>

          <h2 className="text-2xl font-semibold">Serviços</h2>
        </div>
        <Button
          asChild
          className="bg-black text-white hover:bg-gray-800"
          size="icon"
        >
          <Link href="/provider/settings/services/create">
            <span className="sr-only">Criar novo Serviço</span>
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      {Array.isArray(services) && services.length ? (
        <MotionCardsWrapper>
          {services.map((service) => (
            <Card
              key={service._id}
              className="h-full min-w-44 transition-all hover:shadow-lg relative"
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Image
                      src={
                        service.image
                          ? process.env.NEXT_PUBLIC_API_PATH + service.image
                          : '/placeholder.jpg'
                      }
                      width={96}
                      height={96}
                      alt={service.name}
                      className="w-24 h-24 rounded-full object-cover object-center border-2 border-gray-200"
                    />
                  </div>
                  <h3 className="font-medium text-lg text-center uppercase">
                    {service.name}
                  </h3>

                  <p className="text-sm">{service.duration}min</p>
                  <p className="font-bold text-lg">
                    {formatBRL(service.price)}
                  </p>
                </div>
              </CardContent>
              <div className="flex flex-col gap-2 absolute top-2 right-2">
                <Button
                  asChild
                  size="icon"
                  className="bg-black cursor-pointer text-white hover:bg-gray-800"
                >
                  <Link
                    href={`/provider/settings/services/update/${service._id}`}
                  >
                    <span className="sr-only">Editar {service.name}</span>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>

                <ServiceDeleteButton id={service._id} />
              </div>
            </Card>
          ))}
        </MotionCardsWrapper>
      ) : (
        <div className="text-center p-8">
          <span>Nenhum serviço cadastrado.</span>
        </div>
      )}
    </>
  )
}
