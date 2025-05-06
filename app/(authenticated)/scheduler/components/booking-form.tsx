'use client'

import { AnimatedButton } from '@/components/ui/animated-button'
import { Card, CardContent } from '@/components/ui/card'
import { formatBRL } from '@/lib/intl'
import { containerVariants, itemVariants } from '@/lib/motion'
import { Provider } from '@/types/provider'
import { Service } from '@/types/service'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase,
  CalendarIcon,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Loader2,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DateStep from './components/DateStep'
import ProviderStep from './components/ProviderStep'
import ServiceStep from './components/ServiceStep'
import { createAppointment } from '@/http/fetch-appointment'
import { useToast } from '@/hooks/use-toast'
import { formatDate } from '@/lib/date-fns'

// Generate time slots from 8:00 to 18:00 in 30-minute intervals
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 8; hour <= 18; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 18 && minute === 30) continue // Skip 18:30
      const formattedHour = hour.toString().padStart(2, '0')
      const formattedMinute = minute.toString().padStart(2, '0')
      slots.push(`${formattedHour}:${formattedMinute}`)
    }
  }
  return slots
}

export const timeSlots = generateTimeSlots()

const stepVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function BookingForm({ providers }: { providers: Provider[] }) {
  const [step, setStep] = useState(1)

  const [provider, setProvider] = useState<Provider | null>(null)
  const [service, setService] = useState<Service | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      const res = createAppointment({
        date: formatDate(date!),
        time,
        serviceId: service?._id,
        providerId: provider?._id,
      })

      if (!res) {
        toast({
          variant: 'destructive',
          title: 'Algo deu errado!',
          description: 'Tente novamente mais tarde.',
        })
        return
      }
      setIsSuccess(true)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado!',
        description: 'Tente novamente mais tarde.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ProviderStep
            providers={providers}
            provider={provider}
            setProvider={setProvider}
          />
        )
      case 2:
        return (
          <ServiceStep
            providerId={provider?._id}
            service={service}
            setService={setService}
          />
        )
      case 3:
        return (
          <DateStep
            time={time}
            setTime={setTime}
            date={date}
            setDate={setDate}
            provider={provider}
            serviceId={service?._id}
          />
        )
      case 4:
        if (isSuccess) {
          return (
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
                Agendado com sucesso. Até breve!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  className="text-sm text-gray-500 hover:text-orange-600 underline underline-offset-2"
                  href="/user"
                >
                  Visualizar agendamentos
                </Link>
              </motion.div>
            </motion.div>
          )
        }

        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg p-4 border border-border"
            >
              <h3 className="font-medium text-xl mb-6 text-center">
                Resumo do agendamento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-black mr-2" />
                    <p className="text-gray-500">Profissional</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={
                        provider?.image
                          ? process.env.NEXT_PUBLIC_API_PATH + provider?.image
                          : '/placeholder.svg'
                      }
                      alt={provider?.userId.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{provider?.userId.name}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-black mr-2" />
                    <p className="text-gray-500">Serviço</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={
                        service?.image
                          ? process.env.NEXT_PUBLIC_API_PATH + service?.image
                          : '/placeholder.svg'
                      }
                      alt={service?.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{service?.name}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-black mr-2" />
                    <p className="text-gray-500">Data</p>
                  </div>
                  <p className="font-medium pl-7">
                    {date ? date.toLocaleDateString() : ''}
                  </p>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-black mr-2" />
                    <p className="text-gray-500">Horário</p>
                  </div>
                  <p className="font-medium pl-7">{time}</p>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-black mr-2" />
                    <p className="text-gray-500">Duração</p>
                  </div>
                  <p className="font-medium pl-7">
                    {service?.duration} minutes
                  </p>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-black mr-2" />
                    <p className="text-gray-500">Preço</p>
                  </div>
                  <p className="font-medium pl-7">
                    {formatBRL(service?.price!)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )
      default:
        return null
    }
  }

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return provider === null
      case 2:
        return service === null
      case 3:
        return !date || !time
      default:
        return false
    }
  }

  return (
    <Card className="w-full shadow-lg border-0 transition-[width] duration-500">
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-center">
              Passo {step} de 4
            </h2>
          </div>

          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: step >= stepNumber ? 1 : 0.8,
                    opacity: step >= stepNumber ? 1 : 0.5,
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stepNumber}
                </motion.div>
                <motion.span
                  className={`text-xs mt-2 ${
                    step >= stepNumber ? 'text-gray-800' : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: step >= stepNumber ? 1 : 0.5 }}
                >
                  {stepNumber === 1 && 'Profissional'}
                  {stepNumber === 2 && 'Serviço'}
                  {stepNumber === 3 && 'Data & Hora'}
                  {stepNumber === 4 && 'Confirmar'}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        <div className="booking-step-content max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
          {!isSuccess ? (
            <div className="flex justify-end space-x-2 mt-6">
              {step > 1 && (
                <AnimatedButton variant="outline" onClick={handleBack}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Voltar
                </AnimatedButton>
              )}
              {step < 4 ? (
                <AnimatedButton
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-2" />
                </AnimatedButton>
              ) : (
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
              )}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
