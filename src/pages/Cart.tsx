import { Add, DeleteOutlined, Remove, ShoppingBagOutlined } from '@mui/icons-material'
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router'
import { ActionButton } from '../components/ActionButton'
import { products, type Product } from '../data/products'
import { useCart } from '../hooks/useCart'
import { publicAsset } from '../utils/publicAsset'

const formatPrice = (price: number) => `${price.toLocaleString('ru-RU')} ₽`

export const Cart = () => {
  const { items, add, remove, decrease, addGiftCard } = useCart()
  const cartProducts = items.flatMap((item) => {
    const product = products.find((product) => product.id === item.id)
      ?? (item.price !== undefined && item.name && item.image
        ? { id: item.id, image: item.image, category: item.category ?? '', brand: item.name, price: item.price, gallery: [item.image], description: '' } satisfies Product
        : undefined)
    return product ? [{ product, qty: item.qty }] : []
  })
  const total = cartProducts.reduce((sum, item) => sum + item.product.price * item.qty, 0)
  const amount = cartProducts.reduce((sum, item) => sum + item.qty, 0)

  if (cartProducts.length === 0) {
    return (
      <Stack sx={{ minHeight: '55vh', px: 2, py: { xs: 8, md: 12 }, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <ShoppingBagOutlined sx={{ fontSize: 48, mb: 2, color: 'text.secondary' }} />
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>корзина пуста</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>добавьте товары, чтобы оформить заказ</Typography>
      </Stack>
    )
  }

  return (
    <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 5 }, py: { xs: 3, md: 6 } }}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: { xs: 3, md: 5 } }}>
        корзина <Typography component="span" variant="inherit" color="text.secondary">({amount})</Typography>
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 330px' }, gap: { xs: 4, md: 8 }, alignItems: 'start' }}>
        <Stack divider={<Divider flexItem />}>
          {cartProducts.map(({ product, qty }) => (
            <Stack key={product.id} direction="row" spacing={{ xs: 1.5, sm: 3 }} sx={{ py: 2.5 }}>
              <Box component={NavLink} to={`/product/${product.id}`} sx={{ width: { xs: 94, sm: 140 }, flexShrink: 0, aspectRatio: '1', display: 'block' }}>
                <Box component="img" src={publicAsset(product.image)} alt={product.brand} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </Box>

              <Stack sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'text.secondary' }}>{product.category}</Typography>
                <Typography component={NavLink} to={`/product/${product.id}`} sx={{ color: 'text.primary', textDecoration: 'none', fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 700, mt: 0.25 }}>{product.brand}</Typography>
                <Typography sx={{ mt: 1, fontWeight: 600 }}>{formatPrice(product.price)}</Typography>

                <Stack direction="row" sx={{ mt: 'auto', pt: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', border: '1px solid', borderColor: 'divider' }}>
                    <IconButton aria-label="Уменьшить количество" onClick={() => decrease(product.id)} size="small" disableRipple><Remove fontSize="small" /></IconButton>
                    <Typography sx={{ minWidth: 34, textAlign: 'center' }}>{qty}</Typography>
                    <IconButton aria-label="Увеличить количество" onClick={() => product.id.startsWith('gift-card-') ? addGiftCard(product.price) : add(product.id)} size="small" disableRipple><Add fontSize="small" /></IconButton>
                  </Stack>
                  <IconButton aria-label="Удалить товар" onClick={() => remove(product.id)} disableRipple sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary', backgroundColor: 'transparent' } }}><DeleteOutlined /></IconButton>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Stack spacing={2} sx={{ p: 3, border: '1px solid', borderColor: 'divider', position: { md: 'sticky' }, top: 24 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Ваш заказ</Typography>
          <Stack direction="row" color="text.secondary" sx={{ justifyContent: 'space-between' }}><Typography>Товары</Typography><Typography>{formatPrice(total)}</Typography></Stack>
          <Divider />
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}><Typography sx={{ fontWeight: 700 }}>Итого</Typography><Typography variant="h5" sx={{ fontWeight: 700 }}>{formatPrice(total)}</Typography></Stack>
          <ActionButton sx={{ minWidth: 0, width: '100%' }}>Оформить заказ</ActionButton>
          <Typography variant="caption" color="text.secondary">Доставка и способ оплаты выбираются при оформлении заказа.</Typography>
        </Stack>
      </Box>
    </Box>
  )
}
