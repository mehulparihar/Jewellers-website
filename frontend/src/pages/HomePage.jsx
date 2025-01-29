import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import { productStore } from '../stores/productStore'
import { cartStore } from '../stores/cartStore'

const HomePage = () => {
  const { fetchFeaturedProducts, products } = productStore();
  const {addToCart} = cartStore();
  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);
  return (
    <div>
      <Carousel />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Featured Tag */}
        <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">
          ✨ Featured ✨
        </h1>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-lg">No featured products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-600">Price: ₹{product.price}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage