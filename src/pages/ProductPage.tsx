import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { ShoppingBagOutlined, Favorite, FavoriteBorder } from '@mui/icons-material'
import { useFavorites } from '../hooks/useFavorites'
import { useCart } from '../hooks/useCart'
import { ActionButton } from '../components/ActionButton'
import { getProductById } from '../data/products'

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined

  const [activeImage, setActiveImage] = useState(0)
  const { favorites, toggle } = useFavorites()
  const { add, items } = useCart()
  const navigate = useNavigate()

  if (!product) {
    return <Navigate to="/catalog" replace />
  }

  const isFavorite = favorites.includes(product.id)
  const isInCart = items.some((item) => item.id === product.id)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
        xs: '1fr',
        md: '150px 0.8fr 320px',
        },
        gap: { xs: 3, md: 6 },
        p: { xs: 2, md: 7 },
        maxWidth: 1400,
        mx: 'auto',
      }}
    >
      {/* Левая колонка — миниатюры */}
      <Stack spacing={1.5} sx={{ order: { xs: 2, md: 1 } }}>
        {product.gallery.map((img, index) => (
          <Box
            key={img}
            component="img"
            src={img}
            alt={`${product.brand} ${index + 1}`}
            onClick={() => setActiveImage(index)}
            sx={{
              width: '100%',
              aspectRatio: '1 / 1',
              objectFit: 'cover',
              cursor: 'pointer',
              border: index === activeImage ? '2px solid #7FCE00' : '2px solid transparent',
              transition: 'border-color 0.2s ease, opacity 0.2s ease',
              opacity: index === activeImage ? 1 : 0.7,
              '&:hover': { opacity: 1 },
            }}
          />
        ))}
      </Stack>

      {/* Центр — большая картинка */}
      <Box
        component="img"
        src={product.gallery[activeImage]}
        alt={product.brand}
        sx={{
          order: { xs: 1, md: 2 },
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          position: 'relative',
        }}
      />

      {/* Правая колонка — текст + кнопки */}
      <Stack
        sx={{
          order: { xs: 3, md: 3 },
          position: { md: 'sticky' },
          top: { md: 100 },
          alignSelf: 'center',
        }}
      >

        <Typography
          variant="h2"
          sx={{
            position: 'absolute',
            left: { xs: '-10%', md: '-30%' },
            top: '-35%',
            fontWeight: 700,
            color: 'text.primary',
            lineHeight: 1,
            zIndex: 2,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {product.brand}
        </Typography>

        <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
          {product.description}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {product.price} ₽
        </Typography>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
          <ActionButton
            startIcon={<ShoppingBagOutlined />}
            onClick={() => isInCart ? navigate('/cart') : add(product.id)}
            sx={{ flexGrow: 1, minWidth: 0 }}
          >
            {isInCart ? 'В корзине' : 'Купить'}
          </ActionButton>

          <IconButton
            onClick={() => toggle(product.id)}
            disableRipple
            sx={{
              width: 56,
              height: 56,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 0,
              color: isFavorite ? '#7FCE00' : 'text.primary',
              '&:hover': {
                borderColor: isFavorite ? '#7FCE00' : 'text.primary',
                backgroundColor: 'transparent',
              },
            }}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  )
}
