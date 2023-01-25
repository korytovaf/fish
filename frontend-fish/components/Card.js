import Image from "next/image";
import { card, img_wrapper, img, description, basket_btn, product_name, product_name_description, basket_wrapper } from "../styles/Card.module.css";
import {basket_count} from "../styles/Header.module.css";
import useBasket from "../hooks/useBasket";
import {useCallback, useEffect, useState} from "react";

export default function Card({ product }) {
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

  console.log(product)

  return (
    <div className={card}>
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

