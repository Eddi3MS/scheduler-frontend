'use client'

import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { containerVariants, itemVariants } from '@/lib/motion'
import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'
import Link from 'next/link'

const mockAppointments = [
  {
    id: 1,
    date: '2025-05-01',
    time: '14:00',
    provider: 'Barber Mike',
    service: 'Haircut',
    price: '$30',
  },
  {
    id: 2,
    date: '2025-05-05',
    time: '10:00',
    provider: 'Barber Sarah',
    service: 'Beard Trim',
    price: '$15',
  },
  {
    id: 3,
    date: '2025-05-05',
    time: '10:00',
    provider: 'Barber Sarah',
    service: 'Beard Trim',
    price: '$15',
  },
  {
    id: 4,
    date: '2025-05-05',
    time: '10:00',
    provider: 'Barber Sarah',
    service: 'Beard Trim',
    price: '$15',
  },
]

export default function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col justify-start gap-4 p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      {/* Appointments List */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Agenda</h2>
        <Button
          asChild
          className="bg-black text-white hover:bg-gray-800"
          size="icon"
        >
          <Link href="/admin/settings">
            <span className="sr-only">Configurações</span>
            <Settings className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {mockAppointments.map((appointment) => {
            return (
              <motion.div key={appointment.id} variants={itemVariants}>
                <Card
                  className={`cursor-pointer h-full transition-all hover:shadow-lg`}
                >
                  <CardContent className="p-4 grid gap-2 w-full">
                    <div className="flex justify-between">
                      <span className="font-medium">{appointment.date}</span>
                      <span className="text-gray-500">{appointment.time}</span>
                    </div>
                    <div className="flex flex-col gap-2 justify-between">
                      <p className="font-semibold">{appointment.provider}</p>
                      <div className="flex gap-2 justify-between">
                        <p className="font-semibold">{appointment.service}</p>
                        <p className="text-gray-600">{appointment.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </ScrollArea>
    </main>
  )
}
