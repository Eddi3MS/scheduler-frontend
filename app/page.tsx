import LoginForm from '@/components/login-form'
import { PageTransition } from '@/components/ui/page-transition'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <PageTransition>
        <div className="w-full max-w-md min-w-[min(350px,80vw)]">
          <h1 className="text-4xl font-bold text-center">Sua Marca</h1>
          <p className="text-center text-gray-500 mb-8">
            Sistema de agendamentos
          </p>
          <LoginForm />
        </div>
      </PageTransition>
    </main>
  )
}
