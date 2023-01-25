import Card from "../components/Card";
import { list } from "../styles/IndexPage.module.css"
import useSWR from "swr"
import {fetcher} from "../helpers/fetcher";

export default function Home({ products }) {
  const { data, error, isLoading } = useSWR(process.env.API_URL + "products", fetcher)
  console.log(data)
  console.log(error)
  console.log(isLoading)

  if (isLoading) return null

  return (
    <div  className={list}>
      {data.map( product => (
        <Card product={product} key={product._id} />
      ))}
    </div>
  )
}


// export async function getServerSideProps() {
//
//   const request = await fetch(process.env.API_URL + "products")
//   const products = await request.json();
//
//   if (!products) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: { products },
//   }
// }
