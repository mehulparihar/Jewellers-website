import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { XMarkIcon, Bars3Icon, ShoppingBagIcon, HeartIcon, MagnifyingGlassIcon, } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { userStore } from '../stores/userStore'
import { cartStore } from '../stores/cartStore'
import { rateStore } from '../stores/rateStore'


const Navbar = () => {
  const { gold, silver, platinum, fetchRates } = rateStore();
  useEffect(() => {
    fetchRates();
  }, [fetchRates]);
  const navigation = {
    categories: [
      {
        id: 'Rings',
        name: 'Rings',
        href: '/category/rings',
        sections: [
          {
            id: 'Shop By Style',
            name: 'Shop By Style',
            items: [
              { name: 'Engagement', href: '/products/shop/Rings/Engagement' },
              { name: 'Classic', href: '/products/shop/Rings/Classic' },
              { name: 'Solitaire', href: '/products/shop/Rings/Solitaire' },
              { name: 'Casual', href: '/products/shop/Rings/Casual' },
              { name: 'Navratna', href: '/products/shop/Rings/Navratna' },
              { name: 'Mangalsutra ring', href: '/products/shop/Rings/Mangalsutra-ring' },
              { name: 'Couple Bands', href: '/products/shop/Rings/Couple-Bands' },
              { name: 'Eternity', href: '/products/shop/Rings/Eternity' },
              { name: 'Browse All', href: '/category/Rings' },
            ],
          },
        ],
      },
      {
        id: 'Earrings',
        name: 'Earrings',
        href: '/category/earrings',
        sections: [
          {
            id: 'Shop By Style',
            name: 'Shop By Style',
            items: [
              { name: 'Studs', href: '/products/shop/Earrings/Studs' },
              { name: 'Dangles', href: '/products/shop/Earrings/Dangles' },
              { name: 'Sui Dhaga', href: '/products/shop/Earrings/Sui-Dhaga' },
              { name: 'Navratna', href: '/products/shop/Earrings/Navratna' },
              { name: 'Jhumka', href: '/products/shop/Earrings/Jhumka' },
              { name: 'Hoops', href: '/products/shop/Earrings/Hoops' },
              { name: 'Solitaire', href: '/products/shop/Earrings/Solitaire' },
              { name: 'Browse All', href: '/category/Earrings' },
            ],
          },
        ],
      },
      {
        id: 'Necklace',
        name: 'Necklace',
        href: '/category/necklace',
        sections: [
          {
            id: 'Shop By Style',
            name: 'Shop By Style',
            items: [
              { name: 'Collar', href: '/products/shop/Necklace/Collar' },
              { name: 'Layered', href: '/products/shop/Necklace/Layered' },
              {
                name: 'Pendant necklace',
                href: '/products/shop/Necklace/Pendant-necklace',
              },
              { name: 'Charm', href: '/products/shop/Necklace/Charm' },
              { name: 'Delicate', href: '/products/shop/Necklace/Delicate' },
              { name: 'Lariat', href: '/products/shop/Necklace/Lariat' },
              { name: 'Brouse All', href: '/category/Necklace' },
            ],
          },
        ],
      },
      {
        id: 'Bangles & Bracelets',
        name: 'Bangles & Bracelets',
        href: '/category/bangles-bracelets',
        sections: [
          {
            id: 'Shop By Style',
            name: 'Shop By Style',
            items: [
              { name: 'Kada', href: '/products/shop/Bangles-&-Bracelets/Kada' },
              {
                name: 'Delicate Bangles',
                href: '/products/shop/Bangles-&-Bracelets/Delicate-Bangles',
              },
              {
                name: 'Oval Bracelets',
                href: '/products/shop/Bangles-&-Bracelets/Oval-Bracelets',
              },
              {
                name: 'Tennis Bracelets',
                href: '/products/shop/Bangles-&-Bracelets/Tennis-Bracelets',
              },
              {
                name: 'Chain Bracelets',
                href: '/products/shop/Bangles-&-Bracelets/Chain-Bracelets',
              },
              {
                name: 'Flexi Bracelets',
                href: '/products/shop/Bangles-&-Bracelets/Flexi-Bracelets',
              },
              {
                name: 'Eternity Braceltes',
                href: '/products/shop/Bangles-&-Bracelets/Eternity-Braceltes',
              },
              { name: 'Browse All', href: '/category/Bangles-&-Bracelets' },
            ],
          },
        ],
      },
      {
        id: 'Mangalsutras & Pendants',
        name: 'Mangalsutras & Pendants',
        href: '/category/mangalsutras-pendants',
        sections: [
          {
            id: 'Shop By Style',
            name: 'Shop By Style',
            items: [
              {
                name: 'Mangalsutra Ring',
                href: '/products/shop/Mangalsutras-&-Pendants/Mangalsutra-Ring',
              },
              {
                name: 'Mangalsutra With Chain',
                href: '/products/shop/Mangalsutras-&-Pendants/Mangalsutra-With-Chain',
              },
              {
                name: 'Mangalsutra Bracelets',
                href: '/products/shop/Mangalsutras-&-Pendants/Mangalsutra-Bracelets',
              },
              {
                name: 'Mangalsutra Chain',
                href: '/products/shop/Mangalsutras-&-Pendants/Mangalsutra-Chain',
              },
              {
                name: 'Solitaire Mangalsutra',
                href: '/products/shop/Mangalsutras-&-Pendants/Solitaire-Mangalsutra',
              },
              {
                name: 'Initial Pendants',
                href: '/products/shop/Mangalsutras-&-Pendants/Initial-Pendants',
              },
              {
                name: 'Solitaire Pendants',
                href: '/products/shop/Mangalsutras-&-Pendants/Solitaire-Pendants',
              },
              {
                name: 'Pendants With Chain',
                href: '/products/shop/Mangalsutras-&-Pendants/Pendants-With-Chain',
              },
              {
                name: 'Casual Pendants',
                href: '/products/shop/Mangalsutras-&-Pendants/Casual-Pendants',
              },
              { name: 'Browse All', href: '/category/Mangalsutras-&-Pendants' },
            ],
          },
        ],
      },
      {
        id: 'Other Jewellery',
        name: 'Other Jewellery',
        href: '/category/other-jewellery',
        sections: [
          {
            id: 'Featured Collection',
            name: 'Featured Collection',
            items: [
              { name: 'Peakock', href: '/products/shop/Other-Jewellery/Peakock' },
              { name: 'Chafa', href: '/products/shop/Other-Jewellery/Chafa' },
              { name: 'Butterfly', href: '/products/shop/Other-Jewellery/Butterfly' },
              { name: 'Evil Eye', href: '/products/shop/Other-Jewellery/Evil-Eye' },
              { name: 'Miracle Plate', href: '/products/shop/Other-Jewellery/Miracle-Plate' },
              { name: 'Kyra', href: '/products/shop/Other-Jewellery/Kyra' },
              { name: 'Brouse All', href: '/category/Other-Jewellery' },

            ],
          },
        ],
      },
      // Metal Rate remains unchanged
      {
        id: 'Metal Rate',
        name: 'Metal Rate',
        featured: [
          {
            name: 'New Arrivals',
            href: '#',
            imageSrc:
              'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
            imageAlt:
              'Drawstring top with elastic loop closure and textured interior padding.',
          },
          {
            name: 'Artwork Tees',
            href: '#',
            imageSrc:
              'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
            imageAlt:
              'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
          },
        ],
        sections: [
          {
            id: 'Gold',
            name: 'Gold Price',
            items: gold
              ? [
                { name: `24k Price/Gram: ₹${gold.price_gram_24k}`, href: '#' },
                { name: `22k Price/Gram: ₹${gold.price_gram_22k}`, href: '#' },
                { name: `21k Price/Gram: ₹${gold.price_gram_21k}`, href: '#' },
                { name: `20k Price/Gram: ₹${gold.price_gram_20k}`, href: '#' },
                { name: `18k Price/Gram: ₹${gold.price_gram_18k}`, href: '#' },
                { name: `16k Price/Gram: ₹${gold.price_gram_16k}`, href: '#' },
                { name: `14k Price/Gram: ₹${gold.price_gram_14k}`, href: '#' },
                { name: `10k Price/Gram: ₹${gold.price_gram_10k}`, href: '#' },
              ]
              : [{ name: 'Data not available', href: '#' }],
          },
          {
            id: 'Silver',
            name: 'Silver Price',
            items: silver
              ? [
                { name: `24k Price/Gram: ₹${silver.price_gram_24k}`, href: '#' },
                { name: `22k Price/Gram: ₹${silver.price_gram_22k}`, href: '#' },
                { name: `21k Price/Gram: ₹${silver.price_gram_21k}`, href: '#' },
                { name: `20k Price/Gram: ₹${silver.price_gram_20k}`, href: '#' },
                { name: `18k Price/Gram: ₹${silver.price_gram_18k}`, href: '#' },
                { name: `16k Price/Gram: ₹${silver.price_gram_16k}`, href: '#' },
                { name: `14k Price/Gram: ₹${silver.price_gram_14k}`, href: '#' },
                { name: `10k Price/Gram: ₹${silver.price_gram_10k}`, href: '#' },
              ]
              : [{ name: 'Data not available', href: '#' }],
          },
          {
            id: 'Platinum',
            name: 'Platinum Price',
            items: platinum
              ? [
                { name: `24k Price/Gram: ₹${platinum.price_gram_24k}`, href: '#' },
                { name: `22k Price/Gram: ₹${platinum.price_gram_22k}`, href: '#' },
                { name: `21k Price/Gram: ₹${platinum.price_gram_21k}`, href: '#' },
                { name: `20k Price/Gram: ₹${platinum.price_gram_20k}`, href: '#' },
                { name: `18k Price/Gram: ₹${platinum.price_gram_18k}`, href: '#' },
                { name: `16k Price/Gram: ₹${platinum.price_gram_16k}`, href: '#' },
                { name: `14k Price/Gram: ₹${platinum.price_gram_14k}`, href: '#' },
                { name: `10k Price/Gram: ₹${platinum.price_gram_10k}`, href: '#' },
              ]
              : [{ name: 'Data not available', href: '#' }],
          },
        ],
      },
    ],
    pages: [{ name: 'Stores', href: '#' }],
  };


  const [open, setOpen] = useState(false)
  const { user, logout } = userStore();
  const isAdmin = user?.role === "admin";
  const { cart } = cartStore();
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      // Redirect to the search page with the search term as a query parameter
      navigate(`/products/search/${searchTerm}`);
    }
    setMobileSearchOpen(false);
  }
  return (
    <>
      {/* ------------------ Top Navbar ------------------ */}
      <div className="">
        <div className="w-full bg-gray-950 text-gray-300 border-b border-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
            {/* Logo and Brand Info */}
            <Link to="/" className="flex items-center space-x-3">
              {/* The logo letter */}
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent font-playfair">
                AJ
              </span>
              {/* Brand Text */}
              <div className="leading-tight">
                <p className="text-xl font-semibold">Anupam Jewellers</p>
                <p className="text-xs text-gray-400">Gold & Diamond</p>
              </div>
            </Link>

            {/* Full Search Bar for md and up */}
            <div className="flex-1 mx-8 hidden md:block">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products, brands and more..."
                    className="w-full py-3 pl-12 pr-4 rounded-full bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 shadow-inner"
                  />
                </div>
              </form>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              {/* On mobile, show a search icon that opens an overlay */}
              <div className="md:hidden">
                <button onClick={() => setMobileSearchOpen(true)} aria-label="Search">
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-300 hover:text-amber-400 transition-colors" />
                </button>
              </div>
              {/* The Stores and Wishlist buttons remain visible on all screens */}
              <Link
                to="/stores"
                className="flex items-center space-x-1 text-gray-300 hover:text-amber-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 17h18"
                  />
                </svg>
                <span className="text-sm font-medium">Stores</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center space-x-1 text-gray-300 hover:text-rose-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-rose-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
                <span className="text-sm font-medium">Wishlist</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ------------------ Mobile Search Overlay ------------------ */}
        <Transition.Root show={mobileSearchOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50 md:hidden" onClose={setMobileSearchOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="transition-transform ease-out duration-300"
                enterFrom="translate-y-4 scale-95 opacity-0"
                enterTo="translate-y-0 scale-100 opacity-100"
                leave="transition-transform ease-in duration-200"
                leaveFrom="translate-y-0 scale-100 opacity-100"
                leaveTo="translate-y-4 scale-95 opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products, brands and more..."
                        className="w-full py-3 pl-12 pr-4 rounded-full bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300"
                      />
                    </div>
                  </form>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setMobileSearchOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-amber-400 hover:text-amber-600 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
      {/* ------------------ Main Navbar ------------------ */}
      {/* Offset the main navbar to account for the top navbar height (h-20) */}
      <div className="sticky w-full top-0 z-40">
        <div className="bg-gradient-to-b from-gray-900/95 to-gray-900 backdrop-blur-xl border-b border-gray-800 shadow-2xl">
          {/* Mobile Menu */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/80" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl">
                    <div className="flex px-6 pb-2 pt-5 justify-between items-center border-b border-gray-800">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent font-playfair">
                          AJ
                        </span>
                      </div>
                      <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto">
                      <nav className="grid gap-8">
                        {navigation.categories.map((category) => (
                          <div key={category.name} className="border-b border-gray-800 pb-6">
                            <h3 className="text-lg font-medium text-amber-100 font-playfair">
                              {category.name}
                            </h3>
                            <ul className="mt-4 space-y-4">
                              {category.sections.map((section) => (
                                <li key={section.name} className="space-y-3">
                                  <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
                                    {section.name}
                                  </h4>
                                  <ul className="mt-2 space-y-2.5">
                                    {section.items.map((item) => (
                                      <li key={item.name}>
                                        <a
                                          href={item.href}
                                          className="text-gray-300 hover:text-amber-400 transition-colors"
                                        >
                                          {item.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </nav>
                    </div>

                    <div className="border-t border-gray-800 px-6 py-6 bg-gray-900/50">
                      {user ? (
                        <div className="space-y-4">
                          {isAdmin && (
                            <Link
                              to="/dashboard"
                              className="block w-full text-center rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity shadow-lg"
                            >
                              Dashboard
                            </Link>
                          )}
                          <button
                            onClick={logout}
                            className="block w-full text-center rounded-xl border border-amber-600/50 px-6 py-3 text-sm font-medium text-amber-500 hover:bg-amber-600/10 transition-colors"
                          >
                            Logout
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Link
                            to="/login"
                            className="block w-full text-center rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity shadow-lg"
                          >
                            Sign in
                          </Link>
                          <Link
                            to="/signup"
                            className="block w-full text-center rounded-xl border border-amber-600/50 px-6 py-3 text-sm font-medium text-amber-400 hover:bg-amber-600/10 transition-colors"
                          >
                            Create account
                          </Link>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Desktop Navbar */}
          <header className="relative">
            <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-20 items-center">
                <button
                  type="button"
                  className="rounded-xl p-2.5 hover:bg-gray-800/50 transition-colors lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6 text-amber-400" aria-hidden="true" />
                </button>

                {/* Logo (Visible only on desktop in the main navbar) */}
                {/* <div className="ml-4 flex lg:ml-0">
                  <Link to="/" className="flex items-center space-x-2 group">
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent font-playfair transition-transform group-hover:scale-105">
                      AJ
                    </span>
                  </Link>
                </div> */}

                {/* Desktop Menu */}
                <Popover.Group className="hidden lg:ml-12 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-10">
                    {navigation.categories.map((category) => (
                      <Popover
                        key={category.name}
                        className="flex relative"
                        onMouseEnter={() => setHoveredCategory(category.name)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={`relative z-10 flex items-center border-b-2 pt-px text-sm font-medium transition-all duration-300 ${(open || hoveredCategory === category.name)
                                  ? 'border-amber-400 text-amber-300'
                                  : 'border-transparent text-gray-300 hover:text-amber-400'
                                  }`}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              show={open || hoveredCategory === category.name}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 -translate-y-2"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 -translate-y-2"
                            >
                              <Popover.Panel
                                className={`absolute top-full left-0 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border-t border-gray-800 pt-2 z-50 ${category.sections.length > 1 ? 'w-[500px]' : 'w-auto min-w-[200px]'
                                  }`}
                                static
                              >
                                <div className="px-6 py-6">
                                  <div
                                    className={`grid ${category.sections.length > 1 ? 'grid-cols-2 lg:grid-cols-3 gap-8' : ''
                                      }`}
                                  >
                                    {category.sections.map((section) => (
                                      <div key={section.name} className="min-w-[150px]">
                                        <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3">
                                          {section.name}
                                        </h3>
                                        <ul className="space-y-2.5">
                                          {section.items.map((item) => (
                                            <li key={item.name}>
                                              <a
                                                href={item.href}
                                                className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                                              >
                                                {item.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </Popover.Panel>


                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}
                  </div>
                </Popover.Group>


                {/* Right Section */}
                <div className="ml-auto flex items-center space-x-8">
                  <div className="hidden lg:flex items-center space-x-6">
                    {user ? (
                      <>
                        {isAdmin && (
                          <Link
                            to="/dashboard"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600/30 to-rose-600/30 text-amber-400 hover:opacity-80 transition-opacity border border-amber-600/20 shadow-lg"
                          >
                            Dashboard
                          </Link>
                        )}
                        <button
                          onClick={logout}
                          className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-rose-600 text-white hover:opacity-90 transition-opacity shadow-lg"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-2 rounded-lg border border-amber-600/50 text-amber-400 hover:bg-amber-600/10 transition-colors"
                        >
                          Create account
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Link to="/cart" className="group relative p-2 flex items-center">
                      <div className="relative">
                        <ShoppingBagIcon
                          className="h-7 w-7 text-amber-400 group-hover:text-rose-400 transition-colors"
                          aria-hidden="true"
                        />
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
                          {cart.length}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
      </div>
    </>
  )
}

export default Navbar