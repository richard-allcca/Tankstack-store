import { sleep } from "../../helpers/sleep";
import productsApi from "../api/productsApi";
import { Product } from "../interfaces/product";
import { FormInputs } from "../pages/NewProduct";


interface GetProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductsOptions): Promise<Product[]> => {
  // await sleep(2); // Simula un retraso de 2 segundos para la petición

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
  // await sleep(2);
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
}

export const createProduct = async (product: FormInputs): Promise<Product> => {
  await sleep(5);

  throw new Error('Error al crear el producto'); // Simula un error al crear el producto

  const { data } = await productsApi.post<Product>('/products', product);
  return data;
}