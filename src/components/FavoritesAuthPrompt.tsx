import { Close, FavoriteBorder } from '@mui/icons-material'
import { Dialog, DialogContent, IconButton, Stack, Typography } from '@mui/material'
import { useCallback, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { FavoritesAuthContext } from '../context/FavoritesAuthContext'
import { useAuth } from '../hooks/useAuth'
import { ActionButton } from './ActionButton'

export const FavoritesAuthPrompt = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const requestSignIn = useCallback(() => setOpen(true), [])
  const close = () => setOpen(false)

  return (
    <FavoritesAuthContext.Provider value={requestSignIn}>
      {children}
      <Dialog
        open={open && !user}
        onClose={close}
        maxWidth={false}
        aria-label='Требуется авторизация'
        aria-describedby='favorites-auth-description'
        slotProps={{ paper: { sx: { borderRadius: 0, width: 260, maxWidth: 'calc(100% - 32px)', m: 2 } } }}
      >
        <IconButton
          aria-label='Закрыть'
          onClick={close}
          size='small'
          sx={{ position: 'absolute', right: 4, top: 4, '&:hover': { color: 'primary.main' } }}
        >
          <Close fontSize='small' />
        </IconButton>
        <DialogContent sx={{ px: 2, pt: 3, pb: 2 }}>
          <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <FavoriteBorder sx={{ fontSize: 24, color: 'primary.main' }} />
            <Typography id='favorites-auth-description' variant='body2' color='text.secondary'>
              авторизуйтесь для добавления в избранное
            </Typography>
            <ActionButton
              fullWidth
              sx={{ minWidth: 0, py: 0.75, px: 2, fontSize: '0.75rem' }}
              onClick={() => {
                close()
                navigate('/account')
              }}
            >
              Войти
            </ActionButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </FavoritesAuthContext.Provider>
  )
}
