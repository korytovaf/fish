import axios, {AxiosResponse} from 'axios';
import {FormValuesLogin} from '../components/molecules/AuthForm';
import {basketPurchaseType, createProductType, productType, ResponseUploadImg, userType} from '../types';
import {parseCookies} from 'nookies';

const api = axios.create({
  baseURL: process.env.API_URL
})

export const signupEndpoint = 'auth/signup'
export const loginEndpoint = 'auth/login'
export const userEndpoint = 'auth/user'
export const createOrder = 'orders'
export const productsEndpoint = 'products'
export const uploadFileEndpoint = 'upload'

const tokenCookie = parseCookies(null, 'fish-auth-user')

export const onSignupApi: (data: FormValuesLogin) => Promise<userType> = async (data) => {
  try {
    const res = await api.post(signupEndpoint, data);
    return res.data;
  } catch (error) {
    throw error.response.data
  }
}


export const onLoginApi: (data: FormValuesLogin) => Promise<userType> = async (data) => {
  try {
    const res = await api.post(loginEndpoint, data);
    return res.data;
  } catch (error) {
    throw error.response.data
  }
}

export const getUser: () => Promise<userType> = async () => {
  try {
    const res = await api.get(userEndpoint, {
      headers: {
        Authorization: `Bearer ${tokenCookie['fish-auth-user']}`,
      }
    })
    return res.data
  } catch (error) {
    throw error.response.data
  }
}


export const getProduct: () => Promise<productType[]> = async () => {
  try {
    const res = await api.get(productsEndpoint)
    return res.data
  } catch (error) {
    throw error.response.data
  }
}


export const getProductId: (id: string) => Promise<productType> = async (id) => {
  try {
    const res = await api.get(productsEndpoint + '/' + id)
    return res.data
  } catch (error) {
    throw error.response.data
  }
}


export const createProduct: (data: createProductType) => Promise<createProductType> = async (data) => {
  try {
    const res: AxiosResponse<productType> = await api.post(productsEndpoint, data, {
      headers: {
        Authorization: `Bearer ${tokenCookie['fish-auth-user']}`,
      }
    })
    return res.data
  } catch (error) {
    throw error.response.data
  }
}


export const updateProduct: (id: string, data: createProductType) => Promise<createProductType> = async (id, data) => {
  try {
    const res: AxiosResponse<productType> = await api.patch(productsEndpoint + '/' + id, data, {
      headers: {
        Authorization: `Bearer ${tokenCookie['fish-auth-user']}`,
      }
    })
    return res.data
  } catch (error) {
    throw error.response.data
  }
}


export const deleteProduct: (id: string) => Promise<productType> = async (id) => {
  try {
    const res = await api.delete(productsEndpoint + '/' + id)
    return res.data
  } catch (error) {
    throw error.response.data
  }
}


export const uploadFile: (data: FormData) => Promise<ResponseUploadImg> = async (data) => {
  try {
    const res: AxiosResponse<ResponseUploadImg> = await api.post(uploadFileEndpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${tokenCookie['fish-auth-user']}`,
      }
    })
    return res.data
  } catch (error) {
    throw error.response.data
  }
}



export const onCreateOrder: (data: basketPurchaseType) => Promise<basketPurchaseType> = async (data) => {
  return await api.post(createOrder, data)
}
