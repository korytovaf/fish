import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const variants = {
  customCard: (props) => definePartsStyle({
    container: {
      backgroundColor: props.colorMode === 'dark' ? '#131313' : '#F6F6F6',
      borderRadius: '3xl',
      shadow: 'md',
    }
  }),
  cardProductBasket: (props) => definePartsStyle({
    container: {
      backgroundColor: props.colorMode === 'dark' ? '#131313' : '#F6F6F6',
      borderRadius: '3xl',
    },
    body: {
      padding: 0
    }
  }),
};

export const cardTheme = defineMultiStyleConfig({ variants });
