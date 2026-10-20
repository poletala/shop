import { Box, IconButton, Stack, Typography } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import type { Product } from '../data/products'
import { NavLink } from 'react-router'

type ProductCardProps = {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

export const ProductCard = ({ product, isFavorite, onToggleFavorite }: ProductCardProps) => {

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        textDecoration: 'none', color: 'inherit'
      }}
      component={NavLink}
      to={`/product/${product.id}`}
    >

      <Box
        component="img"
        src={product.image}
        alt={product.brand}
        loading="lazy"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {product.sale &&
        <Box
          sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 'fitContent',
          padding: '2px',
          backgroundColor: 'grey',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          lineHeight: '1'
        }}
        >
          -{product.sale}%
        </Box>
      }

      {product.new &&
        <Box
          sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 'fitContent',
          padding: '2px',
          backgroundColor: '#7FCE00',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          lineHeight: '1'
        }}
        >
          new
        </Box>
      }

      <IconButton
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onToggleFavorite(product.id)
        }}
        disableRipple
        aria-label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          color: isFavorite ? '#7FCE00' : '#fff',
          backdropFilter: 'blur(4px)',
          transition: 'color 0.2s ease, background-color 0.2s ease',
          '&:hover': {
            backgroundColor: '#fff',
            color: isFavorite ? '#7FCE00' : '#1a1a1a',
          },
        }}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>

      <Stack
        spacing={0.5}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '70%',
          pl: { xs: 2, md: 3 },
          pr: 1,
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {product.category}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '1.1rem', md: '1.4rem' },
            fontWeight: 700,
            color: 'text.primary',
            lineHeight: 1.1,
          }}
        >
          {product.brand}
        </Typography>

        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            color: 'text.primary',
            mt: 0.5,
          }}
        >
          {product.price} ₽
        </Typography>
      </Stack>
    </Box>
  )
}