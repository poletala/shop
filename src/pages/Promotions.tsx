import { Stack } from "@mui/material"
import { PromotionList } from "../data/promotions"
import { PromotionItem } from "../components/PromotionItem"

export const Promotions = () => {
  return (
    <Stack
      sx={{
        p: { xs: 2, md: 4 },
        gap: { xs: 4, md: 5 },
      }}
    >
      {PromotionList.map(p => {
        return (
          <PromotionItem
            key={p.image}
            image={p.image}
            header={p.header}
            description={p.description}
          /> 
        )
      })}
    </Stack>
  )
}
