import getUserId from '@/actions/get-user-id'
import { getProvider, updateProvider } from '@/http/fetch-providers'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProviderForm from '../components/provider-form'
import { Button } from '@/components/ui/button'

export default async function Page() {
  const user = await getUserId()

  if (!user) {
    redirect('/')
  }

  const provRes = await getProvider(user._id)

  if (!provRes.success) {
    redirect(`/feedback?error=${provRes.error}`)
  }

  const onProviderSubmit = async (values: any) => {
    'use server'

    return await updateProvider(values)
  }

  const provider = provRes.data

  return (
    <ProviderForm
      onSubmit={onProviderSubmit}
      initValues={{
        workingHours: provider?.workingHours
          ? provider?.workingHours
          : [{ start: '', end: '' }],
        closedDates: provider?.closedDates ? provider?.closedDates : [],
        image: provider?.image
          ? process.env.NEXT_PUBLIC_API_PATH + provider.image
          : '',
        weeklyClosedDays: provider?.weeklyClosedDays
          ? provider?.weeklyClosedDays
          : [],
      }}
    />
  )
}
