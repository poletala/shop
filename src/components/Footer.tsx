import { EmailOutlined, PhoneOutlined, Telegram } from '@mui/icons-material'
import { Box, IconButton, Stack } from '@mui/material'

export const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#f2f2f2', px: { xs: 2, md: 5 }, py: 1.5 }}>
      <Stack direction="row" spacing={0.5} sx={{ maxWidth: 1320, mx: 'auto', alignItems: 'center', justifyContent: 'flex-end' }}>
        {/* <Typography variant="caption" sx={{ mr: 0.5, fontSize: '0.68rem', color: 'text.secondary' }}>НА СВЯЗИ</Typography> */}
        <IconButton component="a" href="https://t.me/goldenapple" target="_blank" rel="noreferrer" aria-label="Telegram" size="small" disableRipple sx={{ width: 30, height: 30, border: '1px solid', borderColor: 'divider', borderRadius: '50%', color: 'text.secondary', '&:hover': { color: '#fff', backgroundColor: 'primary.main', borderColor: 'primary.main' } }}><Telegram fontSize="small" /></IconButton>
        <IconButton component="a" href="https://vk.com/goldenapple" target="_blank" rel="noreferrer" aria-label="ВКонтакте" size="small" disableRipple sx={{ width: 30, height: 30, border: '1px solid', borderColor: 'divider', borderRadius: '50%', color: 'text.secondary', '&:hover': { color: '#fff', backgroundColor: 'primary.main', borderColor: 'primary.main' } }}>
          <Box component="span" sx={{ fontSize: '0.7rem', fontWeight: 700, lineHeight: 1 }}>VK</Box>
        </IconButton>
        <IconButton component="a" href="mailto:hello@goldenapple.ru" aria-label="Электронная почта" size="small" disableRipple sx={{ width: 30, height: 30, border: '1px solid', borderColor: 'divider', borderRadius: '50%', color: 'text.secondary', '&:hover': { color: '#fff', backgroundColor: 'primary.main', borderColor: 'primary.main' } }}><EmailOutlined fontSize="small" /></IconButton>
        <IconButton component="a" href="tel:+78005553535" aria-label="Позвонить" size="small" disableRipple sx={{ width: 30, height: 30, border: '1px solid', borderColor: 'divider', borderRadius: '50%', color: 'text.secondary', '&:hover': { color: '#fff', backgroundColor: 'primary.main', borderColor: 'primary.main' } }}><PhoneOutlined fontSize="small" /></IconButton>
      </Stack>
    </Box>
  )
}
