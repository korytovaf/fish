import {FC} from 'react';
import {FormControl, FormErrorMessage, FormLabel, Input, InputProps} from '@chakra-ui/react';
import {Field} from 'formik';
import {FieldValidator} from 'formik/dist/types';

type MyInputType = {
  name: string,
  label?: string,
  placeholder: string,
  validate?: FieldValidator,
  props: InputProps,
};

export const MyInput:FC<MyInputType> = ({ name, label, placeholder, validate, ...props }) => {
  // const validateName = (value: string) => {
  //   let error
  //   if (!value) {
  //     error = 'Name is required'
  //   } else if (value.toLowerCase() !== 'naruto') {
  //     error = "Jeez! You're not a fan 😱"
  //   }
  //   return error
  // }

  return (
    <Field name={name} validate={validate}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors.name && form.touched.name}>
          {label && <FormLabel>{label}</FormLabel>}
          <Input {...field} placeholder={placeholder} {...props} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
