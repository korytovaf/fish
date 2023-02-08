import {Dispatch, SetStateAction} from 'react';


export interface createProductType {
  name: string,
  description: string,
  price: string | number,
  unit: 'кг' | 'шт',
  images: string,
  available: 'available' | 'unavailable',
  _id?: string,
  fixedPrice: 'fixed' | 'notFixed',
}

export interface productType extends createProductType {
  volume: number,
}

export interface purchaseType {
  consumer: string,
  phone: string,
  address: string,
}

export interface basketItemProps extends productType {
  product: productType
  volume: number,
  setTotalPriceBasket: Dispatch<SetStateAction<number>>,
}

export interface basketPurchaseType extends purchaseType {
  products_basket: basketItemProps[],
  totalPriceBasket: string
  volume: number,
}


export type userType = {
  email: string,
  isAdmin: boolean,
  name: string,
  token: string,
}

export type ResponseUploadImg = {
  fileName: string
}
