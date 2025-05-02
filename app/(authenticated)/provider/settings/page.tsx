import { getProvider, updateProvider } from '@/http/fetch-providers'
import { verifyToken } from '@/lib/auth'
import { ProviderSchema } from '@/types/forms'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProviderForm from '../components/provider-form'

export default async function Page() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value!
  const user = await verifyToken(token)

  const id = user.id

  const provider = await getProvider(id)

  const onProviderSubmit = async (values: ProviderSchema) => {
    'use server'
    console.log('🚀 ~ onProviderSubmit ~ values:', values)

    return await updateProvider(values)
  }

  return (
    <>
      <Link
        href="/admin/settings/providers"
        className="underline flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Link>

      <ProviderForm onSubmit={onProviderSubmit} initValues={provider} />
    </>
  )
}
