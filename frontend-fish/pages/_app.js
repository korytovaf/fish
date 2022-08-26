import '../styles/globals.css'
import Layout from "../components/Layout";
import {AuthContextWrapper} from "../contexts/useAuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextWrapper>
  )
}

export default MyApp
