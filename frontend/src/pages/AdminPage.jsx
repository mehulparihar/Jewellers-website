import React, { useEffect, useState } from 'react';
import { productStore } from '../stores/productStore';
import { FiPlus, FiList, FiTrash2, FiStar, FiChevronDown, FiUploadCloud } from 'react-icons/fi';

const AdminPage = () => {
    const { createProduct, fetchAllProducts, deleteProduct, toggleFeaturedProduct, products } = productStore();
    const [view, setView] = useState('create');
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);

    const categories = {
        "Rings": ["Engagement", "Classic", "Solitaire", "Casual", "Navratna", "Mangalsutra-ring", "Couple-Bands", "Eternity"],
        "Earrings": ["Studs", "Dangles", "Sui-Dhaga", "Navratna", "Jhumka", "Hoops", "Solitaire"],
        "Necklace": ["Collar", "Layered", "Pendant-necklace", "Charm", "Delicate", "Lariat"],
        "Bangles-&-Bracelets": ["Kada", "Delicate-Bangles", "Oval-Bracelets", "Tennis-Bracelets", "Chain-Bracelets", "Flexi-Bracelets", "Eternity-Bracelets"],
        "Mangalsutras-&-Pendants": ["Mangalsutra-Ring", "Mangalsutra-With-Chain", "Mangalsutra-Bracelets", "Mangalsutra-Chain", "Solitaire-Mangalsutra", "Initial-Pendants", "Solitaire-Pendants", "Pendants-With-Chain", "Casual-Pendants"],
        "Other-Jewellery": ["Peakock", "Chafa", "Butterfly", "Evil-Eye", "Miracle-Plate", "Kyra"]
    };


    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts])

    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        metal: false,
        price: false
    });
    const [searchQuery, setSearchQuery] = useState('');
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        subCategory: '',
        isFeatured: false,
        Basic_Details: {
            Item_Code: '',
            Design_Number: '',
            Item_Type: '',
            Gross_Weight: '',
            Net_Weight: ''
        },
        Metal_Detail: {
            Metal_Type: '',
            Metal_Colour: '',
            Metal_Purity: '',
            Stone_Weight: ''
        },
        Price_Breakup: {
            Metal: '',
            Making_Charges: '',
            Gst: '',
            Discount: '',
            Other_Charges: ''
        }
    });

    const handleToggle = (viewType) => {
        setView(viewType);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProductData({ ...productData, image: reader.result });
            }
            reader.readAsDataURL(file);
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            setSelectedCategory(value);
            setSubcategories(categories[value] || []);
        }
        setProductData((prevData) => {
            const keys = name.split('.');
            if (keys.length > 1) {
                return {
                    ...prevData,
                    [keys[0]]: {
                        ...prevData[keys[0]],
                        [keys[1]]: value
                    }
                };
            }
            return { ...prevData, [name]: value };
        });
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(productData);
            toast.success('Product added successfully!', {
                position: 'bottom-center',
                style: {
                    background: '#1f2937',
                    color: '#fff'
                }
            });
            setProductData({
                name: '',
                description: '',
                price: '',
                image: '',
                category: '',
                subCategory: '',
                isFeatured: false,
                Basic_Details: {
                    Item_Code: '',
                    Design_Number: '',
                    Item_Type: '',
                    Gross_Weight: '',
                    Net_Weight: ''
                },
                Metal_Detail: {
                    Metal_Type: '',
                    Metal_Colour: '',
                    Metal_Purity: '',
                    Stone_Weight: ''
                },
                Price_Breakup: {
                    Metal: '',
                    Making_Charges: '',
                    Gst: '',
                    Discount: '',
                    Other_Charges: ''
                }
            });

        } catch (error) {
            toast.error('Failed to create product', {
                position: 'bottom-center',
                style: {
                    background: '#1f2937',
                    color: '#fff'
                }
            });
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Jewelry Inventory Manager
                </h1>

                {/* View Toggle */}
                <div className="flex justify-center gap-4 mb-8 bg-white p-2 rounded-full shadow-sm">
                    <button
                        onClick={() => handleToggle('create')}
                        className={`px-6 py-3 flex items-center gap-2 font-medium rounded-full transition-colors ${
                            view === 'create' 
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        <FiPlus className="text-lg" />
                        Add Product
                    </button>
                    <button
                        onClick={() => handleToggle('list')}
                        className={`px-6 py-3 flex items-center gap-2 font-medium rounded-full transition-colors ${
                            view === 'list' 
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        <FiList className="text-lg" />
                        View Inventory
                    </button>
                </div>

                {view === 'list' && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800">Product Inventory</h2>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {['Product Name', 'Price', 'Category', 'Subcategory', 'Featured', 'Actions'].map((header) => (
                                            <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                                            <td className="px-6 py-4">₹{product.price}</td>
                                            <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                            <td className="px-6 py-4 text-gray-600">{product.subCategory}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleFeaturedProduct(product._id)}
                                                    className={`px-3 py-1 rounded-full flex items-center gap-2 text-sm ${
                                                        product.isFeatured
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}
                                                >
                                                    <FiStar className="text-sm" />
                                                    {product.isFeatured ? 'Featured' : 'Standard'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => deleteProduct(product._id)}
                                                    className="p-2 hover:bg-red-100 rounded-lg text-red-600 hover:text-red-700 transition-colors"
                                                >
                                                    <FiTrash2 className="text-lg" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {view === 'create' && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800">New Product Creation</h2>
                        </div>
                        
                        <form onSubmit={handleFormSubmit} className="p-6 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={productData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={productData.description}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Pricing & Categories */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="price"
                                                value={productData.price}
                                                onChange={handleInputChange}
                                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                            <div className="relative">
                                                <select
                                                    name="category"
                                                    value={productData.category}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="">Select Category</option>
                                                    {Object.keys(categories).map((category) => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                                            <div className="relative">
                                                <select
                                                    name="subCategory"
                                                    disabled={!selectedCategory}
                                                    value={productData.subCategory}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                                                >
                                                    <option value="">Select Subcategory</option>
                                                    {subcategories.map((subcat) => (
                                                        <option key={subcat} value={subcat}>{subcat}</option>
                                                    ))}
                                                </select>
                                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="fileUpload"
                                    />
                                    <label
                                        htmlFor="fileUpload"
                                        className="cursor-pointer flex flex-col items-center gap-3"
                                    >
                                        <FiUploadCloud className="text-3xl text-gray-400" />
                                        <div>
                                            <span className="text-blue-600 font-medium">Click to upload</span>
                                            <span className="text-gray-500 ml-2">or drag and drop</span>
                                        </div>
                                        {productData.image && (
                                            <img 
                                                src={productData.image} 
                                                alt="Preview" 
                                                className="mt-4 h-32 w-32 object-contain rounded-lg border"
                                            />
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Sections */}
                            {['Basic_Details', 'Metal_Detail', 'Price_Breakup'].map((section) => (
                                <div key={section} className="border border-gray-200 rounded-lg">
                                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                                        <h3 className="font-medium text-gray-800">
                                            {section.replace('_', ' ')}
                                        </h3>
                                    </div>
                                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.keys(productData[section]).map((field) => (
                                            <div key={field}>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {field.replace('_', ' ')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`${section}.${field}`}
                                                    value={productData[section][field]}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Featured Toggle */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={productData.isFeatured}
                                    onChange={(e) => setProductData({ ...productData, isFeatured: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Mark as Featured Product
                                </label>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    Create Product
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPage