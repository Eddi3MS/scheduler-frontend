import getUserId from '@/actions/get-user-id'
import { getProvider } from '@/http/fetch-providers'
import { createService } from '@/http/fetch-services'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ServiceForm from '../components/service-form'
import { Button } from '@/components/ui/button'

export default async function CreateService() {
  const onProviderSubmit = async (values: any) => {
    'use server'
    return await createService(values)
  }

  const user = await getUserId()

  if (!user) {
    redirect('/')
  }

  const provider = await getProvider(user.id)

  return (
    <>
      <Button asChild size="icon">
        <Link href="/provider/settings/services" className="flex items-center">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Voltar</span>
        </Link>
      </Button>

      <ServiceForm
        onSubmit={onProviderSubmit}
        initValues={{
          providerId: provider._id,
          name: '',
          price: '',
          duration: '',
        }}
      />
    </>
  )
}
