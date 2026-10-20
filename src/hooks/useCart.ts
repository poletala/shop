import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'cart'
const CART_UPDATED_EVENT = 'cart-updated'

export type CartItem = {
  id: string
  qty: number
  name?: string
  price?: number
  image?: string
  category?: string
}

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(CART_UPDATED_EVENT))
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(read)

  useEffect(() => {
    const sync = () => setItems(read())
    window.addEventListener(CART_UPDATED_EVENT, sync)
    window.addEventListener('storage', sync)

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const add = useCallback((id: string) => {
    const prev = read()
    const existing = prev.find((item) => item.id === id)
    const next = existing
      ? prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
      : [...prev, { id, qty: 1 }]
    save(next)
    setItems(next)
  }, [])

  const remove = useCallback((id: string) => {
    const next = read().filter((item) => item.id !== id)
    save(next)
    setItems(next)
  }, [])

  const decrease = useCallback((id: string) => {
    const next = read().flatMap((item) => {
      if (item.id !== id) return [item]
      return item.qty > 1 ? [{ ...item, qty: item.qty - 1 }] : []
    })
    save(next)
    setItems(next)
  }, [])

  const addGiftCard = useCallback((amount: number) => {
    const id = `gift-card-${amount}`
    const prev = read()
    const existing = prev.find((item) => item.id === id)
    const next = existing
      ? prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
      : [...prev, { id, qty: 1, name: 'Подарочная карта', price: amount, image: '/pics/gift-carts.webp', category: 'подарочная карта' }]
    save(next)
    setItems(next)
  }, [])

  return { items, add, remove, decrease, addGiftCard }
}
