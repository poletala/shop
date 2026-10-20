import { Box, Typography } from "@mui/material"
import { ProductCard } from "../components/ProductCard"
import { products } from "../data/products"
import { useFavorites } from "../hooks/useFavorites"

export const Promotions60 = () => {
  const { favorites, toggle } = useFavorites()
  const productsPromo = products.filter(p => p.sale && p.sale > 0)
  console.log(products, productsPromo)

   return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        скидки
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {productsPromo.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={toggle}
          />
        ))}
      </Box>
    </Box>
  )
}