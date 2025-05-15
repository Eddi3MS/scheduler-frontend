'use client'
import MotionCardsWrapper from '@/components/motion-cards-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import {
  formatDateToDDMMYYYY,
  isBeforeToday,
  isDateTimeBeforeNow,
  isTimeBeforeNow,
} from '@/lib/date-fns'
import { formatBRL } from '@/lib/intl'
import { cn } from '@/lib/utils'
import { ProviderAppointment } from '@/types/appointment'
import { useQuery } from '@tanstack/react-query'
import { format, isToday, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, CheckIcon, ListFilterIcon, Loader2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import AppointmentCancelButton from '../../user/components/appointment-cancel-button'
import { PopoverClose } from '@radix-ui/react-popover'

export default function SchedulerList({ providerId }: { providerId: string }) {
  const [dateInput, setDateInput] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)

  const formatted = dateInput ? format(dateInput, 'yyyy-MM-dd') : undefined

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['provider-appointments', providerId, formatted],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams()

        if (formatted) queryParams.append('date', formatted)

        const url = `${
          process.env.NEXT_PUBLIC_API_PATH
        }/api/appointments/list-by-provider${
          queryParams.toString() ? `?${queryParams.toString()}` : ''
        }`

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.message || 'Erro ao buscar agendamentos.')
        }

        return data as ProviderAppointment[]
      } catch (error) {
        throw new Error('Erro de conexão com o servidor.')
      }
    },
  })

  const [showCanceled, setShowCanceled] = useState(false)
  const [showPassed, setShowPassed] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/events/events/${providerId}`,
      { withCredentials: true }
    )

    const notificationNewSound = new Audio('/new.wav')
    const notificationCancelSound = new Audio('/error.wav')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)

      refetch()
      if (data.status === 'created') {
        toast({
          variant: 'success',
          title: 'Novo agendamento!',
          description: `${data.data.clientId.name} agendou ${data.data.serviceId.name} às ${data.data.time}h`,
        })
        notificationNewSound.play().catch((error) => {
          console.warn('Erro ao tocar som:', error)
        })
      }

      if (data.status === 'canceled') {
        toast({
          variant: 'destructive',
          title: 'Agendamento Cancelado!',
          description: `${data.data.clientId.name} cancelou ${data.data.serviceId.name} às ${data.data.time}h`,
        })
        notificationCancelSound.play().catch((error) => {
          console.warn('Erro ao tocar som:', error)
        })
      }
    }

    return () => {
      eventSource.close()
    }
  })

  const handleToggleCanceled = () => {
    setShowCanceled((curr) => !curr)
  }

  const handleTogglePassed = () => {
    setShowPassed((curr) => !curr)
  }

  const appointmentsFiltered = useMemo(() => {
    if (!data) return []

    return data.filter((ap) => {
      const isCanceled = ap.canceled
      const isPassed = isDateTimeBeforeNow(ap.date, ap.time)

      if (!showCanceled && isCanceled) return false
      if (!showPassed && isPassed) return false

      return true
    })
  }, [data, showCanceled, showPassed])

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Agenda</h2>

        <div className="flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal',
                  !dateInput && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-1 h-4 w-4" />
                {dateInput
                  ? format(dateInput, 'dd/MM/yyyy', { locale: ptBR })
                  : 'Selecione uma data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <PopoverClose asChild>
                <Calendar
                  mode="single"
                  selected={dateInput}
                  onSelect={(date) => {
                    setDateInput(date)
                    setOpen(false)
                  }}
                  initialFocus
                />
              </PopoverClose>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ListFilterIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  onClick={handleToggleCanceled}
                  size="sm"
                  className="w-full justify-start"
                >
                  {showCanceled ? 'Ocultar Cancelados' : 'Exibir Cancelados'}
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  onClick={handleTogglePassed}
                  size="sm"
                  className="w-full justify-start"
                >
                  {showPassed ? 'Ocultar Passados' : 'Exibir Passados'}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="h-[calc(100dvh-200px)] w-full rounded-md border p-4">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center w-full h-[calc(100dvh-400px)]">
            <Loader2 className="animate-spin" />
          </div>
        ) : error ? (
          <div className="grid place-items-center gap-4 p-8">
            <p>Algo deu errado na listagem.</p>
            {error?.message ? <p>Erro: {error?.message}</p> : null}
          </div>
        ) : !isLoading &&
          !error &&
          (!appointmentsFiltered || !appointmentsFiltered?.length) ? (
          <div className="grid place-items-center gap-4 p-8">
            <p className="text-center">Nenhum agendamento encontrado.</p>
          </div>
        ) : (
          <MotionCardsWrapper>
            {appointmentsFiltered?.map((appointment) => {
              const isBefore =
                isBeforeToday(parseISO(appointment.date)) ||
                (isToday(parseISO(appointment.date)) &&
                  isTimeBeforeNow(appointment.time))
              return (
                <Card
                  key={appointment._id}
                  className={cn(
                    `h-full transition-all hover:shadow-lg`,
                    isBefore ? 'border-red-500 opacity-60' : ''
                  )}
                >
                  <CardContent className="p-4 grid gap-2 w-full relative">
                    {appointment.canceled ? (
                      <Badge
                        variant="destructive"
                        className="absolute bottom-4 right-4"
                      >
                        Cancelado
                      </Badge>
                    ) : !isBefore ? (
                      <AppointmentCancelButton
                        id={appointment._id}
                        refetch={() => refetch()}
                      />
                    ) : null}
                    <div className="flex justify-end">
                      <Badge variant="outline">
                        {formatDateToDDMMYYYY(appointment.date)} às{' '}
                        {appointment.time}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1 justify-between">
                      <p>
                        <span className="font-semibold">Cliente: </span>
                        {appointment.clientId.name}
                      </p>
                      <p>
                        <span className="font-semibold">Serviço: </span>

                        {appointment.serviceId.name}
                      </p>
                      <p>
                        <span className="font-semibold">Preço: </span>

                        {formatBRL(appointment.serviceId.price)}
                      </p>
                      <p>
                        <span className="font-semibold">Duração: </span>
                        {appointment.serviceId.duration} min.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </MotionCardsWrapper>
        )}
      </ScrollArea>
    </>
  )
}
