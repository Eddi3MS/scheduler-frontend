import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getUsers } from '@/http/fetch-users'
import UpdateRoleButton from './components/update-role-button'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const res = await getUsers()

  if (!res.success) {
    redirect(`/feedback?error=${res.error}`)
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Usuários Cadastrados</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {res.data.map((user) => {
            return (
              <div key={user._id}>
                <Card
                  className={`cursor-pointer h-full transition-all hover:shadow-lg`}
                >
                  <CardContent className="p-4 grid gap-1 w-full">
                    <p>
                      <span className="font-bold">Nome:</span> {user.name}
                    </p>
                    <p>
                      <span className="font-bold">E-mail:</span> {user.email}
                    </p>
                    <p>
                      <span className="font-bold">Role:</span> {user.role}
                    </p>

                    {user.role === 'client' ? (
                      <UpdateRoleButton userId={user._id} role="provider" />
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </>
  )
}
