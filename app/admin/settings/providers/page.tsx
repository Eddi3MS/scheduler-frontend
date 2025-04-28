import Header from '@/components/header'
import MotionCardsWrapper from '@/components/motion-cards-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getProviders } from '@/http/fetch-providers'
import { Provider } from '@/types/provider'
import { Pencil, Plus } from 'lucide-react'
import Link from 'next/link'
import ProviderDeleteButton from './components/provider-delete-button'

export default async function ProviderPage() {
  const providers: Provider[] = await getProviders()
  return (
    <main className="flex flex-col gap-4 p-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Header />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Profissionais</h2>
        <Button
          asChild
          className="bg-black text-white hover:bg-gray-800"
          size="icon"
        >
          <Link href="/admin/settings/providers/create">
            <span className="sr-only">Criar novo Profissional</span>
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <MotionCardsWrapper>
        {providers.map((provider) => (
          <Card
            key={provider._id}
            className="h-full min-w-44 transition-all hover:shadow-lg relative"
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src="/placeholder.jpg"
                    alt={provider.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <h3 className="font-medium text-lg text-center">
                  {provider.name}
                </h3>
                <div className="text-center">
                  <h4>Horários</h4>
                  {provider.workingHours.map((w) => (
                    <p key={w._id}>
                      {w.start} - {w.end}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="flex flex-col gap-2 absolute top-2 right-2">
              <Button
                asChild
                size="icon"
                className="bg-black cursor-pointer text-white hover:bg-gray-800"
              >
                <Link href={`/admin/settings/providers/update/${provider._id}`}>
                  <span className="sr-only">Editar {provider.name}</span>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>

              <ProviderDeleteButton id={provider._id} />
            </div>
          </Card>
        ))}
      </MotionCardsWrapper>
    </main>
  )
}
