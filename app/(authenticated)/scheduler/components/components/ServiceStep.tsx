import React, { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/motion'
import { Provider } from '@/types/provider'
import { motion } from 'framer-motion'
import {
  CheckCheck,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2Icon,
} from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Service } from '@/types/service'
import { getServicesByProviderId } from '@/http/fetch-services'
import { formatBRL } from '@/lib/intl'

export default function ServiceStep({
  providerId,
  service,
  setService,
}: {
  providerId?: string | null
  setService: Dispatch<SetStateAction<Service | null>>
  service: Service | null
}) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!providerId) return

    const getServices = async () => {
      setLoading(true)
      const res = await getServicesByProviderId(providerId)
      setServices(res)
      setLoading(false)
    }

    getServices()
  }, [providerId])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
    >
      {loading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Card
                className={`cursor-pointer h-full transition-all hover:shadow-lg animate-pulse`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-full mr-4 bg-gray-100`}>
                      <CheckCheck className={`h-6 w-6 text-gray-300`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start relative">
                        <div>
                          <h3 className="font-medium text-lg h-4 w-full bg-gray-200"></h3>

                          <div className="flex items-center mt-3 space-x-4">
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1 text-gray-300" />
                              <span
                                className="text-sm text-transparent h-4  bg-gray-200"
                                aria-hidden={true}
                              >
                                35 min
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <DollarSign className="h-4 w-4 mr-1 text-gray-300" />
                              <span
                                className="text-sm text-transparent font-medium h-4  bg-gray-200"
                                aria-hidden={true}
                              >
                                R$ 35,00
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </>
      ) : services.length ? (
        <>
          {services.map((s) => {
            return (
              <motion.div key={s._id} variants={itemVariants}>
                <Card
                  className={`cursor-pointer h-full transition-all hover:shadow-lg ${
                    service?._id === s._id ? 'ring-2 ring-black' : ''
                  }`}
                  onClick={() => setService(s)}
                >
                  <CardContent className="p-6">
                    <motion.div
                      className="flex items-start"
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div
                        className={`p-3 rounded-full mr-4 ${
                          service?._id === s._id ? 'bg-gray-200' : 'bg-gray-100'
                        }`}
                      >
                        <CheckCheck
                          className={`h-6 w-6 ${
                            service?._id === s._id
                              ? 'text-black'
                              : 'text-gray-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start relative">
                          <div>
                            <h3 className="font-medium text-lg">{s.name}</h3>

                            <div className="flex items-center mt-3 space-x-4">
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-1 text-black" />
                                <span className="text-sm">
                                  {s.duration} min
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <DollarSign className="h-4 w-4 mr-1 text-black" />
                                <span className="text-sm font-medium">
                                  {formatBRL(s.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                          {service?._id === s._id && (
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
        </>
      ) : (
        <div className="flex justify-center md:col-span-2 py-16">
          <p>Nenhum serviço cadastrado.</p>
        </div>
      )}
    </motion.div>
  )
}
