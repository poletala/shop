import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type User } from './AuthContext'

const STORAGE_KEY = 'user'

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const value = raw ? JSON.parse(raw) : null
    if (
      value &&
      typeof value.name === 'string' &&
      value.name.trim() &&
      typeof value.email === 'string' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email.trim())
    ) {
      return { name: value.name.trim(), email: value.email.trim() }
    }
  } catch {
    // Missing, unavailable or invalid storage is treated as a signed-out state.
  }
  return null
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(readUser)

  useEffect(() => {
    const syncUser = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        setUser(readUser())
      }
    }
    window.addEventListener('storage', syncUser)
    return () => window.removeEventListener('storage', syncUser)
  }, [])

  const signIn = useCallback((input: User) => {
    const nextUser = { name: input.name.trim(), email: input.email.trim() }
    if (!nextUser.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextUser.email)) {
      throw new Error('Укажите имя и корректную почту')
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
