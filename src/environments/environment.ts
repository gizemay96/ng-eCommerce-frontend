const baseURL = 'http://localhost:1337';

export const environment = {
  production: false,
  baseApiURL: baseURL,
  usersApiURL: `${baseURL}/users`,
  productsApiURL: `${baseURL}/products`,
  categoriesApiURL: `${baseURL}/categories`,
  cartsApiURL: `${baseURL}/carts`,
  addressApiURL: `${baseURL}/addresses`,
  orderApiURL: `${baseURL}/orders`,
  purcaseApiURL: `${baseURL}/purchases`
};
