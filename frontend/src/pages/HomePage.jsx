import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import { productStore } from '../stores/productStore';
import { cartStore } from '../stores/cartStore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link, redirect } from 'react-router-dom';
import { userStore } from '../stores/userStore';
import toast from 'react-hot-toast';

const HomePage = () => {
  const { fetchFeaturedProducts, products } = productStore();
  const { addToCart } = cartStore();
  const {user} = userStore();
  const productListRef = useRef();
  const handleScroll = () => {
    productListRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const handleCart = (product, e) => {
    e.preventDefault();
    if(!user) {
      toast.error("Please Login to add products to cart");
      return;
    }
    addToCart(product);
  };
  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const carouselImages = [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    // 'https://images.unsplash.com/photo-1617119318270-0b5e5c7d7b0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Luxury Carousel */} 
      <div className="relative h-[450px] w-full overflow-hidden">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full"
        >
          {carouselImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={`Luxury Jewelry ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
                <div className="absolute left-12 bottom-12 text-white max-w-2xl">
                  <h2 className="text-5xl font-playfair font-bold mb-4 animate-fadeInUp">
                    Timeless Elegance
                  </h2>
                  <p className="text-xl mb-6 opacity-90 animate-fadeInUp delay-100">
                    Discover our exquisite collection of handcrafted jewelry pieces
                  </p>
                  <button onClick={handleScroll} className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-all duration-300 hover:shadow-xl animate-fadeInUp delay-200">
                    Explore Collection
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Featured Section */}
      <div ref={productListRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-playfair font-bold text-gray-900 mb-4">
            Curated Luxury
            <span className="block mt-2 text-3xl text-rose-600">Featured Collection</span>
          </h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-4 rounded-full" />
        </div>

        {products.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Discovering exquisite pieces...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link to={`products/product/${product._id}`} >
                <div
                  key={product._id}
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
                      <h2 className="text-xl font-semibold text-gray-900 truncate">
                        {product.name}
                      </h2>
                      <span className="text-lg font-playfair font-bold text-amber-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">
                      {product.category}
                    </p>

                    {/* Rating Badge */}
                    <div className="flex items-center space-x-1">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">(128)</span>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage