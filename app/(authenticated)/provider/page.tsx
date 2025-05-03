import { Button } from '@/components/ui/button'
import { getProviderAppointments } from '@/http/fetch-appointment'
import { ProviderAppointment } from '@/types/appointment'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import SchedulerList from './components/scheduler-list'
import getUserId from '@/actions/get-user-id'
import { getProvider } from '@/http/fetch-providers'

export default async function Page() {
  const appointments: ProviderAppointment[] = await getProviderAppointments()
  const userId = await getUserId()
  const provider = await getProvider(userId)

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
