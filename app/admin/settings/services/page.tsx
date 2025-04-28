import Header from '@/components/header'
import MotionCardsWrapper from '@/components/motion-cards-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getProviders } from '@/http/fetch-providers'
import { getServices } from '@/http/fetch-services'
import { formatBRL } from '@/lib/intl'
import { Provider } from '@/types/provider'
import { Pencil, Plus } from 'lucide-react'
import Link from 'next/link'
import ServiceDeleteButton from './components/service-delete-button'

export default async function ServicesPage() {
  const services: any[] = await getServices()
  const providers: Provider[] = await getProviders()

  return (
    <main className="flex flex-col gap-4 p-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Header />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Serviços</h2>
        <Button
          asChild
          className="bg-black text-white hover:bg-gray-800"
          size="icon"
        >
          <Link href="/admin/settings/services/create">
            <span className="sr-only">Criar novo Serviço</span>
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <MotionCardsWrapper>
        {services.map((service) => (
          <Card
            key={service._id}
            className="h-full min-w-44 transition-all hover:shadow-lg relative"
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src="/placeholder.jpg"
                    alt={service.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <h3 className="font-medium text-lg text-center uppercase">
                  {service.name}
                </h3>
                <Badge variant="outline">
                  {providers.find((p) => p._id === service.providerId)?.name}
                </Badge>
                <p className="text-sm">{service.duration}min</p>
                <p className="font-bold text-lg">{formatBRL(service.price)}</p>
              </div>
            </CardContent>
            <div className="flex flex-col gap-2 absolute top-2 right-2">
              <Button
                asChild
                size="icon"
                className="bg-black cursor-pointer text-white hover:bg-gray-800"
              >
                <Link href={`/admin/settings/services/update/${service._id}`}>
                  <span className="sr-only">Editar {service.name}</span>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>

              <ServiceDeleteButton id={service._id} />
            </div>
          </Card>
        ))}
      </MotionCardsWrapper>
    </main>
  )
}
