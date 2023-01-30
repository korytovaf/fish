export type productType = {
  name: string,
  description: string,
  price: number,
  volume: number,
  images: string,
  unit: string,
  _id: string,
}

export type userType = {
  email: string,
  isAdmin: boolean,
  name: string,
  token: string,
}
