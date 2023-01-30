import {extendTheme} from '@chakra-ui/react';
import {buttonIconTheme} from './IconButton';
import {cardTheme} from './Card';
import {buttonTheme} from './Button';
import {inputTheme} from './Input';

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      'html, body': {
        fontSize: 'md',
        backgroundColor: props.colorMode === 'dark' ? '#000000' : '#ffffff',
        lineHeight: 'tall',
      },
      a: {
        color: props.colorMode === 'dark' ? '#ffffff' : '#000000',
        textDecoration: 'none'
      },
      'a:hover': {
        color: '#38BACC',
      },
    }),
  },
  fontSizes: {
    xs: '8px',
    sm: '10px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
  },
  components: {
    IconButton: buttonIconTheme,
    Card: cardTheme,
    Button: buttonTheme,
    Input: inputTheme
  }
})


// --chakra-fontSizes-3xs: 0.45rem;
// --chakra-fontSizes-2xs: 0.625rem;
// --chakra-fontSizes-xs: 0.75rem;
// --chakra-fontSizes-sm: 8px;
// --chakra-fontSizes-md: 1rem;
// --chakra-fontSizes-lg: 1.125rem;
// --chakra-fontSizes-xl: 1.25rem;
// --chakra-fontSizes-2xl: 1.5rem;
// --chakra-fontSizes-3xl: 1.875rem;
// --chakra-fontSizes-4xl: 2.25rem;
// --chakra-fontSizes-5xl: 3rem;
// --chakra-fontSizes-6xl: 3.75rem;
// --chakra-fontSizes-7xl: 4.5rem;
// --chakra-fontSizes-8xl: 6rem;
// --chakra-fontSizes-9xl: 8rem;
