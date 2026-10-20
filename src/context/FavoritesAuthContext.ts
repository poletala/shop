import { createContext } from 'react'

export const FavoritesAuthContext = createContext<(() => void) | null>(null)
