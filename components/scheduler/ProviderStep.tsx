import { Card, CardContent } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/motion'
import { Provider } from '@/types/provider'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

export default function ProviderStep({
  providers,
  provider,
  setProvider,
}: {
  providers: Provider[]
  setProvider: Dispatch<SetStateAction<Provider | null>>
  provider: Provider | null
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-4"
    >
      {providers.map((pvd) => (
        <motion.div key={pvd._id} variants={itemVariants} className="flex-1">
          <Card
            className={`cursor-pointer h-full min-w-44 transition-all hover:shadow-lg ${
              pvd._id === provider?._id ? 'ring-2 ring-black' : ''
            }`}
            onClick={() => setProvider(pvd)}
          >
            <CardContent className="p-6">
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative mb-4">
                  <Image
                    src={
                      pvd.image
                        ? process.env.NEXT_PUBLIC_API_PATH + pvd.image
                        : '/placeholder.svg'
                    }
                    alt={pvd.userId.name}
                    width={98}
                    height={98}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  {pvd._id === provider?._id && (
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
                  {pvd.userId.name}
                </h3>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
