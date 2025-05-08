'use client'
import ButtonWithConfirmation from '@/components/button-with-confirmation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AppointmentCancelButton({ id }: { id: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/appointments/cancel/${id}`,
        {
          method: 'GET',
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
    <ButtonWithConfirmation action={handleDelete} actionLabel="Cancelar">
      <Button
        className="absolute bottom-2 right-2"
        variant="destructive"
        size="sm"
      >
        Cancelar
      </Button>
    </ButtonWithConfirmation>
  )
}
