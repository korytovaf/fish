import { AppProps } from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import {AuthContextWrapper} from "../contexts/useAuthContext";
import {BasketContextWrapper} from "../contexts/useBasketContext";
import {Layout} from '../components/Layout';
import {theme} from '../theme/customTheme';


function MyApp({ Component, pageProps }: AppProps) {
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
