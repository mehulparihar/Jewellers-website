import React, { useEffect, useState, useMemo } from 'react';
import { productStore } from '../stores/productStore';
import { useParams, Link } from 'react-router-dom';
import { userStore } from '../stores/userStore';
import toast from 'react-hot-toast';
import { cartStore } from '../stores/cartStore';

const CategoryPage = () => {
  const { user } = userStore();
  const { fetchProductByCategory, products } = productStore();
  const { category } = useParams();
  const { addToCart } = cartStore();

  // --- Filter state variables ---
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [jewelleryType, setJewelleryType] = useState('');
  const [purity, setPurity] = useState('');
  const [metalType, setMetalType] = useState('');
  const [metalColour, setMetalColour] = useState('');

  // --- Sort state variable ---
  // Options: "", "priceLowToHigh", "priceHighToLow", "newArrivals", "recommended"
  const [sortOption, setSortOption] = useState('');

  // Dropdown toggles for filter and sort
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Fetch products by category on mount or when category changes
  useEffect(() => {
    if (category) {
      fetchProductByCategory(category);
    }
  }, [category, fetchProductByCategory]);

  // Quick "Add to Cart" handler (prevents event bubbling to Link)
  const handleCart = (product, e) => {
    e.preventDefault();
    if (user) {
      addToCart(product);
      toast.success('Added to cart!');
    } else {
      toast.error('Please login to add to cart.');
    }
  };

  // --- Filter the products based on the criteria ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      let meetsCriteria = true;
      if (minPrice !== '' && product.price < Number(minPrice)) {
        meetsCriteria = false;
      }
      if (maxPrice !== '' && product.price > Number(maxPrice)) {
        meetsCriteria = false;
      }
      if (
        jewelleryType !== '' &&
        product.Basic_Details &&
        product.Basic_Details.Item_Type.toLowerCase() !== jewelleryType.toLowerCase()
      ) {
        meetsCriteria = false;
      }
      if (
        purity !== '' &&
        product.Metal_Detail &&
        product.Metal_Detail.Metal_Purity.toString() !== purity.toString()
      ) {
        meetsCriteria = false;
      }
      if (
        metalType !== '' &&
        product.Metal_Detail &&
        product.Metal_Detail.Metal_Type.toLowerCase() !== metalType.toLowerCase()
      ) {
        meetsCriteria = false;
      }
      if (
        metalColour !== '' &&
        product.Metal_Detail &&
        product.Metal_Detail.Metal_Colour.toLowerCase().trim() !== metalColour.toLowerCase().trim()
      ) {
        meetsCriteria = false;
      }
      return meetsCriteria;
    });
  }, [products, minPrice, maxPrice, jewelleryType, purity, metalType, metalColour]);

  // --- Sort the filtered products based on the selected sort option ---
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOption === 'priceLowToHigh') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newArrivals') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'recommended') {
      sorted.sort((a, b) => {
        if (a.isFeatured === b.isFeatured) return 0;
        return a.isFeatured ? -1 : 1;
      });
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Redesigned Collection Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            <span className="block">Explore the</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700">
              {category} Collection
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover exquisite pieces curated just for you.
          </p>
        </div>

        {/* Filter & Sort Container */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between">
          {/* Filter Button & Dropdown */}
          <div className="relative flex-1 max-w-[280px]">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="w-full flex items-center justify-between space-x-3 bg-white px-5 py-3.5 rounded-lg border border-gray-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span className="font-medium text-gray-700">Filters</span>
              </div>
              <svg
                className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${showFilterDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showFilterDropdown && (
              <div className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100">
                <div className="p-6 space-y-6">
                  {/* Price Range */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Price Range</h3>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          placeholder="Min"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          placeholder="Max"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Jewelry Details */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Jewelry Details</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text"
                        value={jewelleryType}
                        onChange={(e) => setJewelleryType(e.target.value)}
                        placeholder="Jewelry Type"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      <input
                        type="text"
                        value={metalType}
                        onChange={(e) => setMetalType(e.target.value)}
                        placeholder="Metal Type"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      <input
                        type="text"
                        value={metalColour}
                        onChange={(e) => setMetalColour(e.target.value)}
                        placeholder="Metal Colour"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      <input
                        type="text"
                        value={purity}
                        onChange={(e) => setPurity(e.target.value)}
                        placeholder="Purity"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
                {/* Clear Filters */}
                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 rounded-b-xl">
                  <button
                    onClick={() => {
                      setMinPrice('');
                      setMaxPrice('');
                      setJewelleryType('');
                      setMetalType('');
                      setMetalColour('');
                      setPurity('');
                    }}
                    className="text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sort Button & Dropdown */}
          <div className="relative flex-1 max-w-[200px]">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="w-full flex items-center justify-between space-x-3 bg-white px-5 py-3.5 rounded-lg border border-gray-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                  />
                </svg>
                <span className="font-medium text-gray-700">Sort By</span>
              </div>
              <svg
                className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${showSortDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showSortDropdown && (
              <div className="absolute z-20 right-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100">
                <div className="p-2 space-y-1">
                  {[
                    { value: '', label: 'Default' },
                    { value: 'priceLowToHigh', label: 'Price: Low to High' },
                    { value: 'priceHighToLow', label: 'Price: High to Low' },
                    { value: 'newArrivals', label: 'New Arrivals' },
                    { value: 'recommended', label: 'Recommended' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOption(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded flex items-center justify-between ${
                        sortOption === option.value ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortOption === option.value && (
                        <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Discovering exquisite pieces...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <Link key={product._id} to={`/products/product/${product._id}`}>
                <div
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                             border border-opacity-10 border-gray-300 hover:border-opacity-20 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => handleCart(product, e)}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                 px-6 py-2 bg-white/90 backdrop-blur-sm text-amber-600 rounded-full shadow-md 
                                 hover:bg-white hover:shadow-lg transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                  {/* Product Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold text-gray-900 truncate">{product.name}</h2>
                      <span className="text-lg font-playfair font-bold text-amber-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">{product.category}</p>
                    <div className="flex items-center space-x-1">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">(128)</span>
                    </div>
                  </div>
                  {/* Featured Badge */}
                  {product.isFeatured && (
                    <div className="absolute top-4 right-4 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
