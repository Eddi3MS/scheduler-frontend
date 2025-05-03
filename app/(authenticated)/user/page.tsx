import { getOwnAppointments } from '@/http/fetch-appointment'
import { Appointment } from '@/types/appointment'
import SchedulerList from './components/scheduler-list'

export default async function UserPage() {
  const appointments: Appointment[] = await getOwnAppointments()
  return <SchedulerList appointmentsInit={appointments} />
}
