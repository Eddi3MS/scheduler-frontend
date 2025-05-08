import getUserId from '@/actions/get-user-id'
import { Button } from '@/components/ui/button'
import { getProvider } from '@/http/fetch-providers'
import { createService } from '@/http/fetch-services'
import { ServiceSchema } from '@/types/forms'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ServiceForm from '../components/service-form'

export default async function CreateService() {
  const onProviderSubmit = async (values: ServiceSchema) => {
    'use server'
    return await createService(values)
  }

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
          providerId: provRes.data._id,
          name: '',
          price: '',
          duration: '',
        }}
      />
    </>
  )
}
