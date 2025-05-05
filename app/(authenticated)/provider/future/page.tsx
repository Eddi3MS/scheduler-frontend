import getUserId from '@/actions/get-user-id'
import { Button } from '@/components/ui/button'
import { getProviderFutureAppointments } from '@/http/fetch-appointment'
import { getProvider } from '@/http/fetch-providers'
import { ProviderAppointment } from '@/types/appointment'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import SchedulerList from '../components/scheduler-list'

export default async function Page() {
  const appointments: ProviderAppointment[] =
    await getProviderFutureAppointments()
  console.log('🚀 ~ Page ~ appointments:', appointments)
  const user = await getUserId()

  if (!user) {
    redirect('/')
  }

  const provider = await getProvider(user.id)

  return (
    <>
      {!provider ? (
        <div className="grid place-items-center gap-4 p-8">
          <p>Cadastre seus dados para começar.</p>
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link href="/provider/settings">Cadastrar</Link>
          </Button>
        </div>
      ) : (
        <SchedulerList
          appointmentsInit={appointments}
          providerId={provider._id}
        />
      )}
    </>
  )
}
