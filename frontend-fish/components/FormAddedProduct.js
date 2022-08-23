import {useEffect, useRef, useState} from "react";
import {
  form,
  inputs,
  header_wrapper,
  header,
  button,
  card,
  wrapper_description,
  text_description,
  placeholder_wrapper
} from "../styles/FormAddedProduct.module.css"
import Input from "../ui/Input";
import useInput from "../hooks/useInput";
import Textarea from "../ui/Textarea";
import InputRadio from "../ui/InputRadio";
import {fetchData, uploadFile} from "../api/fetchData";
import InputFile from "../ui/inputFile";
import Image from "next/image";
import image_placeholder from "../public/icons/image_placeholder.svg";
import {img, img_wrapper} from "../styles/Card.module.css";


const listBtnRadio = [
  {id: "kg", name: "unit", value: "кг."},
  {id: "total", name: "unit", value: "шт."}
]


export default function FormAddedProduct() {

  const refFile = useRef();
  const name = useInput("", {isEmpty: true});
  const price = useInput("", {isEmpty: true, isOnlyNumber: true});
  const description = useInput("", {isEmpty: true, minLength: 10});
  const [unit, setUnit] = useState("кг.");
  const [images, setImages] = useState("");
  const [validForm, setValidForm] = useState(false);
  const [loadUploadFile, setLoadUploadFile] = useState(false)


  const clearForm = () => {
    name.clear();
    price.clear();
    description.clear();
    setUnit("кг.");
    setImages("");
    refFile.current.value = "";
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!validForm) return

    const newProduct = {
      name: name.value,
      price: price.value,
      description: description.value,
      unit,
      images
    }
    const product = await fetchData('post', 'products', newProduct);
    if (product.status === 200) clearForm();
  }

  const handlerUploadFile = async (e) => {
    let formData = new FormData();
    if (e.target && e.target.files[0]) formData.append('img', e.target.files[0]);

    setLoadUploadFile(true);
    const upload = await uploadFile(formData);
    setImages(upload.data.fileName);
    setLoadUploadFile(false)
  }

  useEffect(() => {
    if (name.valid.isValid && price.valid.isValid && description.valid.isValid && !!images) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [name, price, description, images]);

  const imageUrl = process.env.API_URL + "upload/" + images;
  // console.log(images)

  return (
    <form className={form}>
      <div className={header_wrapper}>
        <h3 className={header}>Новый товар</h3>
        <div className={card}>
          <div className={img_wrapper}>
            {images
              ? <Image className={img} src={imageUrl} layout="responsive" width={300} height={300}/>
              : <div className={placeholder_wrapper}>
                  <Image src={image_placeholder} width={100} height={100} />
                </div>
            }
          </div>
          <div className={wrapper_description}>
            <div>{ name.value ? name.value : "Наименование товара" }</div>
            <div className={text_description}>{ description.value ? description.value : "Описание" }</div>
            <div>
              <strong>{ price.value ? price.value : "0" }</strong>
              <strong> руб.</strong>
            </div>
          </div>
        </div>
      </div>
      <div className={inputs}>
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
          <button disabled={!validForm} className={button} onClick={onSubmitForm}>Сохранить</button>
        </div>
      </div>
    </form>
  )
}
