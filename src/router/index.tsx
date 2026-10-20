import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout";
// import { Home } from "../pages/Home";
import { Catalog } from "../pages/Catalog";
import { Promotions } from "../pages/Promotions";
import { Account } from "../pages/Account";
import { Saved } from "../pages/Saved";
import { Cart } from "../pages/Cart";
import { GiftCart } from "../pages/GiftCart";
import { Promotions60 } from "../pages/Promotions60";
import { Brands } from "../pages/Brands";
import { Ours } from "../pages/Ours";
import { ProductPage } from "../pages/ProductPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // { index: true, element: <Home /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'promotions', element: <Promotions /> },
      { path: 'account', element: <Account /> },
      { path: 'saved', element: <Saved /> },
      { path: 'cart', element: <Cart /> },
      { path: 'gift', element: <GiftCart /> },
      { path: 'promotions60', element: <Promotions60 /> },
      { path: 'brands', element: <Brands /> },
      { path: 'ours', element: <Ours /> },
      { path: 'product/:id', element: <ProductPage /> },
    //   { path: '*', element: <NotFound /> },
    ],
  },
])