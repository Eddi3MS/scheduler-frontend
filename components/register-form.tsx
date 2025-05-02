'use client'

import { useUser } from '@/contexts/user-context'
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

export default function RegisterForm() {
  const router = useRouter()
  const { setUser } = useUser()
  const { toast } = useToast()

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: RegisterSchema) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        }
      )

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Algo deu errado!',
          description: 'Tente novamente mais tarde.',
        })
        return
      }

      const data = await response.json()

      if (response.status !== 201) {
        toast({
          variant: 'destructive',
          title: 'Algo deu errado!',
          description: data.error,
        })
        return
      }

      const route = data.role === 'admin' ? '/admin' : '/user'

      setUser(data)
      router.push(route)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado!',
        description: 'Tente novamente mais tarde.',
      })
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
                        <Input {...field} placeholder="Digite seu nome" />
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
