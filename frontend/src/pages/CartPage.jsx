import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartStore } from '../stores/cartStore';

const CartPage = () => {
  // Subscribe to state updates using hook selectors
  const cart = cartStore((state) => state.cart);
  const removeFromCart = cartStore((state) => state.removeFromCart);
  const updateQuantity = cartStore((state) => state.updateQuantity);
  const total = cartStore((state) => state.total);
  const subtotal = cartStore((state) => state.subtotal);
  
  const savings = subtotal - total;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold text-gray-900 text-center mb-12">
          Your Luxury Collection
          <span className="block mt-2 text-2xl text-rose-600">Curated with Care</span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center bg-white rounded-2xl p-12 shadow-xl max-w-md mx-auto">
            <div className="animate-bounce-slow text-6xl mb-6">🛍️</div>
            <p className="text-xl text-gray-600 mb-8 font-light">
              Your curated collection awaits...
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-xl font-medium 
              hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Begin Your Journey
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id} // using _id consistently
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300
                    border border-opacity-10 border-gray-300 hover:border-opacity-20"
                >
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg
                      hover:scale-110 transition-all duration-200 text-rose-600 hover:text-rose-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex items-start space-x-6">
                    <div className="relative w-32 h-32 overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{item.name}</h2>
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">
                        {item.category}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity === 1}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center 
                              ${item.quantity === 1 ? 'bg-gray-100 text-gray-400' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'}
                              transition-colors duration-200`}
                          >
                            −
                          </button>
                          <span className="text-xl font-medium text-gray-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-50 text-amber-600 
                              hover:bg-amber-100 transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-2xl font-playfair font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-xl h-fit sticky top-8">
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Savings</span>
                  <span className="text-rose-600 font-medium">− ₹{savings.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 my-4" />
                <div className="flex justify-between text-xl">
                  <span className="font-semibold">Total</span>
                  <span className="font-playfair font-bold text-gray-900">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                className="w-full py-4 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-xl font-semibold
                  hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                onClick={() => console.log('Proceeding to checkout')}
              >
                Secure Checkout
                <span className="block text-sm font-light mt-1">Free Shipping & Returns</span>
              </button>

              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-rose-600 hover:text-rose-700 transition-colors"
                >
                  Continue Shopping
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
