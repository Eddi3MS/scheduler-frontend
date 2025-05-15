import getUserId from '@/actions/get-user-id'
import { getProvider } from '@/http/fetch-providers'
import { redirect } from 'next/navigation'
import React from 'react'
import ProviderBookingForm from '@/components/scheduler/provider-booking-form'
import { PageTransition } from '@/components/ui/page-transition'

export default async function SchedulerPage() {
  const user = await getUserId()

  if (!user) {
    redirect('/')
  }

  const provRes = await getProvider(user._id)

  if (!provRes.success) {
    redirect(`/feedback?error=${provRes.error}`)
  }

  if (!provRes.data) {
    redirect(`/feedback?error=Profissional não encontrado.`)
  }
  return (
    <PageTransition>
      <div className="py-6 w-full max-w-fit mt-2 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Agendamento</h1>
        <p className="text-center text-gray-500 mb-8">
          Faça o agendamento em nome de um cliente
        </p>

        <ProviderBookingForm provider={provRes.data} />
      </div>
    </PageTransition>
  )
}
