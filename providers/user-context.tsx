'use client'

import getUserId from '@/actions/get-user-id'
import { User as UserType } from '@/types/user'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

type User = UserType | null

type UserContextData = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

type UserContextProps = {
  children: ReactNode
}

const UserContext = createContext({ user: null } as UserContextData)

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const initUser = await getUserId()
      setUser(initUser)
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('context must be used within an Provider')
  }

  return context
}
