

import { useQuery } from '@tanstack/react-query';
import { Product } from '../interfaces/product';
import { getProductById } from '../services/actions';

interface Options {
  id: string;
}

const useProduct = ({ id }: Options) => {

  const { data: product = {} as Product, isLoading, error, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 60, // 1 hora
  })

  return { product, isLoading, error, isError }
}

export default useProduct