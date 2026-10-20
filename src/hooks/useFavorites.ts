import { useCallback, useContext, useEffect, useState } from 'react'
import { FavoritesAuthContext } from '../context/FavoritesAuthContext'
import { useAuth } from './useAuth'

const STORAGE_KEY = 'favorites'

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const { user } = useAuth()
  const requestSignIn = useContext(FavoritesAuthContext)
  const [favorites, setFavorites] = useState<string[]>(readFavorites)

  // Слушаем изменения из других вкладок
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavorites(readFavorites())
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const toggle = useCallback((id: string) => {
    if (!user) {
      if (!requestSignIn) throw new Error('useFavorites must be used inside FavoritesAuthPrompt')
      requestSignIn()
      return
    }
    const prev = readFavorites()
    const next = prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setFavorites(next)
  }, [user, requestSignIn])

  const isFavorite = useCallback(
    (id: string) => Boolean(user) && favorites.includes(id),
    [favorites, user]
  )

  return { favorites: user ? favorites : [], toggle, isFavorite }
}
