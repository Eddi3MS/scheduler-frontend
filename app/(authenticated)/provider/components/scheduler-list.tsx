'use client'
import MotionCardsWrapper from '@/components/motion-cards-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import {
  formatDateToDDMMYYYY,
  isBeforeToday,
  isTimeBeforeNow,
} from '@/lib/date-fns'
import { formatBRL } from '@/lib/intl'
import { cn } from '@/lib/utils'
import { ProviderAppointment } from '@/types/appointment'
import { isToday, parseISO } from 'date-fns'
import { CheckIcon, ListFilterIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AppointmentCancelButton from '../../user/components/appointment-cancel-button'

export default function SchedulerList({
  appointmentsInit,
  providerId,
  isFuture = false,
}: {
  appointmentsInit: ProviderAppointment[]
  providerId: string
  isFuture?: boolean
}) {
  const [appointments, setAppointments] = useState(appointmentsInit)
  const [showCanceled, setShowCanceled] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/events/events/${providerId}`,
      { withCredentials: true }
    )

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.status === 'created') {
        setAppointments((curr) => {
          const newApp = [...curr, data.data]
          return newApp.sort((a, b) => b.time.localeCompare(a.time))
        })

        toast({
          variant: 'success',
          title: 'Novo agendamento!',
          description: `${data.data.clientId.name} agendou ${data.data.serviceId.name} às ${data.data.time}h`,
        })
      }

      if (data.status === 'canceled') {
        setAppointments((curr) =>
          curr.map((c) =>
            c._id === data.data._id ? { ...c, canceled: true } : c
          )
        )

        toast({
          variant: 'destructive',
          title: 'Agendamento Cancelado!',
          description: `${data.data.clientId.name} cancelou ${data.data.serviceId.name} às ${data.data.time}h`,
        })
      }
    }

    return () => {
      eventSource.close()
    }
  })

  const handleShow = () => {
    setShowCanceled((curr) => !curr)
  }

  const appointmentsFiltered = showCanceled
    ? appointments
    : appointments.filter((ap) => !ap.canceled)

  if (!appointments || !appointments.length) {
    return (
      <div className="grid place-items-center gap-4 p-8">
        <p>Ainda não há nenhum agendamento.</p>
        {!isFuture ? (
          <Link href="/provider/future">Ver agendamentos futuros?</Link>
        ) : null}
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Agenda {!isFuture ? 'Hoje' : null}:
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <ListFilterIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filtros</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button variant="ghost" onClick={handleShow} size="sm">
                {showCanceled ? <CheckIcon /> : ''} Cancelados
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4">
        <MotionCardsWrapper>
          {appointmentsFiltered.map((appointment) => {
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
                      className="absolute bottom-2 right-2"
                    >
                      Cancelado
                    </Badge>
                  ) : !isBefore ? (
                    <AppointmentCancelButton id={appointment._id} />
                  ) : null}
                  <div className="flex justify-between">
                    <Badge variant="outline">
                      {formatDateToDDMMYYYY(appointment.date)}
                    </Badge>
                    <span className="text-gray-500">
                      horário: {appointment.time}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 justify-between">
                    <p className="font-semibold">
                      Cliente: {appointment.clientId.name}
                    </p>
                    <p className="font-semibold">
                      Serviço: {appointment.serviceId.name}
                    </p>
                    <p className="font-semibold">
                      Preço: {formatBRL(appointment.serviceId.price)}
                    </p>
                    <p className="font-semibold">
                      Duração: {appointment.serviceId.duration} min.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </MotionCardsWrapper>
      </ScrollArea>
    </>
  )
}
