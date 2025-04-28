import BookingForm from '@/components/booking-form'
import { PageTransition } from '@/components/ui/page-transition'

export default function Service() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <PageTransition>
        <div className="py-6 w-full max-w-5xl">
          <h1 className="text-4xl font-bold text-center mb-2">Agendamento</h1>
          <p className="text-center text-gray-500 mb-8">
            Complete o passo a passo para agendar seu atendimento
          </p>
          <BookingForm />
        </div>
      </PageTransition>
    </main>
  )
}
