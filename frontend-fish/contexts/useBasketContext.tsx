import {FC, ReactNode, createContext, useEffect, useState, Dispatch, SetStateAction} from 'react';
import {productType} from '../types';

type BasketContextType = {
  basketProducts: productType[];
  setBasketProducts: Dispatch<SetStateAction<productType[]>>;
}

type BasketContextWrapperType = {
  children: ReactNode,
}

export const BasketContext = createContext<BasketContextType>({
  basketProducts: [],
  setBasketProducts: () => {},
});

export const BasketContextWrapper:FC<BasketContextWrapperType> = ({ children }) => {
  const [basketProducts, setBasketProducts] = useState<productType[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const basketLocal = localStorage.getItem("basket")
      if (basketLocal) {
        setBasketProducts(JSON.parse(basketLocal));
      }
    }
  }, []);

  const context: BasketContextType = {
    basketProducts,
    setBasketProducts,
  }

  return (
    <BasketContext.Provider value={context} >
      { children }
    </BasketContext.Provider>
  )
}
