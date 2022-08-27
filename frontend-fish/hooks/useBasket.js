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

  const removeProductVolume = (product) => {
    const index = basketProducts.findIndex(item => item._id === product._id)
    if (index !== -1) {
      if (product.volume === 1) return
      basketProducts[index].volume --
      setBasketProducts(basketProducts)
      localStorage.setItem("basket", JSON.stringify(basketProducts))
    }
  }

  const removeProduct = (product) => {
    setBasketProducts(basketProducts.filter(i => i._id !== product._id))
    localStorage.setItem("basket", JSON.stringify(basketProducts.filter(i => i._id !== product._id)))
  }

  const clearBasket = () => {
    setBasketProducts([])
    localStorage.removeItem("basket");
  }

  return {
    addProduct, basketProducts, removeProductVolume, removeProduct, clearBasket
  }
}
