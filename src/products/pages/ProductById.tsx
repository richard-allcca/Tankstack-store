import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import useProduct from '../hooks/useProduct';

const ProductById = () => {

  const { id = '' } = useParams<{ id: string }>()

  const { product, isLoading } = useProduct({ id: id })

  if (isLoading) return <div>Loading...</div>
  if (!product) return <div>Product not found</div>

  return (
    <ProductCard product={product} fullDescription={true} />
  )
}

export default ProductById