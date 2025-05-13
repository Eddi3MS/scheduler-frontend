'use client'

import { useUser } from '@/providers/user-context'
import { AnimatedButton } from '@/components/ui/animated-button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { registerSchema, RegisterSchema } from '@/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { redirectPaths, User } from '@/types/user'
import { useState } from 'react'

export default function RegisterForm() {
  const router = useRouter()
  const { setUser } = useUser()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: RegisterSchema) => {
    try {
      setIsLoading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        }
      )

      const data = await res.json()

      if (!res.ok || res.status !== 201) {
        throw new Error(data?.error || data?.message || 'Falha na requisição')
      }

      const route = redirectPaths[data.role as keyof typeof redirectPaths]

      setUser(data)
      router.push(route)
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado!',
        description: error?.message || 'Tente novamente mais tarde.',
      })
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="w-full shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl">Registre-se</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite seu nome"
                          autoComplete="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite seu e-mail"
                          type="email"
                          autoComplete="username"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite sua senha"
                          autoComplete="new-password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </CardContent>

            <CardFooter className="flex-col items-stretch space-y-2">
              <AnimatedButton
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  'Registrar'
                )}
              </AnimatedButton>

              <motion.p
                className="text-sm text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Já tem uma conta?{' '}
                <Link
                  href="/"
                  className="text-orange-600 hover:text-orange-400 underline transition-colors"
                >
                  Entre aqui
                </Link>
              </motion.p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </motion.div>
  )
}
