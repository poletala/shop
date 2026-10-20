import { useMemo, useState } from 'react'
import { Button, InputBase, Stack } from '@mui/material'
import { NavLink } from 'react-router'
import { products } from '../data/products'

export const Brands = () => {
  const [activeLetter, setActiveLetter] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const brands = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.brand))).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      ),
    []
  )

  const letters = useMemo(
    () =>
      Array.from(new Set(brands.map((b) => b[0].toUpperCase()))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [brands]
  )

  const visibleBrands = useMemo(() => {
    let result = activeLetter
      ? brands.filter((b) => b[0].toUpperCase() === activeLetter)
      : brands

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter((b) => b.toLowerCase().includes(q))
    }

    return result
  }, [brands, activeLetter, query])

  const handleLetterClick = (letter: string) => {
    setActiveLetter((prev) => (prev === letter ? null : letter))
  }

  return (
    <Stack spacing={1} sx={{ padding: '20px', width: '100%', alignItems: 'center' }}>

      <Stack
        sx={{
          width: '100%',
          alignItems: 'center',
          mb: 2,
          pb: 2,
          position: 'relative',
        }}
      >

        <InputBase
          placeholder="найти бренды"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            width: 220,
            flexShrink: 0,
            fontSize: '1.2rem',
            alignSelf: 'end',
            borderBottom: '1px solid',
            marginRight: '120px',
            borderColor: 'divider',
            pb: 0.5,
            transition: 'border-color 0.2s ease',
            '&:focus-within': {
              borderColor: '#7FCE00',
            },
            '& input::placeholder': {
              color: 'grey.500',
              opacity: 1,
            },
          }}
        />
      </Stack>

        <Stack
          direction="row"
          sx={{
            flexWrap: 'wrap',
            gap: 0.5,
            // flex: 1,
            justifyContent: 'center'
          }}
        >
          {letters.map((letter) => (
            <Button
              key={letter}
              disableRipple
              onClick={() => handleLetterClick(letter)}
              sx={{
                minWidth: 32,
                width: 32,
                height: 32,
                p: 0,
                borderRadius: 0,
                color: activeLetter === letter ? '#7FCE00' : 'text.primary',
                backgroundColor: 'transparent',
                fontWeight: 700,
                fontSize: '0.85rem',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'grey.500',
                },
              }}
            >
              {letter}
            </Button>
          ))}
        </Stack>

      <Stack
        sx={{
          minHeight: '300px',
          width: 'fit-content',
          // alignItems: 'center'
        }}
      >
        {visibleBrands.map((b) => (
          <Button
            key={b}
            disableRipple
            variant="text"
            component={NavLink}
            to={`/catalog?brand=${encodeURIComponent(b)}`}
            sx={{
              padding: '0',
              color: 'black',
              fontWeight: 400,
              fontSize: '1.2rem',
              justifyContent: 'flex-start',
              px: 2,
              '&&:hover': {
                color: 'grey.500',
                backgroundColor: 'transparent',
              },
            }}
          >
            {b}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}