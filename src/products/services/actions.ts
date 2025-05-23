import productsApi from "../api/productsApi";
import { Product } from "../interfaces/product";


interface GetProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductsOptions): Promise<Product[]> => {

  // 1° forma (sin template literals)

  // const { data } = await productsApi.get<Product[]>('/products', {
  //   params: {
  //     category: filterKey,
  //   },
  // });

  // 2° forma (con template literals)

  const filterUrl = filterKey ? `?category=${filterKey}` : '';
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);

  return data;
}

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
}