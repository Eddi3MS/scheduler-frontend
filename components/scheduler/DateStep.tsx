import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { getAvailableTime } from '@/http/fetch-appointment'
import { formatDate, isBeforeToday } from '@/lib/date-fns'
import { containerVariants, itemVariants } from '@/lib/motion'
import { Provider } from '@/types/provider'
import { motion } from 'framer-motion'
import { CalendarIcon, Clock } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function DateStep({
  provider,
  serviceId,
  date,
  setDate,
  time,
  setTime,
}: {
  provider: Provider | null
  serviceId: string | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>>
  date: Date | undefined
  time: string | null
  setTime: Dispatch<SetStateAction<string | null>>
}) {
  const [availableTime, setAvailableTime] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!date || !serviceId || !provider) return

    const formattedDate = date.toISOString().split('T')[0]

    const getTime = async () => {
      setLoading(true)

      const res = await getAvailableTime(serviceId, provider._id, formattedDate)

      if (!res.success) {
        toast({
          variant: 'destructive',
          title: 'Algo deu errado!',
          description: res.error || 'Tente novamente mais tarde.',
        })
      } else {
        setAvailableTime(res.data)
      }

      setLoading(false)
    }

    getTime()
  }, [date])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[min(90%,600px)]"
    >
      <motion.div variants={itemVariants} className="bg-white">
        <div className="flex items-center mb-4">
          <CalendarIcon className="h-5 w-5 text-black mr-2" />
          <h3 className="font-medium text-lg">Selecione a Data</h3>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(date) =>
            !serviceId ||
            isBeforeToday(date) ||
            !!provider?.weeklyClosedDays.includes(date.getDay()) ||
            !!provider?.closedDates?.includes(formatDate(date))
          }
          showOutsideDays={false}
        />
      </motion.div>
      <motion.div variants={itemVariants} className="bg-white">
        <div className="flex items-center mb-4">
          <Clock className="h-5 w-5 text-black mr-2" />
          <h3 className="font-medium text-lg">Selecione o horário</h3>
        </div>
        <ScrollArea className="h-[250px] w-full rounded-md border p-2">
          {loading ? (
            <div className="grid grid-cols-3 gap-2 border border-border p-3 rounded-md animate-pulse">
              {Array.from({ length: 21 }).map((_, i) => (
                <div key={i}>
                  <Badge
                    variant="outline"
                    className={`cursor-pointer py-2 px-3 text-center justify-center w-full bg-border animate-pulse`}
                  >
                    <span className="text-transparent" aria-hidden={true}>
                      11:11
                    </span>
                  </Badge>
                </div>
              ))}
            </div>
          ) : date && availableTime.length ? (
            <motion.div
              className="grid grid-cols-3 gap-2 border border-border p-3 rounded-md"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {availableTime.map((t, index) => (
                <motion.div
                  key={t}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={time === t ? 'default' : 'outline'}
                    className={`cursor-pointer py-2 px-3 text-center justify-center w-full ${
                      time === t
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setTime(t)}
                  >
                    {t}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          ) : date && !availableTime.length ? (
            <p className="text-gray-500 text-center py-8">
              Nenhum horário disponível
            </p>
          ) : (
            <p className="text-gray-500 text-center py-8">Selecione uma data</p>
          )}
        </ScrollArea>
      </motion.div>
    </motion.div>
  )
}
