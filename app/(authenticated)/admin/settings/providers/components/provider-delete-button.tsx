'use client'
import ButtonWithConfirmation from '@/components/button-with-confirmation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProviderDeleteButton({ id }: { id: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/providers/${id}`,
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
  return (
    <ButtonWithConfirmation action={handleDelete} actionLabel="Excluir">
      <Button
        size="icon"
        className=" cursor-pointer text-white"
        variant="destructive"
      >
        <span className="sr-only">Excluir</span>
        <Trash2 className="h-4 w-4" />
      </Button>
    </ButtonWithConfirmation>
  )
}
