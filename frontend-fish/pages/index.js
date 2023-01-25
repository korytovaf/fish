import Card from "../components/Card";
import { list } from "../styles/IndexPage.module.css"
import useSWR from "swr"
import {fetcher} from "../helpers/fetcher";
import {Center, Spinner} from "@chakra-ui/react";

export default function Home() {
  const { data, error, isLoading } = useSWR(process.env.API_URL + "products", fetcher)

  if (isLoading) return <Center h='300px'>
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
  </Center>


  return (
    <div  className={list}>
      {data.map( product => (
        <Card product={product} key={product._id} />
      ))}
    </div>
  )
}
