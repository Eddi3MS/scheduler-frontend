import MotionCardsWrapper from '@/components/motion-cards-wrapper'
import { Card, CardContent } from '@/components/ui/card'
import { getProviders } from '@/http/fetch-providers'
import { Provider } from '@/types/provider'
import ProviderDeleteButton from './components/provider-delete-button'
import { redirect } from 'next/navigation'

export default async function ProviderPage() {
  const res = await getProviders()

  if (!res.success) {
    redirect(`/feedback?error=${res.error}`)
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Profissionais</h2>
      </div>
      <MotionCardsWrapper>
        {res.data.map((provider) => (
          <Card
            key={provider._id}
            className="h-full min-w-44 transition-all hover:shadow-lg relative"
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src="/placeholder.jpg"
                    alt={provider.userId.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <h3 className="font-medium text-lg text-center">
                  {provider.userId.name}
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
            <div className="flex flex-col absolute top-2 right-2">
              <ProviderDeleteButton id={provider._id} />
            </div>
          </Card>
        ))}
      </MotionCardsWrapper>
    </>
  )
}
