import { Stack } from "@mui/material"
import { PromotionList } from "../data/promotions"
import { PromotionItem } from "../components/PromotionItem"

export const Promotions = () => {
  return (
    <Stack
      sx={{
        padding: '30px',
        gap: '40px'
      }}
    >
      {PromotionList.map(p => {
        return (
          <PromotionItem
            image={p.image}
            header={p.header}
            description={p.description}
          /> 
        )
      })}
    </Stack>
  )
}