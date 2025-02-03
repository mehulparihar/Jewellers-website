import React, { useEffect } from 'react'
import { productStore } from '../stores/productStore'
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { fetchProductById, product} = productStore();
  const { productId } = useParams();
  useEffect(() => {
        fetchProductById(productId)
      }, [productId])
  if(!product) return <p>Loading...</p>
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  )
}

export default ProductPage