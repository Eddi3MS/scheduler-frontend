import { getOwnAppointments } from '@/http/fetch-appointment'
import { Appointment } from '@/types/appointment'
import SchedulerList from './components/scheduler-list'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function UserPage() {
  const appointments: Appointment[] = await getOwnAppointments()

  if (!appointments || !appointments.length) {
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
  return <SchedulerList appointmentsInit={appointments} />
}
