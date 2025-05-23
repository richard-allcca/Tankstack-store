

import { useQueryClient } from '@tanstack/react-query';
import { getProductById } from '../services/actions';

const usePrefetchProduct = () => {

  const queryClient = useQueryClient()

  const prefetchProduct = (id: string) => {
    // Prefetch the product data
    queryClient.prefetchQuery({
      queryKey: ['product', id],
      queryFn: () => getProductById(id)
    })

  }

  return prefetchProduct
}

export default usePrefetchProduct