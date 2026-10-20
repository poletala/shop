import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { FavoritesAuthPrompt } from './FavoritesAuthPrompt'

export const Layout = () => {
  return (
    <FavoritesAuthPrompt>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </FavoritesAuthPrompt>
  )
}
