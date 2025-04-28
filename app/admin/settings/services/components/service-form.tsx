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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatBRL } from '@/lib/intl'
import { containerVariants, itemVariants } from '@/lib/motion'
import { serviceSchema, ServiceSchema } from '@/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function ServiceForm({
  onSubmit,
  initValues,
  providerOptions,
}: {
  onSubmit: (values: ServiceSchema) => Promise<boolean>
  initValues?: ServiceSchema
  providerOptions: { name: string; id: string }[]
}) {
  const router = useRouter()

  const serviceForm = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initValues
      ? initValues
      : {
          providerId: '',
          name: '',
          price: '',
          duration: '',
        },
  })

  const handleSubmit = async (values: ServiceSchema) => {
    const res = await onSubmit(values)
    if (!res) return

    router.push('/admin/settings/services')
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
            Cadastrar Serviço
          </motion.h2>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex-1">
          <Form {...serviceForm}>
            <form
              onSubmit={serviceForm.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4 h-full"
            >
              <FormField
                control={serviceForm.control}
                name="providerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profissional</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {providerOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={serviceForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Serviço</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={serviceForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={formatBRL(Number(field.value || 0))}
                        onChange={(e) => {
                          const rawValue = e.target.value
                          const onlyNumbers = rawValue.replace(/\D/g, '')
                          const cents = parseInt(onlyNumbers || '0', 10)

                          field.onChange(String(cents))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={serviceForm.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração (min)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-auto bg-black hover:bg-gray-800 text-white"
              >
                Salvar Serviço
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.section>
  )
}
