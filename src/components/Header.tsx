import { AppBar, Avatar, Badge, Button, IconButton, Stack, Toolbar } from "@mui/material"
import { NavLink } from "react-router"
import { FavoriteBorder, PermIdentityOutlined, ShoppingBagOutlined } from "@mui/icons-material"
import { Ad } from "./Ad"
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

export const Header = () => {
  const { items } = useCart()
  const { user } = useAuth()
  const hasCartItems = items.some((item) => item.qty > 0)

  const menuItems = [
    { label: 'продукты', to: '/catalog' },
    { label: 'бренды', to: '/brands' },
    { label: 'акции', to: '/promotions' },
    { label: 'скидки до 60%', to: '/promotions60' },
    { label: 'подарочная карта', to: '/gift' },
    { label: 'наша коллекция', to: '/ours' },
  ]

  const iconItems = [
    { to: '/saved', icon: <FavoriteBorder /> },
    {
      to: '/account',
      icon: user ? (
        <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: 14 }}>
          {Array.from(user.name)[0]?.toLocaleUpperCase('ru-RU')}
        </Avatar>
      ) : <PermIdentityOutlined />,
    },
    {
      to: '/cart',
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
          padding: '30px 30px 10px'
        }}
      >

        <Stack
          direction='row'
          spacing={1}
          sx={{
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
              aria-label={item.to === '/account' ? (user ? `Личный кабинет: ${user.name}` : 'Войти в личный кабинет') : undefined}
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
      <Ad />
    </AppBar>
  )
}
