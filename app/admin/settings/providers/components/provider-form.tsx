'use client'
import { Button } from '@/components/ui/button'
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
import { containerVariants, itemVariants } from '@/lib/motion'
import { providerSchema, ProviderSchema } from '@/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'

export default function ProviderForm({
  onSubmit,
  initValues,
}: {
  onSubmit: (values: ProviderSchema) => Promise<boolean>
  initValues?: ProviderSchema
}) {
  const router = useRouter()
  const providerForm = useForm<ProviderSchema>({
    resolver: zodResolver(providerSchema),
    defaultValues: initValues
      ? initValues
      : {
          name: '',
          workingHours: [{ start: '', end: '' }],
        },
  })
  const { fields, append, remove } = useFieldArray({
    control: providerForm.control,
    name: 'workingHours',
  })

  const handleSubmit = async (values: ProviderSchema) => {
    const res = await onSubmit(values)
    if (!res) return

    router.push('/admin/settings/providers')
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="p-4">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold">
            Cadastrar Profissional
          </motion.h2>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex-1">
          <Form {...providerForm}>
            <form
              onSubmit={providerForm.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4 h-full"
            >
              <FormField
                control={providerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2">
                  <FormField
                    control={providerForm.control}
                    name={`workingHours.${index}.start`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
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
              >
                + Adicionar Horário
              </Button>

              <Button
                type="submit"
                className="w-full mt-auto bg-black hover:bg-gray-800 text-white"
              >
                Salvar Profissional
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.section>
  )
}
