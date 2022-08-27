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
import {fetchData} from "../api/fetchData";
import useBasket from "../hooks/useBasket";

export default function FormBayProduct({ totalPriceBasket }) {
  const { basketProducts } = useBasket();
  const consumer = useInput("", {isEmpty: true});
  const phone = useInput("", {isEmpty: true, isOnlyNumber: true});
  const address = useInput("", {isEmpty: true});
  const [validForm, setValidForm] = useState(false);

  const clearForm = () => {
    consumer.clear();
    phone.clear();
    address.clear();
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!validForm) return

    const purchase = {
      consumer: consumer.value,
      phone: phone.value,
      address: address.value,
      products_basket: basketProducts,
      totalPriceBasket
    }
    const bay = await fetchData('post', 'orders', purchase);
    if (bay.status === 200) clearForm();
  }

  useEffect(() => {
    if (consumer.valid.isValid && phone.valid.isValid && address.valid.isValid && basketProducts.length !== 0 && totalPriceBasket !== 0) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [address.valid.isValid, basketProducts.length, consumer.valid.isValid, phone.valid.isValid, totalPriceBasket]);

  return (
    <div className={form}>
      <div>
        <h3>Условия покупки и доставки</h3>
        <p>После того как вы отправите заказ, мы свяжемся с вами что-бы уточнить время и адрес доставки.</p>
        <p>Доставка в пределах г.Санкт-Петербурга ...</p>
        <p>...</p>
        <p>Оплата производится при получении товара, наличными или через терминал</p>
      </div>
      <div className={inputs}>
        <Input
          value={consumer.value}
          handler={consumer.onChange}
          label="Имя покупателя"
          onBlur={consumer.onBlur}
          dirty={consumer.isDirty}
          valid={consumer.valid}
        />
        <Input
          value={phone.value}
          handler={phone.onChange}
          label="Телефон"
          onBlur={phone.onBlur}
          dirty={phone.isDirty}
          valid={phone.valid}
        />
        <Input
          value={address.value}
          handler={address.onChange}
          label="Адрес доставки"
          onBlur={address.onBlur}
          dirty={address.isDirty}
          valid={address.valid}
        />
        <div>
          <button disabled={!validForm} className={button} onClick={onSubmitForm}>Отправить заказ</button>
        </div>
      </div>
    </div>
  )
}
