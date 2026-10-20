import { ArrowForward } from "@mui/icons-material"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import { publicAsset } from '../utils/publicAsset'

  type Slide = {
  image: string
  title: string
  subtitle: string
  buttonText: string
  buttonTo: string
}

const slides: Slide[] = [
  {
    image: '/pics/ad_bottles.webp',
    title: 'возвращаем 10%',
    subtitle: 'при покупке детокс-ухода',
    buttonText: 'Смотреть акции',
    buttonTo: '/promotions',
  },
  {
    image: '/pics/new-collection.webp',
    title: 'новая коллекция',
    subtitle: 'уход за кожей лица',
    buttonText: 'Перейти в каталог',
    buttonTo: '/catalog',
  },
  {
    image: '/pics/gift-carts.webp',
    title: 'подарочные карты',
    subtitle: 'для особых случаев',
    buttonText: 'Выбрать подарок',
    buttonTo: '/gift',
  },
]
 const AUTOPLAY_MS = 5000

export const Ad = () => {

   const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, AUTOPLAY_MS)

    return () => clearInterval(timer)
  }, [])

  return (
      <Box
      sx={{
        position: 'relative',
        aspectRatio: { xs: '16 / 7', md: '21 / 6' },
        overflow: 'hidden',
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.image}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${publicAsset(slide.image)}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === current ? 1 : 0,
            transition: 'opacity 0.8s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
            },
          }}
        />
      ))}

      <Stack
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          justifyContent: 'center',
          px: { xs: 3, md: 8 },
          maxWidth: 700,
        }}
        spacing={2}
      >
        <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700 }}>
          {slides[current].title}
        </Typography>
        <Typography sx={{ color: '#fff' }}>
          {slides[current].subtitle}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disableRipple
          component={NavLink}
          to={slides[current].buttonTo}
          endIcon={<ArrowForward />}
          sx={{
            alignSelf: 'flex-start',
            borderRadius: 0,
            textTransform: 'uppercase',
            fontWeight: 400,
            px: 6,
            py: 1.5,
            minWidth: 260,
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            transition: 'color 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000',
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.3s ease',
              zIndex: -1,
            },
            '&:hover': {
              color: '#fff',
              backgroundColor: 'primary.main',
              '&::before': { transform: 'scaleX(1)' },
            },
          }}
        >
          {slides[current].buttonText}
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: { xs: 12, md: 20 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: index === current ? '#7FCE00' : 'rgba(255,255,255,0.6)',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}
