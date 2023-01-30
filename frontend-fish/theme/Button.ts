import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const brandPrimary = defineStyle({
  background: '#38BACC',
  color: 'white',
  borderRadius: 'xl',
  // fontFamily: 'serif',
  // fontWeight: 'normal',

  _dark: {
    // background: 'orange.300',
    // color: 'white',
  }
})

export const buttonTheme = defineStyleConfig({
    variants: { brandPrimary },
})
