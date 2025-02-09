import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productStore } from '../stores/productStore';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiZap, FiAnchor, FiInfo } from 'react-icons/fi';

const ProductPage = () => {
  const { fetchProductById, product } = productStore();
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProductById(productId);
  }, [productId, fetchProductById]);

  if (!product)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-slate-900"
      >
        <div className="space-y-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden"
    >
      {/* Floating Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-amber-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-64 left-0 w-96 h-96 bg-gradient-to-r from-slate-300/20 to-slate-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10">
            {/* Image Gallery Section */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {[1, 2, 3].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${selectedImage === index ? 'bg-amber-500' : 'bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    {/* <FiDiamond className="w-5 h-5 text-amber-500" /> */}
                    <span className="font-medium">{product.Metal_Detail?.Metal_Type}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <FiAnchor className="w-5 h-5 text-amber-500" />
                    <span className="font-medium">{product.Basic_Details?.Gross_Weight}g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.h1
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold text-slate-900 tracking-tight"
                >
                  {product.name}
                </motion.h1>
                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </p>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                    Free Shipping
                  </span>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Specification Tabs */}
              <div className="space-y-6">
                <div className="border-b border-slate-200">
                  <div className="flex gap-6">
                    <button className="pb-4 px-1 border-b-2 border-amber-500 text-amber-600 font-medium">
                      Specifications
                    </button>
                  </div>
                </div>

                {/* Detail Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Details */}
                  <div className="p-6 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                      <FiInfo className="w-5 h-5 text-amber-500" />
                      Basic Details
                    </h3>
                    <dl className="space-y-2">
                      {Object.entries(product.Basic_Details)
                        .filter(([key]) => key.toLowerCase() !== '_id')
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm text-slate-600">
                            <dt className="font-medium capitalize">{key.replace(/_/g, ' ')}</dt>
                            <dd className="text-slate-500">{value || 'N/A'}</dd>
                          </div>
                        ))}
                    </dl>
                  </div>

                  {/* Metal Details */}
                  <div className="p-6 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                      <FiZap className="w-5 h-5 text-amber-500" />
                      Metal Details
                    </h3>
                    <dl className="space-y-2">
                      {Object.entries(product.Metal_Detail)
                        .filter(([key]) => key.toLowerCase() !== '_id')
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm text-slate-600">
                            <dt className="font-medium capitalize">{key.replace(/_/g, ' ')}</dt>
                            <dd className="text-slate-500">{value || 'N/A'}</dd>
                          </div>
                        ))}
                    </dl>
                  </div>

                  {/* Price Composition */}
                  <div className="md:col-span-2 p-6 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Price Composition</h3>
                    <div className="space-y-4">
                      {Object.entries(product.Price_Breakup)
                        .filter(([key]) => key.toLowerCase() !== '_id')
                        .map(([key, value]) => (
                          <div key={key} className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize text-slate-600">{key.replace(/_/g, ' ')}</span>
                                <span className="text-slate-500">${value}</span>
                              </div>
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
                                  style={{ width: `${(value / product.price) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-200 transition-all"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-slate-200 transition-all"
                >
                  <FiZap className="w-5 h-5" />
                  Buy Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-slate-900/10 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default ProductPage;