import { Close, LocalShippingOutlined, LockOutlined } from '@mui/icons-material'
import { Alert, Avatar, Box, Button, Divider, Drawer, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { ActionButton } from '../components/ActionButton'
import { useAuth } from '../hooks/useAuth'

export const Account = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnToSaved = searchParams.get('returnTo') === '/saved'
  const { user, signIn, signOut } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(true)
  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Укажите имя и корректную почту')
      return
    }
    try {
      signIn({ name, email })
      setName('')
      setEmail('')
      if (returnToSaved) setOpen(false)
    } catch {
      setError('Не удалось сохранить вход. Проверьте, доступно ли хранилище браузера.')
    }
  }
  const handleSignOut = () => {
    setError('')
    try {
      signOut()
    } catch {
      setError('Не удалось выйти. Попробуйте ещё раз.')
    }
  }
  const close = () => setOpen(false)
  const finishClose = () => {
    if (returnToSaved) {
      navigate(user ? '/saved' : '/catalog', { replace: true })
      return
    }
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate('/catalog', { replace: true })
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={close}
      transitionDuration={{ enter: 400, exit: 300 }}
      slotProps={{
        paper: {
          role: 'dialog',
          'aria-modal': true,
          'aria-labelledby': 'account-title',
          sx: {
            width: { xs: '100%', md: '33.333333%' },
            boxSizing: 'border-box',
            p: { xs: 2.5, md: 3, lg: 4 },
          },
        },
        transition: {
          appear: true,
          onExited: finishClose,
        },
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography id="account-title" variant="h5" sx={{ fontWeight: 700 }}>личный кабинет</Typography>
        <IconButton aria-label="Закрыть" onClick={close} disableRipple sx={{ '&:hover': { backgroundColor: 'transparent', color: 'primary.main' } }}><Close /></IconButton>
      </Stack>

      {user ? (
        <>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 52, height: 52, bgcolor: 'primary.main', fontSize: 20 }}>
              {Array.from(user.name)[0]?.toLocaleUpperCase('ru-RU')}
            </Avatar>
            <Box sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
              <Typography sx={{ fontWeight: 700 }}>{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ py: 3 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>МОИ ЗАКАЗЫ</Typography>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <LocalShippingOutlined sx={{ color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">У вас пока нет заказов</Typography>
            </Stack>
          </Stack>
          <Button onClick={handleSignOut} color="inherit" sx={{ alignSelf: 'flex-start', px: 0, '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}>
            Выйти
          </Button>
        </>
      ) : (
        <Stack component="form" onSubmit={handleSignIn} spacing={2.5}>
          {returnToSaved && (
            <Alert
              icon={<LockOutlined fontSize='small' />}
              sx={{
                borderRadius: 0,
                bgcolor: 'grey.50',
                color: 'text.primary',
                borderLeft: '3px solid',
                borderColor: 'primary.main',
                '& .MuiAlert-icon': { color: 'primary.main' },
              }}
            >
              Авторизуйтесь для просмотра избранного
            </Alert>
          )}
          <Typography color="text.secondary">Введите имя и почту, чтобы войти в личный кабинет.</Typography>
          <TextField
            label="Имя"
            name="name"
            autoComplete="name"
            required
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
            slotProps={{ htmlInput: { maxLength: 80 } }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
          />
          <TextField
            label="Электронная почта"
            name="email"
            type="email"
            autoComplete="email"
            required
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            slotProps={{ htmlInput: { maxLength: 254 } }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
          />
          <ActionButton type="submit" fullWidth sx={{ minWidth: 0 }}>Войти</ActionButton>
        </Stack>
      )}
      {error && <Typography role="alert" variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Drawer>
  )
}
