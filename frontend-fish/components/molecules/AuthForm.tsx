import {FC, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import {useAuth} from '../../hooks/useAuth';

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


export type FormValuesLogin = {
  email: string,
  password: string,
  name?: string,
}


const initialValues: FormValuesLogin = {
  email: '',
  password: '',
  name: '',
};


export const AuthForm:FC = () => {
  const { onAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const validateName = (value) => {
    let error
    if (!value) {
      error = 'Поле обязательно для заполнения'
    }
    return error
  }


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => onAuth(values)}
    >
      {(props) => (
        <Form>
          <Stack spacing={8}>
            {isSignup && (
              <Field name='name' validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <Input {...field} placeholder='Имя' variant='Filled' size='lg' borderRadius='xl' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            )}
            <Field name='email' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <Input {...field} placeholder='Email' variant='Filled' size='lg' borderRadius='xl' />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='password' validate={validateName}>
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

            <Flex justifyContent='space-between'>
              <Button
                ml={4}
                size='sm'
                variant='link'
                colorScheme='teal'
                onClick={() => setIsSignup(!isSignup)}
              >
                {!isSignup ? 'Регистрация' : 'Вход'}
              </Button>

              <Button
                size='md'
                variant='brandPrimary'
                colorScheme='teal'
                isLoading={props.isSubmitting}
                type='submit'
              >
                {!isSignup ? 'Войти' : 'Зарегистрироваться'}
              </Button>

            </Flex>
          </Stack>

        </Form>
      )}
    </Formik>
  )
}
