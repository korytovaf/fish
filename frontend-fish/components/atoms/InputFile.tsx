import {Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement} from '@chakra-ui/react';
import {Field, FormikHelpers} from 'formik';
import {ChangeEvent, FC, RefObject} from 'react';
import {createProductType} from '../../types';
import {ImgIcon} from '../../ui/icons/ImgIcon';

interface InputFileType {
  refFile: RefObject<HTMLInputElement>,
  handlerUploadFile: (e: ChangeEvent<HTMLInputElement>, field: createProductType, form: FormikHelpers<createProductType>) => void,
  name: string
}

export const InputFile:FC<InputFileType> = ({refFile, handlerUploadFile, name}) => {

  const handlePick = (e) => {
    e.preventDefault()
    refFile.current.click()
  }

  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors.image && form.touched.image}>
          <InputGroup size='lg'>
            <Input
              {...field}
              variant='Filled'
              borderRadius='xl'
              pr='4.5rem'
              disabled
              placeholder="Загрузить изображение"
            />

            <InputRightElement width='auto'>
              <Button size='md' onClick={handlePick} variant='brandPrimary' leftIcon={<ImgIcon height={20} width={20} />}>
                Загрузить
              </Button>
            </InputRightElement>

          </InputGroup>
          <input
            style={{display: 'none'}}
            ref={refFile}
            type="file"
            onChange={(e) => handlerUploadFile(e, field, form)}
            accept="image/*,.png,.jpg,.gif,.webp"
          />
          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
