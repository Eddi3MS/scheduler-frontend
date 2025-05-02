'use client'
import DeleteButton from '@/components/delete-button'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function ProviderDeleteButton({ id }: { id: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/providers/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )

      if (res.status !== 204) {
        toast({
          variant: 'destructive',
          title: 'Algo deu errado!',
          description: 'Tente novamente mais tarde.',
        })

        return
      }

      router.refresh()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado!',
        description: 'Tente novamente mais tarde.',
      })
    }
  }
  return <DeleteButton action={handleDelete} />
}
