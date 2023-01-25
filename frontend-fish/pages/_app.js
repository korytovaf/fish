import '../styles/globals.css'
import Layout from "../components/Layout";
import {AuthContextWrapper} from "../contexts/useAuthContext";
import {BasketContextWrapper} from "../contexts/useBasketContext";
import {ChakraProvider, extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
  lineHeights: {
    base: '1'
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextWrapper>
        <BasketContextWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BasketContextWrapper>
      </AuthContextWrapper>
    </ChakraProvider>
  )
}

export default MyApp
