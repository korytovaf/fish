import '../styles/globals.css'
import Layout from "../components/Layout";
import {AuthContextWrapper} from "../contexts/useAuthContext";
import {BasketContextWrapper} from "../contexts/useBasketContext";
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
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
