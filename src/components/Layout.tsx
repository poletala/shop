import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { FavoritesAuthPrompt } from './FavoritesAuthPrompt'
import { Box } from '@mui/material'

export const Layout = () => {
  return (
    <FavoritesAuthPrompt>
      <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component='main' sx={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </FavoritesAuthPrompt>
  )
}
