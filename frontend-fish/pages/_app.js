import '../styles/globals.css'
import Layout from "../components/Layout";
import {AuthContextWrapper} from "../contexts/useAuthContext";
import {BasketContextWrapper} from "../contexts/useBasketContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextWrapper>
      <BasketContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BasketContextWrapper>
    </AuthContextWrapper>
  )
}

export default MyApp
