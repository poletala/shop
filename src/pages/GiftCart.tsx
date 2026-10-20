import { Check, CardGiftcardOutlined } from '@mui/icons-material'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ActionButton } from '../components/ActionButton'
import { useCart } from '../hooks/useCart'
import { publicAsset } from '../utils/publicAsset'

const denominations = [1000, 3000, 5000, 10000]

export const GiftCart = () => {
  const [selected, setSelected] = useState(3000)
  const { addGiftCard, items } = useCart()
  const navigate = useNavigate()
  const isInCart = items.some((item) => item.id === `gift-card-${selected}`)

  return (
    <Box sx={{ maxWidth: 1320, mx: 'auto', px: { xs: 1.5, sm: 2, md: 6 }, py: { xs: 3, md: 7 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 0.9fr' }, gap: { xs: 4, md: 8 }, alignItems: 'center' }}>
        <Box sx={{ position: 'relative', overflow: 'hidden', aspectRatio: { xs: '4 / 3', md: '5 / 4' } }}>
          <Box
            component="img"
            src={publicAsset('/pics/gift-carts.webp')}
            alt="подарочная карта"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <Chip
            icon={<CardGiftcardOutlined />}
            label="ПОДАРОЧНАЯ КАРТА"
            sx={{ position: 'absolute', top: { xs: 12, sm: 20 }, left: { xs: 12, sm: 20 }, maxWidth: 'calc(100% - 24px)', borderRadius: 0, bgcolor: '#fff', fontWeight: 500, letterSpacing: { xs: '0.04em', sm: '0.08em' }, fontSize: { xs: '0.7rem', sm: '0.8125rem' } }}
          />
        </Box>

        <Stack spacing={3} sx={{ maxWidth: 490 }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.14em' }}>ДЛЯ ОСОБЫХ СЛУЧАЕВ</Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: 1, mt: 0.5 }}>подарочная карта</Typography>
          </Box>

          <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            Дарите свободу выбора. Получатель сам найдёт то, что сделает его день особенным.
          </Typography>

          <Stack spacing={1.25}>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {denominations.map((amount) => (
                <Button
                  key={amount}
                  onClick={() => setSelected(amount)}
                  disableRipple
                  variant={selected === amount ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ flex: { xs: '1 1 calc(50% - 4px)', sm: '0 0 auto' }, minWidth: 92, minHeight: 44, borderRadius: 0, fontWeight: 500, borderColor: selected === amount ? 'primary.main' : 'divider' }}
                >
                  {amount.toLocaleString('ru-RU')} ₽
                </Button>
              ))}
            </Stack>
          </Stack>

          <ActionButton
            onClick={() => isInCart ? navigate('/cart') : addGiftCard(selected)}
            sx={{ alignSelf: 'flex-start', width: { xs: '100%', sm: 'auto' }, minWidth: { xs: 0, sm: 280 } }}
          >
            {isInCart ? 'В корзине' : `Купить за ${selected.toLocaleString('ru-RU')} ₽`}
          </ActionButton>

          <Stack spacing={1} sx={{ pt: 1 }}>
            {['электронная карта придёт на указанную почту', 'можно использовать для любого товара', 'срок действия — 12 месяцев'].map((item) => (
              <Stack key={item} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Check sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary">{item}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
