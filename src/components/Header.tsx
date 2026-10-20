import { AppBar, Avatar, Badge, Box, Button, Drawer, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { NavLink } from "react-router"
import { Close, FavoriteBorder, Menu, PermIdentityOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { Ad } from "./Ad"
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

export const Header = () => {
  const { items } = useCart()
  const { user } = useAuth()
  const hasCartItems = items.some((item) => item.qty > 0)
  const [menuOpen, setMenuOpen] = useState(false)

  const menuItems = [
    { label: 'продукты', to: '/catalog' },
    { label: 'бренды', to: '/brands' },
    { label: 'акции', to: '/promotions' },
    { label: 'скидки до 60%', to: '/promotions60' },
    { label: 'подарочная карта', to: '/gift' },
    { label: 'наша коллекция', to: '/ours' },
  ]

  const iconItems = [
    { to: '/saved', label: 'Избранное', icon: <FavoriteBorder /> },
    {
      to: '/account',
      label: 'Личный кабинет',
      icon: user ? (
        <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: 14 }}>
          {Array.from(user.name)[0]?.toLocaleUpperCase('ru-RU')}
        </Avatar>
      ) : <PermIdentityOutlined />,
    },
    {
      to: '/cart',
      label: 'Корзина',
      icon: (
        <Badge
          color="primary"
          variant="dot"
          invisible={!hasCartItems}
          overlap="circular"
          sx={{ '& .MuiBadge-badge': { backgroundColor: '#7FCE00', boxShadow: '0 0 0 2px #fff' } }}
        >
          <ShoppingBagOutlined />
        </Badge>
      ),
    },
  ]

  return (
      <AppBar
        position="static"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 1.5, md: 3.75 },
          pt: { xs: 1, md: 3.75 },
          pb: { xs: 1, md: 1.25 },
          minHeight: { xs: 56, md: 'auto' },
        }}
      >

        <Stack direction='row' sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton aria-label='Открыть меню' onClick={() => setMenuOpen(true)} sx={{ width: 44, height: 44 }}>
            <Menu />
          </IconButton>
          {/* <Typography component={NavLink} to='/catalog' sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.85rem' }}>
            GOLDEN APPLE
          </Typography> */}
          <Stack direction='row'>
            {iconItems.map((item) => (
              <IconButton key={item.to} component={NavLink} to={item.to} aria-label={item.label} sx={{ width: 44, height: 44, color: 'inherit', '&.active': { color: 'primary.main' } }}>
                {item.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Stack
          direction='row'
          spacing={1}
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          {iconItems.map((item) => (
            <IconButton
              key={item.to}
              color="inherit"
              component={NavLink}
              to={item.to}
              aria-label={item.to === '/account' && user ? `Личный кабинет: ${user.name}` : item.label}
              disableRipple
              sx={{
                transition: 'color 0.2s ease',
                '&&:hover': {
                  color: 'grey.500',
                  backgroundColor: 'transparent',
                },
                '&.active': {
                  color: '#7FCE00'
                },
              }}
            >
              {item.icon}
            </IconButton>
          ))}
        </Stack>

        <Stack
          direction='row'
          spacing={3}
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.to}
              color="inherit"
              component={NavLink}
              to={item.to}
              disableRipple
              sx={{
                textTransform: 'none',
                fontWeight: 400,
                letterSpacing: '0.08em',
                '&&:hover': {
                  color: 'grey.500',
                  backgroundColor: 'transparent',
                },
                '&.active': {
                  color: '#7FCE00'
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

      </Toolbar>
      <Drawer
        anchor='left'
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        slotProps={{ paper: { sx: { width: 'min(86vw, 340px)', p: 2, boxSizing: 'border-box' } } }}
      >
        <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 700, letterSpacing: '0.08em' }}>МЕНЮ</Typography>
          <IconButton aria-label='Закрыть меню' onClick={() => setMenuOpen(false)} sx={{ width: 44, height: 44 }}><Close /></IconButton>
        </Stack>
        <Box component='nav' aria-label='Основное меню'>
          <Stack>
            {menuItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                sx={{ minHeight: 48, justifyContent: 'flex-start', color: 'text.primary', borderRadius: 0, '&.active': { color: 'primary.main' } }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>
      <Ad />
    </AppBar>
  )
}
