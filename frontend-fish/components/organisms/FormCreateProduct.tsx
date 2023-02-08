import {FC, useRef, useState, ChangeEvent, useEffect, Dispatch, SetStateAction} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {Field, Form, Formik, FormikHelpers, useFormikContext} from 'formik';
import {createProductType} from '../../types';
import {createProduct, getProductId, updateProduct, uploadFile} from '../../api/fetchData';
import {InputFile} from '../atoms/InputFile';
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';


const initialValues: createProductType = {
  name: '',
  description: '',
  price: '',
  unit: 'кг',
  images: '',
  available: 'available',
  fixedPrice: 'fixed'
}


type AutoSubmitFormType = {
  setImages: Dispatch<SetStateAction<string>>
}


const AutoSubmitForm:FC<AutoSubmitFormType> = ({ setImages }) => {
  const router = useRouter();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (router.query.id) {
      (async () => {
        const res = await getProductId(`${router.query.id}`);
        setFieldValue('name', res.name)
        setFieldValue('description', res.description)
        setFieldValue('price', res.price)
        setFieldValue('unit', res.unit)
        setFieldValue('images', res.images || '')
        setFieldValue('available', res.available)
        setFieldValue('fixedPrice', res.fixedPrice)
        setImages("images/" + res.images);
      })();
    }
  }, [router])
 return null;
};


export const FormCreateProduct:FC = () => {
  const router = useRouter();
  const toast = useToast();
  const refFile = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState("");

  const handlerUploadFile = async (e: ChangeEvent<HTMLInputElement>, field: createProductType, form: FormikHelpers<createProductType>) => {
    let formData = new FormData();
    if (e.target && e.target.files[0]) await formData.set('img', e.target.files[0]);

    try {
      const res = await uploadFile(formData);
      setImages("upload/save/" + res.fileName);
      form.setFieldValue(field.name, res.fileName)
    } catch (error) {
      toast({
        position: 'top',
        render: () => <Box color='white' p={3} bg='red.500'>{error?.messages}</Box>,
      })
    }
  }

  const imageUrl = process.env.API_URL + images;
  console.log(images);
  return (
    <Card variant='customCard' maxW='xl'>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          try {
            if (router.query.id) {
              await updateProduct(`${router.query.id}`, {...values})
              await router.push('/')
              return;
            }
            await createProduct(values)
            actions.resetForm()
            setImages('')
          } catch (error) {
            toast({
              position: 'top',
              render: () => <Box color='white' p={3} bg='red.500'>{error?.message}</Box>,
            })
          }
        }}
      >
        {(props) => (
          <Form>
            <Stack spacing={8}>

              <Field name='name'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <Input {...field} placeholder='Название' variant='Filled' size='lg' borderRadius='xl' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='description'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.description && form.touched.description}>
                    <Input {...field} placeholder='Описание' variant='Filled' size='lg' borderRadius='xl' />
                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='price'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.price && form.touched.price}>
                    <Input {...field} placeholder='Цена' variant='Filled' size='lg' borderRadius='xl' />
                    <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Stack spacing={4} pl={4}>

                <Field name='fixedPrice'>
                  {({ field }) => (
                    <FormControl>
                      <RadioGroup value={field.value}>
                        <Stack direction='row'>
                          <Radio
                            {...field}
                            value='fixed'
                            checked={field.value === 'fixed'}
                          >
                            цена фиксированная
                          </Radio>
                          <Radio {...field} value='notFixed' checked={field.fixedPrice === 'notFixed'}>цена от</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  )}
                </Field>

                <Field name='available'>
                  {({ field }) => (
                    <FormControl>
                      <RadioGroup value={field.value}>
                        <Stack direction='row'>
                          <Radio
                            {...field}
                            value='available'
                            checked={field.value === 'available'}
                            colorScheme='green'
                          >
                            В наличии
                          </Radio>
                          <Radio
                            {...field}
                            value='unavailable'
                            checked={field.value === 'unavailable'}
                            colorScheme='red'
                          >
                            Нет в продаже
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  )}
                </Field>

                <Field name='unit'>
                  {({ field }) => (
                    <FormControl>
                      <RadioGroup value={field.value}>
                        <Stack direction='row'>
                          <Radio {...field} value='кг' checked={field.value === 'кг'}>кг</Radio>
                          <Radio {...field} value='шт' checked={field.value === 'шт'}>шт</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              {images && (
                <Box>
                  <Image
                    style={{ borderRadius: '10px'}}
                    src={imageUrl}
                    height='100px'
                    width='100px'
                    objectFit='cover'
                    alt='Изображение продукта'
                  />
                </Box>
              )}

              <InputFile refFile={refFile} handlerUploadFile={handlerUploadFile} name='images'/>

              <Flex justifyContent='flex-end'>
                <Button
                  size='md'
                  variant='brandPrimary'
                  colorScheme='teal'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Сохранить
                </Button>

              </Flex>
            </Stack>
            <AutoSubmitForm setImages={setImages} />
          </Form>
        )}
      </Formik>
    </Card>
  )
}
