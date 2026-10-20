import { Box, Typography } from '@mui/material'
import { Navigate } from 'react-router'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { useFavorites } from '../hooks/useFavorites'
import { useAuth } from '../hooks/useAuth'

export const Saved = () => {
  const { user } = useAuth()
  const { favorites, toggle } = useFavorites()

  if (!user) {
    return <Navigate to='/account?returnTo=/saved' replace />
  }

  const savedProducts = products.filter((p) => favorites.includes(p.id))

  if (savedProducts.length === 0) {
    return (
      <Box sx={{ p: { xs: 3, md: 6 }, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          В избранном пока пусто
        </Typography>
        <Typography color="text.secondary">
          Нажмите на сердечко на карточке товара, чтобы добавить его сюда
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        избранное
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {savedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={true}
            onToggleFavorite={toggle}
          />
        ))}
      </Box>
    </Box>
  )
}
