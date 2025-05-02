import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getUsers } from '@/http/fetch-users'
import UpdateRoleButton from './components/update-role-button'

export default async function AdminPage() {
  const users = await getUsers()
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Agenda</h2>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user: any) => {
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

                    <UpdateRoleButton userId={user._id} />
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
