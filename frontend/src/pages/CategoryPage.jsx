import React, { useEffect } from 'react'
import { productStore } from '../stores/productStore'
import { useParams } from 'react-router-dom';
import { userStore } from '../stores/userStore';
import toast from 'react-hot-toast';
import { cartStore } from '../stores/cartStore';

const CategoryPage = () => {
    const {user} = userStore();
    const {fetchProductByCategory, products} = productStore();
    const {category} = useParams();
    const { addToCart } = cartStore();
    useEffect(() => {
        fetchProductByCategory(category);
    }, [fetchProductByCategory])
    console.log(products);
    return (
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold text-center mb-8">{category}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg"
                onClick={() => console.log(`Clicked on ${product.name}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">₹{product.price}</p>
                  <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        if(!user) {
                            toast.error("Please login to add products", {id : "login"});
                        }
                        else {
                            addToCart(product);
                        }
                      console.log(`Added ${product.name} to cart`);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full text-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default CategoryPage