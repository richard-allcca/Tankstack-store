import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/actions";


interface Options {
  filterKey?: string;
}

export const useProducts = ({ filterKey }: Options) => {
  const { data: products = [], isLoading, error, isError } = useQuery({
    queryKey: ['products', { filterKey }],
    queryFn: () => getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60, // 1 hora
    // enabled: !!filterKey, // Only run the query if filterKey is not empty
  })

  return {
    products,
    isLoading,
    isError,
    error,
  }
}
