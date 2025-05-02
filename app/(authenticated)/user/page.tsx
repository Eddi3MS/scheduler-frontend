import MotionCardsWrapper from '@/components/motion-cards-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getOwnAppointments } from '@/http/fetch-appointment'
import {
  formatDateToDDMMYYYY,
  isBeforeToday,
  isTimeBeforeNow,
} from '@/lib/date-fns'
import { formatBRL } from '@/lib/intl'
import { cn } from '@/lib/utils'
import { Appointment } from '@/types/appointment'
import { isToday, parseISO } from 'date-fns'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

export default async function UserPage() {
  const appointments: Appointment[] = await getOwnAppointments()
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Agendamentos:</h2>
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/scheduler">
            Agendar
            <Calendar className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4">
        <MotionCardsWrapper>
          {appointments.map((appointment) => {
            return (
              <Card
                key={appointment._id}
                className={cn(
                  `h-full transition-all hover:shadow-lg`,
                  isBeforeToday(parseISO(appointment.date)) ||
                    (isToday(parseISO(appointment.date)) &&
                      isTimeBeforeNow(appointment.time))
                    ? 'border-red-500 opacity-60'
                    : ''
                )}
              >
                <CardContent className="p-4 grid gap-2 w-full">
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
