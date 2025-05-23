import { ProductList } from ".."
import { useProducts } from "../hooks/useProducts";

export const WomenPage = () => {

  const { products, isLoading } = useProducts({ filterKey: "women's clothing" });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>

      <ProductList products={products} />

    </div>
  )
}