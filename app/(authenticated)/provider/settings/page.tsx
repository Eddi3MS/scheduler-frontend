import getUserId from '@/actions/get-user-id'
import { getProvider, updateProvider } from '@/http/fetch-providers'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProviderForm from '../components/provider-form'

export default async function Page() {
  const user = await getUserId()

  if (!user) {
    redirect('/')
  }

  const provider = await getProvider(user.id)

  const onProviderSubmit = async (values: any) => {
    'use server'

    return await updateProvider(values)
  }

  return (
    <>
      <Link href="/provider" className="underline flex items-center gap-1">
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Link>

      <ProviderForm
        onSubmit={onProviderSubmit}
        initValues={{
          workingHours: provider?.workingHours
            ? provider?.workingHours
            : [{ start: '', end: '' }],
          closedDates: provider?.closedDates ? provider?.closedDates : [],
          image: provider?.image
            ? process.env.NEXT_PUBLIC_API_PATH + provider?.image
            : '',
          weeklyClosedDays: provider?.weeklyClosedDays
            ? provider?.weeklyClosedDays
            : [],
        }}
      />
    </>
  )
}
