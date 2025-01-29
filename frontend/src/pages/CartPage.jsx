import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartStore } from '../stores/cartStore'; // Assuming cartStore manages cart-related state

const CartPage = () => {
  const { removeFromCart, updateQuantity, cart, total, subtotal } = cartStore(); // Access cart state and methods
  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedtotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">No products in cart.</p>
          <Link
            to="/products"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="col-span-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-600">Category: {item.category}</p>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className={`px-2 py-1 ${
                        item.quantity === 1
                          ? 'bg-gray-300 text-gray-500'
                          : 'bg-gray-200 text-black hover:bg-gray-300'
                      } rounded-lg font-semibold`}
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-lg font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="text-gray-600 mb-2">
              Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
            <p className="text-gray-600 mb-4">Total Price: {formattedtotal}</p>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg w-full"
              onClick={() => console.log('Proceeding to checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
