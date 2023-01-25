import useBasket from "../hooks/useBasket";
import { basket_wrapper, basket_total } from "../styles/BasketPage.module.css"
import BasketItem from "../components/BasketItem";
import FormBayProduct from "../components/FormBayProduct";
import {useEffect, useState} from "react";
import Box from "../ui/Box/Box";

export default function BasketPage() {
  const { basketProducts } = useBasket();
  const [totalPriceBasket, setTotalPriceBasket] = useState(0);

  useEffect(() => {
    setTotalPriceBasket(basketProducts.reduce((sum, item) => sum + item.volume * item.price, 0))
  }, [basketProducts])

  return (
    <div  className={basket_wrapper}>
      <Box>
        {basketProducts.length === 0 && <div>Здесь еще ничего нет (</div>}
        {basketProducts.map((product) => (
          <BasketItem key={product._id} product={product} setTotalPriceBasket={setTotalPriceBasket} />
        ))}
        {basketProducts.length !== 0 && (
          <strong className={basket_total}>
            <span>ИТОГО </span>
            <span>{totalPriceBasket}</span>
            <span> руб.</span>
          </strong>
        )}
      </Box>
      <FormBayProduct totalPriceBasket={totalPriceBasket} />
    </div>
  )
}
