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
import {
  formatDateToDDMMYYYY,
  isBeforeToday,
  isTimeBeforeNow,
  isTimeTwoHoursAfterNow,
} from '@/lib/date-fns'
import { formatBRL } from '@/lib/intl'
import { cn } from '@/lib/utils'
import { Appointment } from '@/types/appointment'
import { isToday, parseISO } from 'date-fns'
import { CheckIcon, ListFilterIcon } from 'lucide-react'
import { useState } from 'react'
import AppointmentCancelButton from './appointment-cancel-button'

export default function SchedulerList({
  appointmentsInit,
}: {
  appointmentsInit: Appointment[]
}) {
  const [showCanceled, setShowCanceled] = useState(true)

  const handleShow = () => {
    setShowCanceled((curr) => !curr)
  }

  const appointmentsFiltered = showCanceled
    ? appointmentsInit
    : appointmentsInit.filter((ap) => !ap.canceled)
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Agendamentos:</h2>

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

      <ScrollArea className="h-[calc(100dvh-200px)] w-full rounded-md border p-4">
        <MotionCardsWrapper>
          {appointmentsFiltered.map((appointment) => {
            const isBefore =
              isBeforeToday(parseISO(appointment.date)) ||
              (isToday(parseISO(appointment.date)) &&
                isTimeBeforeNow(appointment.time))
            const isAfterToday =
              !isBeforeToday(parseISO(appointment.date)) &&
              !isToday(parseISO(appointment.date))
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
                  ) : (isToday(parseISO(appointment.date)) &&
                      isTimeTwoHoursAfterNow(appointment.time)) ||
                    isAfterToday ? (
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
                      Profissional: {appointment.providerId.userId.name}
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
