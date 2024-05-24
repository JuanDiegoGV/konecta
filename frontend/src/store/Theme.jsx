import { atom } from 'jotai'
import { createTheme } from '@mui/material/styles'

const { palette } = createTheme()

const konectaPrimary = '#014C8E'
const konectaSecondary = '#FFC72C'
const konectaInfo = '#F5F5F6'

export const theme = atom({
  palette: {
    konectaPrimary: palette.augmentColor({
      color: {
        main: konectaPrimary
      }
    }),
    konectaSecondary: palette.augmentColor({
      color: {
        main: konectaSecondary
      }
    }),
    konectaInfo: palette.augmentColor({
      color: {
        main: konectaInfo
      }
    })
  }
})
