import getUserId from '@/actions/get-user-id'
import { Button } from '@/components/ui/button'
import { getProviderAppointments } from '@/http/fetch-appointment'
import { getProvider } from '@/http/fetch-providers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import SchedulerList from './components/scheduler-list'

export default async function Page() {
  const user = await getUserId()

  if (!user) {
    redirect('/')
  }

  const provRes = await getProvider(user._id)

  if (!provRes.success) {
    redirect(`/feedback?error=${provRes.error}`)
  }

  if (!provRes.data) {
    return (
      <div className="grid place-items-center gap-4 p-8">
        <p>Cadastre seus dados para começar.</p>
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/provider/settings">Cadastrar</Link>
        </Button>
      </div>
    )
  }
  const res = await getProviderAppointments()

  if (!res.success) {
    redirect(`/feedback?error=${res.error}`)
  }

  return (
    <SchedulerList appointmentsInit={res.data} providerId={provRes.data._id} />
  )
}
