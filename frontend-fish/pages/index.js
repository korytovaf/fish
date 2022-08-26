import Card from "../components/Card";
import { list } from "../styles/IndexPage.module.css"

export default function Home({ products }) {
  return (
    <div  className={list}>
      {products.map( product => (
        <Card product={product} key={product._id} />
      ))}
    </div>
  )
}


export async function getServerSideProps() {

  const request = await fetch(process.env.API_URL + "products")
  const products = await request.json();

  if (!products) {
    return {
      notFound: true,
    };
  }
  return {
    props: { products },
  }
}
