import Image from "next/image";
import { card, img_wrapper, img, description, basket_btn, product_name, product_name_description, basket_wrapper, delete_icon } from "../styles/Card.module.css";
import {basket_count} from "../styles/Header.module.css";
import useBasket from "../hooks/useBasket";
import {useCallback, useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "../helpers/fetcher";

export default function Card({ product }) {
  const { data, mutate } = useSWR(process.env.API_URL + "products", fetcher)
  const imageUrl = process.env.API_URL + "images/" + product.images;
  const { addProduct, basketProducts } = useBasket();
  const [basketProductVolume, setBasketProductVolume] = useState(null);

  const addedVolumeProduct = useCallback(() => {
    const filter = basketProducts.filter(i => i._id === product._id)
    if (filter.length > 0) {
      setBasketProductVolume(filter[0].volume)
    }
  }, [basketProducts, product._id])

  useEffect(() => {
    if (basketProducts.length <= 0) return
    addedVolumeProduct();
  }, [addedVolumeProduct, basketProducts])

  const addProductToBasket = () => {
    addProduct(product);
    addedVolumeProduct();
  }

  const deleteProduct = async () => {
    await fetcher(process.env.API_URL + "products/" + product._id, { method: 'DELETE' })
  }

  return (
    <div className={card}>
      <div
        onClick={async () => {
          await deleteProduct();
          await mutate(data.filter(i => i._id === product._id))
        }}
        className={delete_icon}
      >
        Удалить
      </div>
      <div className={img_wrapper} >
        <Image
          className={img}
          src={imageUrl}
          layout="fill"
          objectFit="cover"
          alt={product.name}
        />
      </div>
      <div className={description}>
        <div className={product_name}>{ product.name }</div>
        <div className={product_name_description}>{ product.description }</div>
        <div className={basket_wrapper}>
          <div>
            <strong>от </strong>
            <strong>{ product.price }</strong>
            <strong>{` руб. / ${product.unit}`}</strong>
          </div>
          <button type="button" onClick={addProductToBasket} className={basket_btn}>
            В корзину
            {basketProductVolume && <div className={basket_count}>{basketProductVolume}</div>}
          </button>
        </div>
      </div>
    </div>
  )
}

