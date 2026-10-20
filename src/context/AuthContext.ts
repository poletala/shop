import { createContext } from 'react'

export type User = {
  name: string
  email: string
}

export const AuthContext = createContext<{
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
} | null>(null)
