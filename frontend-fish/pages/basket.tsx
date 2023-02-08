import {FC, useEffect, useState} from 'react';
import {useBasket} from "../hooks/useBasket";
import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  Heading,
  Input,
  Spacer,
  Stack,
  Text,
  StackDivider, Box, useToast,
} from '@chakra-ui/react';
import {Field, Form, Formik} from 'formik';
import {CardProductBasket} from '../components/molecules/CardProductBasket';
import {useRouter} from 'next/router';
import {purchaseType} from '../types';
import {useSWRConfig} from 'swr';
import {createOrder} from '../api/fetchData';
import {divideNumberByPieces} from '../helpers/divideNumberByPieces';


const initialValues: purchaseType = {
  consumer: '',
  phone: '',
  address: '',
};


const BasketPage:FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { fetcher } = useSWRConfig()

  const { basketProducts, clearBasket } = useBasket();
  const [totalPriceBasket, setTotalPriceBasket] = useState<number>(0);

  function validateName(value) {
    let error
    if (!value) {
      error = 'Поле обязательно для заполнения'
    } //else if (value.toLowerCase() !== 'naruto') {
      //error = "Jeez! You're not a fan 😱"
    //}
    return error
  }

  useEffect(() => {
    setTotalPriceBasket(basketProducts.reduce((sum, item) => sum + item.volume * +item.price, 0))
  }, [basketProducts])



  const onSubmitForm:(values: purchaseType) => void = async (values) => {
    const purchase = {
      ...values,
      products_basket: basketProducts,
      totalPriceBasket: totalPriceBasket
    };

    try {
      await fetcher(createOrder, { method: 'POST', body: purchase } )
    } catch (error) {
      toast({
        position: 'top',
        render: () => <Box color='white' p={3} bg='red.500'>{error.message}</Box>,
      })
    }
    clearBasket()
    await router.push("/")
  }


  return (
    <>
      <Heading as='h1' size='md'>ОФОРМЛЕНИЕ ЗАКАЗА</Heading>

      <Card variant='customCard' maxW='4xl'>
        <CardBody>
          <Flex px={4} py={[0, 0, 1, 2]} alignItems='center'>
            <Text fontSize={['md', 'md', 'xl', '2xl']}>ИТОГО</Text>
            <Spacer />
            <Text fontSize={['lg', 'lg', '2xl', '4xl']}>{`${divideNumberByPieces(totalPriceBasket)} ₽`}</Text>
          </Flex>
        </CardBody>
      </Card>

      <Card variant='customCard' maxW='4xl'>
        <CardBody>
          {basketProducts.length === 0 ? (
            <Text px={4} py={2} >Здесь еще ничего нет (</Text>
          ) : (
            <Stack spacing={8} p={[0, 0, 4, 4]}>
              <Stack divider={<StackDivider />} spacing={[2, 2, 8, 16]}>
                {basketProducts.map((product) => (
                  <CardProductBasket key={product._id} product={product} setTotalPriceBasket={setTotalPriceBasket}/>
                ))}
              </Stack>

              <Text fontSize='md'>
                Итоговая сумма заказа является приблизительной, и будет зависеть при взвешивании  продукции при доставке.
              </Text>

              <Formik
                initialValues={initialValues}
                onSubmit={( values) => onSubmitForm(values)}
              >
                {(props) => (
                  <Form>
                    <Grid gridTemplateColumns={['1fr', '1fr', '2fr 1fr', '2fr 1fr']} gap={8} alignItems='end'>
                      <Stack spacing={6}>
                        <Field name='consumer' validate={validateName}>
                          {({ field, form }) => (
                              <FormControl isInvalid={form.errors.consumer && form.touched.consumer}>
                                <Input {...field} placeholder='Имя' variant='customInput' h={16}/>
                                <FormErrorMessage>{form.errors.consumer}</FormErrorMessage>
                              </FormControl>
                          )}
                        </Field>

                        <Field name='phone' validate={validateName}>
                          {({ field, form }) => (
                              <FormControl isInvalid={form.errors.phone && form.touched.phone}>
                                <Input {...field} placeholder='Телефон' variant='customInput' h={16}/>
                                <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                              </FormControl>
                          )}
                        </Field>

                        <Field name='address' validate={validateName}>
                          {({ field, form }) => (
                              <FormControl isInvalid={form.errors.address && form.touched.address}>
                                <Input {...field} placeholder='Адрес доставки' variant='customInput' h={16}/>
                                <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                              </FormControl>
                          )}
                        </Field>

                      </Stack>
                      <Flex justifyContent='flex-end'>
                        <Button
                          isDisabled={props.dirty && !props.isValid}
                          fontSize={['sx', 'sx', 'md', 'md']}
                          h={16}
                          variant='brandPrimary'
                          type='submit'
                          isLoading={props.isSubmitting}
                        >
                          Оформить заказ
                        </Button>
                      </Flex>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Stack>
          )}
        </CardBody>
        </Card>
    </>
  )
}

export default BasketPage;
