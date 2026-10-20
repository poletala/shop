import { Box } from '@mui/material'
import { ProductCard } from './ProductCard'
import { products } from '../data/products'
import { useFavorites } from '../hooks/useFavorites'
import { useSearchParams } from 'react-router'

export const ProductCards = () => {
  const [searchParams] = useSearchParams()
  const brandFilter = searchParams.get('brand')
  const filtered = brandFilter
    ? products.filter((p) => p.brand === brandFilter)
    : products

  const { favorites, toggle } = useFavorites()
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
        gap: 2,
        p: { xs: 2, md: 4 },
      }}
    >
      {filtered.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={toggle}
        />
      ))}
    </Box>
  )
}