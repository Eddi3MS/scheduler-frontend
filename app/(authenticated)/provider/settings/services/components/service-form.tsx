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
import { formatBRL } from '@/lib/intl'
import { containerVariants, itemVariants } from '@/lib/motion'
import { ACCEPTED_IMAGE_TYPES } from '@/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const imageSchema = z.union([
  z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Formatos suportados: .JPEG, .JPG, .PNG, .WEBP',
    }),
  z.string().url(), // Permite string (URL) em caso de edição
])

export const serviceSchema = z.object({
  providerId: z.string().min(1, 'Selecione um profissional'),
  name: z.string().min(2, 'Nome do serviço é obrigatório'),
  price: z.string().min(1, 'Preço obrigatório'),
  duration: z.string().min(1, 'Duração obrigatória'),
  image: imageSchema.optional(),
})

export type ServiceSchema = z.infer<typeof serviceSchema>

export default function ServiceForm({
  onSubmit,
  initValues,
}: {
  onSubmit: (values: ServiceSchema) => Promise<boolean>
  initValues?: ServiceSchema
}) {
  const [preview, setPreview] = useState('')
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

    router.push('/provider/settings/services')
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
                      <FormLabel>Imagem do Serviço</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-4">
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

                          {previewUrl && (
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              width={96}
                              height={96}
                              className="w-24 h-24 rounded-full object-cover object-center border-2 border-gray-200"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
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
