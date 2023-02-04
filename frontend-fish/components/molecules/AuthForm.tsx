import {FC, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import {useAuth} from '../../hooks/useAuth';


export type FormValuesLogin = {
  email: string,
  password: string,
}


const initialValues: FormValuesLogin = {
  email: '',
  password: ''
};


export const AuthForm:FC = () => {
  const { onLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onLogin(values)}
    >
      {(props) => (
        <Form>
          <Stack spacing={8}>
            <Field name='email'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <Input {...field} placeholder='Email' variant='Filled' size='lg' borderRadius='xl' />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='password'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <InputGroup size='lg'>
                    <Input
                      {...field}
                      borderRadius='xl'
                      variant='Filled'
                      pr='4.5rem'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Пароль'
                    />
                    <InputRightElement width='7rem'>
                      <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Скрыть' : 'Показать'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Flex justifyContent='flex-end'>
              <Button
                size='md'
                variant='brandPrimary'
                colorScheme='teal'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Войти
              </Button>

            </Flex>
          </Stack>

        </Form>
      )}
    </Formik>
  )
}
