import {BasketContext} from "../contexts/useBasketContext";
import {useContext} from "react";

export default function useBasket() {
  const [basketProducts, setBasketProducts]  = useContext(BasketContext);

  const addProduct = (product) => {
    if (basketProducts.length === 0) {
      product.volume = 1;
      setBasketProducts([product]);
      localStorage.setItem("basket", JSON.stringify([product]))
      return;
    }

    const index = basketProducts.findIndex(item => item._id === product._id)
    if (index === -1) {
      product.volume = 1;
      setBasketProducts([...basketProducts, product])
      localStorage.setItem("basket", JSON.stringify([...basketProducts, product]))
    } else {
      basketProducts[index].volume ++
      setBasketProducts(basketProducts)
      localStorage.setItem("basket", JSON.stringify(basketProducts))
    }
  }

  return {
    addProduct, basketProducts
  }
}
