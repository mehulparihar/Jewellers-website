import React, { useEffect, useState } from 'react';
import { productStore } from '../stores/productStore';

const AdminPage = () => {
    const { createProduct, fetchAllProducts, deleteProduct, toggleFeaturedProduct, products } = productStore();
    const [view, setView] = useState('create'); // 'create' or 'list'
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts])
    // console.log("product", products);

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
        console.log(productData);
        // setProducts([...products, productData]);
        await createProduct(productData);
        alert('Product added successfully!');
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
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => handleToggle('create')}
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${view === 'create' ? 'bg-blue-600' : 'bg-gray-400'
                        }`}
                >
                    Create Product
                </button>
                <button
                    onClick={() => handleToggle('list')}
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${view === 'list' ? 'bg-blue-600' : 'bg-gray-400'
                        }`}
                >
                    List All Products
                </button>
            </div>

            {view === 'list' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">All Products</h2>
                    {products.length > 0 ? (
                        <table className="table-auto w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Price</th>
                                    <th className="px-4 py-2 border">Category</th>
                                    <th className="px-4 py-2 border">Subcategory</th>
                                    <th className="px-4 py-2 border">Featured</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="px-4 py-2 border">{product.name}</td>
                                        <td className="px-4 py-2 border">₹{product.price}</td>
                                        <td className="px-4 py-2 border">{product.category}</td>
                                        <td className="px-4 py-2 border">{product.subCategory}</td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                onClick={() => toggleFeaturedProduct(product._id)}
                                                className={`px-2 py-1 rounded ${product.isFeatured ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
                                                    }`}
                                            >
                                                {product.isFeatured ? 'Yes' : 'No'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                onClick={() => deleteProduct(product._id)}
                                                className="px-2 py-1 bg-red-500 text-white rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            )}

            {view === 'create' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Create Product</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={productData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter product name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter product description"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter product price"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Upload Image</label>
                            <input
                                type="file"
                                name="image"
                                // value={productData.image}
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter image URL"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={productData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter product category"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Sub Category</label>
                            <input
                                type="text"
                                name="subCategory"
                                value={productData.subCategory}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter product sub category"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Is Featured</label>
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={productData.isFeatured}
                                onChange={(e) =>
                                    setProductData({ ...productData, isFeatured: e.target.checked })
                                }
                                className="w-5 h-5"
                            />
                        </div>
                        {/* Basic Details */}
                        <h3 className="text-xl font-bold mt-4">Basic Details</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Item Code</label>
                            <input
                                type="text"
                                name="Basic_Details.Item_Code"
                                value={productData.Basic_Details.Item_Code}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter item code"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Design Number</label>
                            <input
                                type="text"
                                name="Basic_Details.Design_Number"
                                value={productData.Basic_Details.Design_Number}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter design number"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Item type</label>
                            <input
                                type="text"
                                name="Basic_Details.Item_Type"
                                value={productData.Basic_Details.Item_Type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter design number"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Gross Weight</label>
                            <input
                                type="text"
                                name="Basic_Details.Gross_Weight"
                                value={productData.Basic_Details.Gross_Weight}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter design number"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Net Weight</label>
                            <input
                                type="text"
                                name="Basic_Details.Net_Weight"
                                value={productData.Basic_Details.Net_Weight}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter design number"
                            />
                        </div>
                        {/* Metal Details */}
                        <h3 className="text-xl font-bold mt-4">Metal Details</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Metal Type</label>
                            <input
                                type="text"
                                name="Metal_Detail.Metal_Type"
                                value={productData.Metal_Detail.Metal_Type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter metal type"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Metal Colour</label>
                            <input
                                type="text"
                                name="Metal_Detail.Metal_Colour"
                                value={productData.Metal_Detail.Metal_Colour}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter metal type"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Metal Purity</label>
                            <input
                                type="text"
                                name="Metal_Detail.Metal_Purity"
                                value={productData.Metal_Detail.Metal_Purity}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter metal type"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Stone Weight</label>
                            <input
                                type="text"
                                name="Metal_Detail.Stone_Weight"
                                value={productData.Metal_Detail.Stone_Weight}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter metal type"
                            />
                        </div>
                        <h3 className="text-xl font-bold mt-4">Price Breakup</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Metal</label>
                            <input
                                type="text"
                                name="Price_Breakup.Metal"
                                value={productData.Price_Breakup.Metal}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter Metal"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Making Charges</label>
                            <input
                                type="text"
                                name="Price_Breakup.Making_Charges"
                                value={productData.Price_Breakup.Making_Charges}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter metal type"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Gst</label>
                            <input
                                type="text"
                                name="Price_Breakup.Gst"
                                value={productData.Price_Breakup.Gst}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter metal type"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Discount</label>
                            <input
                                type="text"
                                name="Price_Breakup.Discount"
                                value={productData.Price_Breakup.Discount}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter metal type"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Other Charges</label>
                            <input
                                type="text"
                                name="Price_Breakup.Other_Charges"
                                value={productData.Price_Breakup.Other_Charges}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter metal type"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminPage