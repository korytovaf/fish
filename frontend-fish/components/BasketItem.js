import {
  product_wrapper,
  product_img_wrapper,
  product_img,
  product_count_wrapper,
  product_count_btn,
  product_count
} from "../styles/BasketItem.module.css"
import Image from "next/image";
import useBasket from "../hooks/useBasket";
import {useState} from "react";
import RemoveIcon from "../icons/RevoveIcon";


export default function BasketItem({ product, setTotalPriceBasket }) {
  const imageUrl = process.env.API_URL + "images/" + product.images;
  const [count, setCount] = useState(product.volume);
  const { addProduct, removeProductVolume, removeProduct, basketProducts } = useBasket();

  const totalPrise = () => basketProducts.reduce((sum, item) => sum + item.volume * item.price, 0)

  const handleAddProduct = () => {
    addProduct(product)
    setCount(count + 1)
    setTotalPriceBasket(totalPrise())
  }

  const handleRemoveVolume = () => {
    if (product.volume === 1) return
    removeProductVolume(product)
    setCount(count - 1)
    setTotalPriceBasket(totalPrise())
  }

  const handleRemoveProduct = () => {
    removeProduct(product)
    setTotalPriceBasket(totalPrise())
  }

  return (
    <div className={product_wrapper}>
      <div className={product_img_wrapper}>
        <Image className={product_img} src={imageUrl} width={90} height={90} alt={product.name} />
      </div>
      <div>
        <div>{product.name}</div>
        <strong>
          <span>{product.price}</span>
          <span> руб.</span>
        </strong>
      </div>
      <div className={product_count_wrapper}>
        <button type="button" className={product_count_btn} onClick={handleRemoveVolume}>-</button>
        <div className={product_count}>{count}</div>
        <button type="button" className={product_count_btn} onClick={handleAddProduct}>+</button>
      </div>
      <strong>
        <span>{product.price * count}</span>
        <span> руб.</span>
      </strong>
      <button type="button" className={product_count_btn} onClick={handleRemoveProduct}>
        <RemoveIcon  />
      </button>
    </div>
  )
}
