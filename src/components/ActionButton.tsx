import { Button, type ButtonProps } from '@mui/material'

type Props = ButtonProps & {
  children: React.ReactNode
}

export const ActionButton = ({ children, sx, ...rest }: Props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      disableRipple
      {...rest}
      sx={{
        borderRadius: 0,
        textTransform: 'uppercase',
        fontWeight: 400,
        letterSpacing: '0.08em',
        px: { xs: 2.5, sm: 6 },
        py: 1.5,
        minWidth: { xs: 0, sm: 260 },
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
        ...sx,
      }}
    >
      {children}
    </Button>
  )
}
