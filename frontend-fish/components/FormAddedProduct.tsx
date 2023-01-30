import {FC, useEffect, useRef, useState, MouseEvent, ChangeEvent} from 'react';
// import {
//   form_wrapper,
//   inputs,
//   header_wrapper,
//   header,
//   card,
//   wrapper_description,
//   text_description,
//   placeholder_wrapper
// } from "../styles/FormAddedProduct.module.css"
import Input from "../ui/Input";
import useInput from "../hooks/useInput";
import Textarea from "../ui/Textarea";
import InputRadio from "../ui/InputRadio";
// import {uploadFile} from "../api/fetchData";
import InputFile from "../ui/inputFile";
import Image from "next/image";
import image_placeholder from "../public/icons/image_placeholder.svg";
// import {img, img_wrapper} from "../styles/Card.module.css";
import {useAuth} from "../hooks/useAuth";
import Box from "../ui/Box/Box";
import {fetcher} from '../helpers/fetcher';
import {useSWRConfig} from 'swr';


const listBtnRadio = [
  {id: "kg", name: "unit", value: "кг."},
  {id: "total", name: "unit", value: "шт."}
]


export const FormAddedProduct:FC = () => {
  const { mutate } = useSWRConfig();
  const { user } = useAuth();
  const refFile = useRef<null | HTMLInputElement>(null);
  const name = useInput("", {isEmpty: true});
  const price = useInput("", {isEmpty: true, isOnlyNumber: true});
  const description = useInput("", {isEmpty: true, minLength: 10});
  const [unit, setUnit] = useState("кг.");
  const [images, setImages] = useState("");
  const [validForm, setValidForm] = useState(false);
  const [loadUploadFile, setLoadUploadFile] = useState(false);

  const clearForm: ()=>void = () => {
    name.clear();
    price.clear();
    description.clear();
    setUnit("кг.");
    setImages("");
    refFile.current.value = "";
  }

  const onSubmitForm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validForm) return

    const newProduct = {
      name: name.value,
      price: price.value,
      description: description.value,
      unit,
      images
    }

    await mutate(process.env.API_URL + "products", fetcher(process.env.API_URL + "products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newProduct)
    }));
    clearForm();
  }

  const handlerUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    let formData = new FormData();
    if (e.target && e.target.files[0]) {
      formData.append('img', e.target.files[0]);
    }
    setLoadUploadFile(true);

    // const upload = await uploadFile(formData, user.token);
    // setImages(upload.data.fileName);
    setLoadUploadFile(false)
  }

  useEffect(() => {
    if (name.valid.isValid && price.valid.isValid && description.valid.isValid && !!images) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [name, price, description, images]);

  const imageUrl = process.env.API_URL + "upload/save/" + images;

  return (
    <Box>
      <div>
        <div >
          <h3>Новый товар</h3>
          <div>
            <div>
              {images
                ? (<Image src={imageUrl} layout="responsive" width={300} height={300} alt={name.value} />)
                : (<div>
                  <Image src={image_placeholder} width={100} height={100} alt="image placeholder" />
                </div>)
              }
            </div>
            <div>
              <div>{ name.value ? name.value : "Наименование товара" }</div>
              <div>{ description.value ? description.value : "Описание" }</div>
              <div>
                <strong>{ price.value ? price.value : "0" }</strong>
                <strong> руб.</strong>
              </div>
            </div>
          </div>
        </div>
        <form>
          <Input
            value={name.value}
            handler={name.onChange}
            label="Наименование товара"
            onBlur={name.onBlur}
            dirty={name.isDirty}
            valid={name.valid}
          />
          <Input
            value={price.value}
            handler={price.onChange}
            label="Цена товара"
            onBlur={price.onBlur}
            dirty={price.isDirty}
            valid={price.valid}
          />
          <InputRadio
            title="Единица измерения"
            listBtn={listBtnRadio}
            setValue={setUnit}
            initialValue={unit}
          />
          <Textarea
            value={description.value}
            handler={description.onChange}
            label="Описание продукта"
            onBlur={description.onBlur}
            dirty={description.isDirty}
            valid={description.valid}
          />
          <InputFile
            refFile={refFile}
            handlerUploadFile={handlerUploadFile}
            isload={loadUploadFile}
          />
          <div>
            <button disabled={!validForm} onClick={onSubmitForm}>Сохранить</button>
          </div>
        </form>
      </div>
    </Box>
  )
}
