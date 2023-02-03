import {FormCreateProduct} from "../components/organisms/FormCreateProduct";
import {Heading} from '@chakra-ui/react';
import {useRouter} from 'next/router';

export default function Admin() {
  const router = useRouter();

  return (
    <>
      <Heading as='h1' size='md'>
        {router.query.id ? 'РЕДАКТИРОВАНИЕ ПРОДУКТА' : 'СОЗДАНИЕ НОВОГО ПРОДУКТА'}
      </Heading>
      <FormCreateProduct />
    </>

  )
}
