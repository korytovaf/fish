import {Dispatch, FC, SetStateAction, useState} from 'react';
import {
  Card,
  CardBody,
  Img,
  Text,
  Stack,
  Flex,
  HStack,
  Grid,
  GridItem,
  Center,
  Box
} from '@chakra-ui/react';

import {useBasket} from "../../hooks/useBasket";
import {productType} from '../../types';
import {TrashIcon} from '../../ui/icons/TrashIcon';
import {MinusIcon} from '../../ui/icons/MinusIcon';
import {PlusIcon} from '../../ui/icons/PlusIcon';
import {divideNumberByPieces} from '../../helpers/divideNumberByPieces';


type basketItemProps = {
  product: productType
  setTotalPriceBasket: Dispatch<SetStateAction<number>>
}


export const CardProductBasket:FC<basketItemProps> = ({ product, setTotalPriceBasket }) => {
  const imageUrl = process.env.API_URL + "images/" + product.images;
  const [count, setCount] = useState(product.volume);
  const { addProduct, removeProductVolume, removeProduct, basketProducts } = useBasket();

  const totalPrise = () => basketProducts.reduce((sum, item) => sum + item.volume * +item.price, 0)

  const handleAddVolume = () => {
    addProduct(product)
    setCount(count + 1)
    setTotalPriceBasket(totalPrise())
  }

  const handleRemoveVolume = () => {
    if (product.volume === 1) return
    removeProductVolume(product)
    setCount(count - 1)
    setTotalPriceBasket(totalPrise())
  }

  const handleRemoveProduct = () => {
    removeProduct(product)
    setTotalPriceBasket(totalPrise())
  }

  return (
    <Card variant='cardProductBasket'>
      <CardBody>
        <Grid
          gap={6}
          rowGap={[4, 4, 6, 6]}
          columnGap={[4, 4, 6, 6]}
          gridTemplateColumns={['36px 2fr 1fr 1fr', '36px 2fr 1fr 1fr', '100px 2fr 1fr 1fr', '100px 2fr 1fr 1fr']}
          gridTemplateRows={['auto auto auto', 'auto auto auto', '1fr auto', '1fr auto']}
          templateAreas={[
            `"img title title title" "count count count btn" "price price price price"`,
            `"img title title title"
             "count count count btn"
             "price price price price"`,
            `"img title count price"
             "img btn btn btn"`,
            `"img title count price"
             "img btn btn btn"`
          ]}
        >
          <GridItem area={'img'}>
            <Img
              boxSize={['36px', '36px', '100px', '100px']}
              src={imageUrl}
              objectFit='cover'
              alt='Фотография продукта'
              borderRadius='xl'
            />
          </GridItem>

          <GridItem area={'title'}>
            <Text fontSize='md'>{product.name}</Text>
          </GridItem>

          <GridItem area={'count'}>
            <HStack spacing={4}>
              <Box as='button' boxSize={[6, 6, 8, 8]} onClick={handleRemoveVolume}>
                <MinusIcon />
              </Box>
              <Center h={[6, 6, 8, 8]} width={[6, 6, 8, 8]} borderRadius={[4, 4, 6, 6]} border='1px solid white'>
                <Text fontSize={['sm', 'sm', 'md', 'md']}>{count}</Text>
              </Center>
              <Box as='button' boxSize={[6, 6, 8, 8]} onClick={handleAddVolume}>
                <PlusIcon />
              </Box>
            </HStack>
          </GridItem>

          <GridItem area={'price'}>
            <Stack spacing={0}>
              <Text fontSize={['sm', 'sm', 'lg', 'lg']} textAlign='end' fontWeight='bold'>
                {`${divideNumberByPieces(+product.price * count)} ₽`}
              </Text>
              <Text opacity={0.7} fontSize={['small', 'small', 'sm', 'sm']} textAlign='end'>
                {`${divideNumberByPieces(product.price)} ₽`}
              </Text>
            </Stack>
          </GridItem>

          <GridItem area={'btn'}>
            <Flex justifyContent='flex-end'>
              <Box as='button' boxSize={[6, 6, 6, 6]} onClick={handleRemoveProduct}>
                <TrashIcon />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  )
}

