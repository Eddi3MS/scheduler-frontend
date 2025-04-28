'use client'

import { AnimatedButton } from '@/components/ui/animated-button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { providers } from '@/data/dummy'
import { containerVariants, itemVariants } from '@/lib/motion'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase,
  CalendarIcon,
  Check,
  CheckCheck,
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

// Sample data with improved details

const services = [
  {
    id: 1,
    name: 'Initial Consultation',
    description: 'First-time visit to discuss your health concerns',
    duration: 30,
    price: 50,
    icon: User,
  },
  {
    id: 2,
    name: 'Comprehensive Treatment',
    description: 'Complete treatment session for existing conditions',
    duration: 60,
    price: 100,
    icon: Briefcase,
  },
  {
    id: 3,
    name: 'Follow-up Visit',
    description: 'Quick check on your progress after treatment',
    duration: 30,
    price: 40,
    icon: CheckCheck,
  },
  {
    id: 4,
    name: 'Specialized Service',
    description: 'Advanced treatment for specific conditions',
    duration: 90,
    price: 150,
    icon: Briefcase,
  },
]

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

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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

  const handleConfirm = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Booking confirmed:', {
        provider: providers.find((p) => p.id === selectedProvider),
        service: services.find((s) => s.id === selectedService),
        date: selectedDate,
        time: selectedTime,
      })

      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            {providers.map((provider) => (
              <motion.div
                key={provider.id}
                variants={itemVariants}
                className="flex-1"
              >
                <Card
                  className={`cursor-pointer h-full min-w-44 transition-all hover:shadow-lg ${
                    selectedProvider === provider.id ? 'ring-2 ring-black' : ''
                  }`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <CardContent className="p-6">
                    <motion.div
                      className="flex flex-col items-center"
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="relative mb-4">
                        <img
                          src={provider.photo || '/placeholder.svg'}
                          alt={provider.name}
                          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        />
                        {selectedProvider === provider.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -bottom-2 -right-2 bg-black rounded-full p-1"
                          >
                            <CheckCircle className="text-white h-5 w-5" />
                          </motion.div>
                        )}
                      </div>
                      <h3 className="font-medium text-lg text-center">
                        {provider.name}
                      </h3>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {services.map((service) => {
              const ServiceIcon = service.icon
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <Card
                    className={`cursor-pointer h-full transition-all hover:shadow-lg ${
                      selectedService === service.id ? 'ring-2 ring-black' : ''
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardContent className="p-6">
                      <motion.div
                        className="flex items-start"
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div
                          className={`p-3 rounded-full mr-4 ${
                            selectedService === service.id
                              ? 'bg-gray-200'
                              : 'bg-gray-100'
                          }`}
                        >
                          <ServiceIcon
                            className={`h-6 w-6 ${
                              selectedService === service.id
                                ? 'text-black'
                                : 'text-gray-600'
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start relative">
                            <div>
                              <h3 className="font-medium text-lg">
                                {service.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {service.description}
                              </p>
                              <div className="flex items-center mt-3 space-x-4">
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span className="text-sm">
                                    {service.duration} min
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  <span className="text-sm font-medium">
                                    ${service.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {selectedService === service.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -right-4 -top-4"
                              >
                                <CheckCircle className="text-black h-5 w-5" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-2">
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-5 w-5 text-black mr-2" />
                <h3 className="font-medium text-lg">Selecione a Data</h3>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-2">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-black mr-2" />
                <h3 className="font-medium text-lg">Selecione o horário</h3>
              </div>
              {selectedDate ? (
                <motion.div
                  className="grid grid-cols-3 gap-2 border border-border p-3 rounded-md"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {timeSlots.map((time, index) => (
                    <motion.div
                      key={time}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant={selectedTime === time ? 'default' : 'outline'}
                        className={`cursor-pointer py-2 px-3 text-center justify-center w-full ${
                          selectedTime === time
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Selecione uma data
                </p>
              )}
            </motion.div>
          </motion.div>
        )
      case 4:
        const provider = providers.find((p) => p.id === selectedProvider)
        const service = services.find((s) => s.id === selectedService)

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
                      src={provider?.photo || '/placeholder.svg'}
                      alt={provider?.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{provider?.name}</p>
                      <p className="text-sm text-gray-500">
                        {provider?.specialty}
                      </p>
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
                  <div className="pl-7">
                    <p className="font-medium">{service?.name}</p>
                    <p className="text-sm text-gray-500">
                      {service?.description}
                    </p>
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
                    {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
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
                  <p className="font-medium pl-7">{selectedTime}</p>
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
                  <p className="font-medium pl-7">{service?.price}</p>
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
        return selectedProvider === null
      case 2:
        return selectedService === null
      case 3:
        return !selectedDate || !selectedTime
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
