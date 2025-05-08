import { PageTransition } from '@/components/ui/page-transition'
import { getProviders } from '@/http/fetch-providers'
import BookingForm from './components/booking-form'
import { redirect } from 'next/navigation'

export default async function Service() {
  const res = await getProviders()

  if (!res.success) {
    redirect(`/feedback?error=${res.error}`)
  }

  return (
    <>
      <PageTransition>
        <div className="py-6 w-full max-w-fit mt-2 mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">Agendamento</h1>
          <p className="text-center text-gray-500 mb-8">
            Complete o passo a passo para agendar seu atendimento
          </p>

          <BookingForm providers={res.data} />
        </div>
      </PageTransition>
    </>
  )
}
