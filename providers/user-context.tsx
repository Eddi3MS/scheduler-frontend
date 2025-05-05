'use client'

import { User } from '@/types/user'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type UserContextData = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

type UserContextProps = {
  children: ReactNode
  initUser: User
}

const UserContext = createContext({ user: null } as UserContextData)

export const UserContextProvider = ({
  children,
  initUser,
}: UserContextProps) => {
  const [user, setUser] = useState<User>(initUser)

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
