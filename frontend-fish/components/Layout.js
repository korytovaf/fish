import Head from 'next/head'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { container } from '../styles/Layout.module.css'


export default function Layout({ children }) {
  return (
    <div className={container}>
      <Head>
        <title>Форель КАРЕЛИИ</title>
        <meta name="description" content="Всегда свежая форель в Санкт-Петербурге до парадной" />
        <link rel="icon" href="/icons/fish.svg" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
