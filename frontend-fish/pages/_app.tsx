import { AppProps } from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import {AuthContextWrapper} from "../contexts/useAuthContext";
import {BasketContextWrapper} from "../contexts/useBasketContext";
import {Layout} from '../components/Layout';
import {theme} from '../theme/customTheme';
import {SWRConfig} from 'swr/_internal';
import {fetcher} from '../api/fetcher';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ChakraProvider theme={theme}>
        <AuthContextWrapper>
          <BasketContextWrapper>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </BasketContextWrapper>
        </AuthContextWrapper>
      </ChakraProvider>
    </SWRConfig>
  )
}

export default MyApp
