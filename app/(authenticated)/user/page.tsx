import { Button } from '@/components/ui/button'
import { getOwnAppointments } from '@/http/fetch-appointment'
import Link from 'next/link'
import SchedulerList from './components/scheduler-list'
import { redirect } from 'next/navigation'

export default async function UserPage() {
  const res = await getOwnAppointments()

  if (!res.success) {
    redirect(`/feedback?error=${res.error}`)
  }

  if (!res.data.length) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Nenhum dado para exibir!</h1>
        <p className="text-lg ">Deseja fazer um agendamento?</p>
        <Button asChild variant="link">
          <Link href="/scheduler" className="text-orange-500 underline">
            Agendar
          </Link>
        </Button>
      </div>
    )
  }
  return <SchedulerList appointmentsInit={res.data} />
}
