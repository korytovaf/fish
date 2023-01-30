import {FC, useCallback, useEffect, useState} from 'react';
import {
  Card,
  Button,
  CardBody,
  Img,
  Text,
  Stack,
  Heading,
  CardFooter,
  Flex,
} from '@chakra-ui/react';

import {useBasket} from "../hooks/useBasket";
import {productType} from '../types';
import {WalletIcon} from '../ui/icons/WalletIcon';
import {CheckedIcon} from '../ui/icons/CheckedIcon';


type CardType = {
  product: productType,
}

export const CardProduct:FC<CardType> = ({ product }) => {
  const imageUrl = process.env.API_URL + "images/" + product.images;
  const { addProduct, basketProducts } = useBasket();
  const [basketProductVolume, setBasketProductVolume] = useState(null);

  const addedVolumeProduct = useCallback(() => {
    const filter = basketProducts.filter(i => i._id === product._id)
    if (filter.length > 0) {
      setBasketProductVolume(filter[0].volume)
    }
  }, [basketProducts, product._id])

  useEffect(() => {
    if (basketProducts.length <= 0) return
    addedVolumeProduct();
  }, [addedVolumeProduct, basketProducts])

  const addProductToBasket = () => {
    addProduct(product);
    addedVolumeProduct();
  }

  return (
    <Card maxW='sm' variant='customCard'>
      <CardBody>
        <Flex flexDirection='column' justifyContent='space-between' h='100%'>
          <Img
            src={imageUrl}
            alt='Фотография продукта'
            borderRadius='xl'
          />
          <Stack mt='6' spacing={4}>
            <Heading size='sm'>{product.name}</Heading>
            <Text fontSize='sm'>{product.description}</Text>
            <Text fontSize='2xl'>
              {`${product.price} ₽ / ${product.unit}`}
            </Text>
          </Stack>
        </Flex>
      </CardBody>

      <CardFooter>
        <Flex width='100%' justifyContent='flex-end'>
          <Button
            rightIcon={basketProductVolume ? <CheckedIcon width={16} height={16} /> : <WalletIcon fill='#ffffff' />}
            variant='brandPrimary'
            colorScheme='blue'
            onClick={addProductToBasket}
          >
            {basketProductVolume ? 'В корзине' : 'В корзину'}
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

