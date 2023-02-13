import {FC, useCallback, useContext, useEffect, useState} from 'react';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {useBasket} from "../../hooks/useBasket";
import {productType} from '../../types';
import {WalletIcon} from '../../ui/icons/WalletIcon';
import {CheckedIcon} from '../../ui/icons/CheckedIcon';
import {deleteProduct, productsEndpoint} from '../../api/fetchData';
import {AuthContext} from '../../contexts/useAuthContext';
import {divideNumberByPieces} from '../../helpers/divideNumberByPieces';
import trout from '../../images/trout.png'
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
  HStack,
  Tag
} from '@chakra-ui/react';

import ym from 'react-yandex-metrika';


type CardType = {
  product: productType,
}


export const CardProduct:FC<CardType> = ({ product }) => {
  const {user} = useContext(AuthContext);
  const router = useRouter();
  const { data, mutate } = useSWR<productType[]>(productsEndpoint);
  const imageUrl = product.images ?  process.env.API_URL + "images/" + product.images : trout.src;
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
    ym('92454457','reachGoal','ADDED_BASKET');
  }

  const onRemoveProduct = async () => {
    await deleteProduct(product._id);
    await mutate(data.filter(i => i._id !== product._id))
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
              {`${product.fixedPrice === 'fixed' ? '' : 'от'} ${divideNumberByPieces(product.price)} ₽ / ${product.unit}`}
            </Text>
          </Stack>
        </Flex>
      </CardBody>

      <CardFooter>
        <Stack w='100%'>
          <Flex width='100%' justifyContent='flex-end'>
            <Tag
              size={'sm'}
              borderRadius='md'
              variant='solid'
              colorScheme={product.available === 'available' ? 'green' : 'gray'}
            >
              {product.available === 'available' ? 'В наличии' : 'Временно нет в продаже'}
            </Tag>
          </Flex>
          <Flex width='100%' justifyContent='flex-end'>
            <Button
              isDisabled={product.available === 'unavailable'}
              rightIcon={basketProductVolume ? <CheckedIcon width={16} height={16} fill='#ffffff' /> : <WalletIcon width={16} height={16} fill='#ffffff' />}
              variant='brandPrimary'
              colorScheme='blue'
              onClick={addProductToBasket}
            >
              {basketProductVolume ? 'В корзине' : 'В корзину'}
            </Button>
          </Flex>

          {user?.isAdmin && (
            <HStack justifyContent='flex-end'>
              <Button
                size='xs'
                colorScheme='red'
                onClick={() => router.push({
                  pathname: '/admin',
                  query: {id: product._id}
                })}
              >
                Редактировать
              </Button>
              <Button
                size='xs'
                colorScheme='red'
                onClick={onRemoveProduct}
              >
                Удалить
              </Button>
            </HStack>
          )}
        </Stack>
      </CardFooter>
    </Card>
  )
}

