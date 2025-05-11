'use client'
import { Badge } from '@/components/ui/badge'
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
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/http/type'
import { isBeforeToday } from '@/lib/date-fns'
import { containerVariants, itemVariants } from '@/lib/motion'
import { providerSchema, ProviderSchema } from '@/types/forms'
import { Provider } from '@/types/provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

const weekdays = [
  { label: 'Dom', value: '0' },
  { label: 'Seg', value: '1' },
  { label: 'Ter', value: '2' },
  { label: 'Qua', value: '3' },
  { label: 'Qui', value: '4' },
  { label: 'Sex', value: '5' },
  { label: 'Sáb', value: '6' },
]

export default function ProviderForm({
  onSubmit,
  initValues,
}: {
  onSubmit: (values: ProviderSchema) => Promise<ApiResponse<Provider>>
  initValues?: ProviderSchema
}) {
  const [preview, setPreview] = useState('')

  const { toast } = useToast()
  const providerForm = useForm<ProviderSchema>({
    resolver: zodResolver(providerSchema),
    defaultValues: initValues
      ? initValues
      : {
          workingHours: [{ start: '', end: '' }],
          closedDates: [],
          weeklyClosedDays: [],
        },
  })
  const { fields, append, remove } = useFieldArray({
    control: providerForm.control,
    name: 'workingHours',
  })

  const { setValue, watch } = providerForm

  const selectedDays = watch('weeklyClosedDays')?.map((d) => d.toString()) ?? []

  const selectedDates =
    watch('closedDates')?.map((date) =>
      parse(date, 'yyyy-MM-dd', new Date())
    ) ?? []

  const handleToggleChange = (values: string[]) => {
    const days = values.map((v) => parseInt(v))
    setValue('weeklyClosedDays', days, { shouldValidate: true })
  }

  const handleCalendarChange = (dates: Date[]) => {
    const dateObjects = dates.map((d) => d.toISOString().split('T')[0])
    setValue('closedDates', dateObjects, { shouldValidate: true })
  }

  const handleSubmit = async (values: ProviderSchema) => {
    const res = await onSubmit(values)

    if (!res.success) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado!',
        description: 'Falha ao atualizar dado.',
      })
    } else {
      toast({
        variant: 'success',
        title: 'Sucesso!',
        description: 'Dados atualizados.',
      })
    }
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      <div className="flex gap-4 items-center">
        <Button asChild size="icon">
          <Link href="/provider" className="flex items-center">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>

        <motion.h2 variants={itemVariants} className="text-2xl font-bold">
          Configurações
        </motion.h2>
      </div>

      <Form {...providerForm}>
        <form
          onSubmit={providerForm.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-4">
                <FormField
                  control={providerForm.control}
                  name="image"
                  render={({ field }) => {
                    const currentValue = field.value

                    const isFile = currentValue instanceof File
                    const previewUrl =
                      preview ||
                      (isFile
                        ? URL.createObjectURL(currentValue)
                        : typeof currentValue === 'string'
                        ? currentValue
                        : null)

                    return (
                      <FormItem>
                        <FormLabel>Sua foto</FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-4">
                            {previewUrl && (
                              <Image
                                src={previewUrl}
                                alt="Preview"
                                width={96}
                                height={96}
                                className="w-24 h-24 mx-auto rounded-full object-cover object-center border-2 border-gray-200"
                              />
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById('fileInput')?.click()
                              }
                            >
                              {currentValue
                                ? 'Trocar imagem'
                                : 'Selecionar imagem'}
                            </Button>

                            <input
                              id="fileInput"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  field.onChange(file)
                                  const reader = new FileReader()
                                  reader.onloadend = () =>
                                    setPreview(reader.result as string)
                                  reader.readAsDataURL(file)
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3>Horário de Expediente</h3>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-2 mt-4">
                    <FormField
                      control={providerForm.control}
                      name={`workingHours.${index}.start`}
                      render={({ field }) => (
                        <FormItem className="flex-1 ">
                          <FormLabel>Início</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={providerForm.control}
                      name={`workingHours.${index}.end`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Fim</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {index > 0 ? (
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        size="icon"
                        variant="destructive"
                      >
                        -
                      </Button>
                    ) : null}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ start: '', end: '' })}
                  className="w-full mt-4"
                >
                  + Adicionar Horário
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3>Dias da Semana Fechados</h3>
                <ToggleGroup
                  type="multiple"
                  className="grid grid-cols-4 gap-2 border-border border p-2 rounded-md mt-4"
                  value={selectedDays}
                  onValueChange={handleToggleChange}
                >
                  {weekdays.map((day) => (
                    <ToggleGroupItem
                      key={day.value}
                      value={day.value}
                      className="w-full"
                    >
                      {day.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h3>Dias específicos Fechados</h3>
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={(dates) => handleCalendarChange(dates ?? [])}
                className="rounded-md border max-w-fit mx-auto mt-4"
                disabled={(date) =>
                  watch('weeklyClosedDays')!.some(
                    (day) => day === date.getDay()
                  )
                }
                showOutsideDays={false}
              />
              <div className="text-sm mt-4 text-center">
                {selectedDates.length > 0 ? (
                  <div>
                    <p>Dias fechados: </p>
                    <div className="flex gap-1 flex-wrap justify-center mt-2">
                      {selectedDates.map((d, i) => (
                        <Badge variant="outline" key={i}>
                          {format(d, 'dd/MM')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>Nenhum dia fechado ainda.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={providerForm.formState.isSubmitting}
            className="w-full mt-auto bg-black hover:bg-gray-800 text-white md:col-span-2"
          >
            {providerForm.formState.isSubmitting
              ? 'Salvando..'
              : 'Salvar Dados'}
          </Button>
        </form>
      </Form>
    </motion.section>
  )
}
