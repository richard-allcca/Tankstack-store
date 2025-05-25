import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/actions";
import { Product } from "../interfaces/product";

const useProductMutation = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,

    onMutate: (newProduct) => { // Esta función se ejecuta antes de que la mutación se envíe al servidor
      // Aquí puedes optimizar la UI antes de que la mutación se complete
      console.log('Nuevo producto a crear:', newProduct);
      // Optimistic product creation
      const optimisticProduct: Product = {
        id: Math.random(), // Asegúrate de que el ID sea único o generado
        ...newProduct
      };
      // Almacena el producto optimista en la caché
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: newProduct.category }],
        (oldData) => {
          if (!oldData) return [optimisticProduct];
          return [...oldData, optimisticProduct];
        }
      );

      return { optimisticProduct };
    },

    // data es el producto creado exitosamente, _variables son los datos enviados a la mutación, y context es el valor retornado por onMutate
    onSuccess: (data, _variables, context) => {
      console.log('Producto creado exitosamente:', data);
      // alert('Producto creado exitosamente, revisa la consola para más detalles');

      // SECTION -  Invalida la caché de productos para que se actualice
      // queryClient.invalidateQueries({ queryKey: ['products', data.category] });

      // SECTION - Si quieres redirigir al usuario a otra página después de crear el producto, puedes hacerlo aquí
      // window.location.href = '/products'; // Por ejemplo, redirigir a la lista de productos

      // SECTION - Si quieres actualizar la lista de productos en la caché, puedes hacerlo aquí
      // queryClient.setQueryData<Product[]>(
      //   // Asegúrate de que el filtro coincida con el que usas en tu query
      //   ['products', { filterKey: data.category }],
      //   (oldData) => {
      //     // Si no hay datos previos, retorna un nuevo array con el producto creado
      //     if (!oldData) return [data];
      //     // Si hay datos previos, concatena el nuevo producto al array existente
      //     return [...oldData, data];
      //   }
      // );

      // SECTION - Si quieres eliminar la query de productos optimista que se creó en onMutate, puedes hacerlo aquí
      queryClient.removeQueries({
        queryKey: ['products', { filterKey: context?.optimisticProduct.id }],
      });

      // SECTION - Si quieres actualizar la lista de productos en la caché, luego de usar el optimistic update
      queryClient.setQueryData<Product[]>(
        // Asegúrate de que el filtro coincida con el que usas en tu query
        ['products', { filterKey: data.category }],
        (oldData) => {
          // Si no hay datos previos, retorna un nuevo array con el producto creado
          if (!oldData) return [data];

          return oldData.map((cacheProduct) =>
            cacheProduct.id === context.optimisticProduct.id ? data : cacheProduct
          );
        }
      );
    },

    onError: (error, variables, context) => {
      console.error('Error al crear el producto:', error);
      // alert('Error al crear el producto, revisa la consola para más detalles');

      // Remueve el producto optimista de la caché si la mutación falla
      queryClient.removeQueries({
        queryKey: ['products', { filterKey: context?.optimisticProduct.id }],
      });

      // Eliminar el producto optimista de la caché
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: variables.category }],
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((product) => product.id !== context?.optimisticProduct.id);
        }
      );
    }
  });

  return mutation;
}

export default useProductMutation;