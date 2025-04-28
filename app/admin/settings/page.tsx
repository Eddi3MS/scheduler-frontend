'use client'

import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { containerVariants, itemVariants } from '@/lib/motion'
import {
  FixedClosedDaysSchema,
  fixedClosedDaysSchema,
  specificClosedDaysSchema,
  SpecificClosedDaysSchema,
} from '@/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export default function AdminPage() {
  const specificClosedDaysForm = useForm<SpecificClosedDaysSchema>({
    resolver: zodResolver(specificClosedDaysSchema),
    defaultValues: { date: undefined },
  })

  const fixedClosedDaysForm = useForm<FixedClosedDaysSchema>({
    resolver: zodResolver(fixedClosedDaysSchema),
    defaultValues: { day: undefined },
  })

  function handleFixedClosedDaysSubmit(values: any) {
    console.log('Fechar dia fixo:', values)
  }

  function handleSpecificClosedDaysSubmit(values: any) {
    console.log('Fechar data específica:', values)
  }

  return (
    <main className="flex flex-col gap-12 p-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Header />
      <Link href="/admin/settings/providers">Profissionais</Link>
      <Link href="/admin/settings/services">Serviços</Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <Card className="h-full flex flex-col">
            <CardHeader className="p-4">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold">
                Dia Fechado
              </motion.h2>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex-1">
              <Form {...specificClosedDaysForm}>
                <form
                  onSubmit={specificClosedDaysForm.handleSubmit(
                    handleSpecificClosedDaysSubmit
                  )}
                  className="flex flex-col gap-4 h-full"
                >
                  <FormField
                    control={specificClosedDaysForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data específica a fechar</FormLabel>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => field.onChange(date)}
                            className="rounded-md border max-w-fit mx-auto"
                            disabled={(date) => date < new Date()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-auto">
                    Salvar data específica
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <Card className="h-full flex flex-col">
            <CardHeader className="p-4">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold">
                Dias Fixos Fechados
              </motion.h2>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex-1">
              <Form {...fixedClosedDaysForm}>
                <form
                  onSubmit={fixedClosedDaysForm.handleSubmit(
                    handleFixedClosedDaysSubmit
                  )}
                  className="flex flex-col gap-4 h-full"
                >
                  <FormField
                    control={fixedClosedDaysForm.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dia da semana a fechar</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Domingo</SelectItem>
                            <SelectItem value="1">Segunda-feira</SelectItem>
                            <SelectItem value="2">Terça-feira</SelectItem>
                            <SelectItem value="3">Quarta-feira</SelectItem>
                            <SelectItem value="4">Quinta-feira</SelectItem>
                            <SelectItem value="5">Sexta-feira</SelectItem>
                            <SelectItem value="6">Sábado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-auto">
                    Salvar dia fixo
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  )
}
