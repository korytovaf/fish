import {createContext, useEffect, useState} from "react";

export const BasketContext = createContext({});
export function BasketContextWrapper({ children }) {
  const [basketProducts, setBasketProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const basketLocal = localStorage.getItem("basket")
      if (basketLocal) {
        setBasketProducts(JSON.parse(basketLocal));
      }
    }
  }, [])

  return (
    <BasketContext.Provider value={[basketProducts, setBasketProducts]} >
      { children }
    </BasketContext.Provider>
  )
}
