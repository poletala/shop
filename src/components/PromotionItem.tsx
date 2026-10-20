import { ArrowForward } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from "@mui/material"
import { NavLink } from 'react-router'
import { publicAsset } from '../utils/publicAsset'

type PromotionProps = {
  image: string,
  description: string,
  header: string
}

export const PromotionItem = ({ header, image }: PromotionProps) => {

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}
    >
      <Box
        component="img"
        src={publicAsset(image)}
        alt={header}
      />
      <Box
        sx={{
          width: '40%',
          gap: '10px'
        }}
      >
        <Typography variant='body1' sx={{ fontSize: '1.5rem', fontWeight: '500', marginLeft: '-20px'}}>
          {header}
        </Typography>
        <Typography variant='body2' component="div">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nam nisi harum unde pariatur repellat quia ad, molestiae non temporibus quidem! Impedit porro perspiciatis molestias maiores vitae inventore minima quod? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis sit inventore quia ipsum dolorum ut ex officia modi nostrum error aspernatur rem, voluptatibus delectus, explicabo vero? Maxime dolorem quas aperiam.
          <IconButton
            component={NavLink}
            to="/promotions60"
            aria-label="Перейти к акциям со скидками"
            disableRipple
            size="small"
            sx={{
              flexShrink: 0,
              display: 'inline-flex',
              verticalAlign: 'middle',
              ml: 1,
              width: 28,
              height: 28,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 0,
              color: 'text.primary',
              '&:hover': {
                color: '#fff',
                backgroundColor: '#7FCE00',
                borderColor: '#7FCE00',
              },
            }}
          >
            <ArrowForward fontSize="small" />
          </IconButton>
        </Typography>
      </Box>
    </Stack>
  )
}
