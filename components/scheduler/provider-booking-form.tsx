'use client'

import DateStep from '@/components/scheduler/DateStep'
import ServiceStep from '@/components/scheduler/ServiceStep'
import { AnimatedButton } from '@/components/ui/animated-button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { createAppointmentByProvider } from '@/http/fetch-appointment'
import { formatDate } from '@/lib/date-fns'
import { Provider } from '@/types/provider'
import { Service } from '@/types/service'
import { useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Check, CheckCircle, Loader2, Star, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'

export default function ProviderBookingForm({
  provider,
}: {
  provider: Provider
}) {
  const queryClient = useQueryClient()
  const [service, setService] = useState<Service | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  const [client, setClient] = useState({
    clientName: '',
    clientEmail: '',
  })

  const resetState = () => {
    setService(null)
    setDate(undefined)
    setTime(null)
    setIsSuccess(false)
    setClient({
      clientName: '',
      clientEmail: '',
    })
  }

  const handleConfirm = async () => {
    setIsLoading(true)

    const res = await createAppointmentByProvider({
      date: formatDate(date!),
      time,
      serviceId: service?._id,
      providerId: provider._id,
      ...client,
    })

    if (!res.success) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado!',
        description: res.error || 'Tente novamente mais tarde.',
      })
    } else {
      queryClient.invalidateQueries({ queryKey: ['provider-appointments'] })
      toast({
        variant: 'success',
        title: 'Sucesso!',
        description: 'Agendamento concluído com sucesso.',
      })
    }
    setIsSuccess(true)
    setIsLoading(false)
  }

  return (
    <Card className="w-full shadow-lg border-0 transition-[width] duration-500">
      <CardContent className="p-6">
        {!isSuccess ? (
          <div className="booking-step-content max-w-2xl space-y-4">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-black mr-2" />
              <h3 className="font-medium text-lg">Dados do cliente</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                value={client.clientName}
                onChange={(e) => {
                  setClient((curr) => ({ ...curr, clientName: e.target.value }))
                }}
                placeholder="Nome do cliente"
              />

              <Input
                value={client.clientEmail}
                onChange={(e) => {
                  setClient((curr) => ({
                    ...curr,
                    clientEmail: e.target.value,
                  }))
                }}
                placeholder="E-mail do cliente"
              />
            </div>
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-black mr-2" />
              <h3 className="font-medium text-lg">Serviços disponíveis</h3>
            </div>

            <ServiceStep
              providerId={provider._id}
              service={service}
              setService={setService}
            />
            <DateStep
              time={time}
              setTime={setTime}
              date={date}
              setDate={setDate}
              provider={provider}
              serviceId={service?._id}
            />

            <div className="flex justify-end space-x-2 mt-6">
              <AnimatedButton
                onClick={handleConfirm}
                disabled={isLoading}
                className="bg-black text-white hover:bg-gray-800"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="h-16 w-16 text-white mr-2" />
                    Confirmar
                  </>
                )}
              </AnimatedButton>
            </div>
          </div>
        ) : (
          <motion.div
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-full bg-green-500 p-4 mx-auto max-w-fit mb-4">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>

            <motion.h2
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Confirmado!
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Agendado com sucesso.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-4"
            >
              <Link
                className="text-sm text-gray-500 hover:text-orange-600 underline underline-offset-2"
                href="/provider"
              >
                Visualizar agendamentos
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button onClick={resetState}>Agendar Novo</Button>
            </motion.div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
