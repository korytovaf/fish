import {FC} from 'react';
import useSWR from "swr"
import {CardProduct} from '../components/molecules/CardProduct';
import {productType} from '../types';
import trout from '../images/trout.png';
import {getProduct, productsEndpoint} from '../api/fetchData';
import {
  Center,
  SimpleGrid,
  Spinner,
  Text,
  Grid,
  GridItem,
  Stack,
  useColorMode,
} from '@chakra-ui/react';


const Home:FC = () => {
  const { colorMode } = useColorMode();
  const { data, isLoading } = useSWR<productType[]>(productsEndpoint, getProduct);

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
    <>
      <Grid
        maxW={[300, 320, 320, 400]}
        templateColumns='1fr'
        gridTemplateRows='1fr'
      >
        <GridItem
          colStart={1}
          rowStart={1}
          backgroundImage={`url(${trout.src})`}
          backgroundPosition="right"
          backgroundRepeat="no-repeat"
          backgroundSize='contain'
        />
        <GridItem
          colStart={1}
          rowStart={1}
          bgGradient={colorMode === 'dark'
            ? 'linear(to-r, #000000 43.06%, #00000000 95.86%)'
            : 'linear(to-r, #FFFFFF 43.06%, #FFFFFF00 95.86%)'
          }
        />
        <GridItem
          colStart={1}
          rowStart={1}
        >
          <Stack spacing='0.4' >
            <Text fontSize={['sm', 'sm', 'md', 'lg']}>САНКТ-ПЕТЕРБУРГ</Text>
            <Text
              as='h1'
              fontSize={['lg', 'lg', 'xl', '2xl']}
              fontWeight='bold'
            >
              Доставка до парадной
            </Text>
            <Text fontSize={['xs', 'xs', 'sm', 'sm']}>
              Бесплатная доставка при заказе на сумму более 2000 ₽
            </Text>
          </Stack>
        </GridItem>
      </Grid>

      <SimpleGrid
        pt={8}
        spacing={4}
        templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
        justifyItems={['center', 'center', null, null]}
      >
        {data?.map( product => (
          <CardProduct product={product} key={product._id} />
        ))}
      </SimpleGrid>
    </>
  )
}

export default Home;
