import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";


export const productStore = create((set) => ({
    products : [],
    setProducts : (products) => set({products}),

    createProduct : async (productData) => {
        try {
            const res = await axios.post("/products", productData);
            set((prevState) => ({
                products : [...prevState.products, res.data],
            }));
        } catch (error) {
            toast.error(error.response.data.error);
        }
    },
    fetchAllProducts : async () => {
        try {
            const response = await axios.get("/products");
            set({products : response.data.products});
        } catch (error) {
            toast.error(error.response.data.error || "Failed to fetch Products");
        }
    },
    fetchProductByCategory : async (category) => {
        try {
            const response = await axios.get(`/products/category/${category}`);
            set({products : response.data.products});
        } catch (error) {
            toast.error(error.response.data.error || "failded to fetch products");
        }
    },
    deleteProduct : async (productId) => {
        try {
            const response = await axios.delete(`/products/${productId}`);
            set((prevProducts) => ({
                products : prevProducts.products.filter((product) => product._id !== productId),
            }));
        } catch (error) {
            toast.error(error.response.data.error || "Failed to update product");
        }
    },
    toggleFeaturedProduct : async (productId) => {
        try {
            const response = await axios.patch(`/products/${productId}`);
            set((prevProducts) => ({
                products : prevProducts.products.map((product) => 
                 product._id === productId ?  {...product, isFeatured : response.data.isFeatured} : product)
            }));
        } catch (error) {
            toast.error(error.response.data.error || "Failed to update product");
        }
    },
    fetchFeaturedProducts : async () => {
        try {
            const response = await axios.get("/products/featured");
            set({products : response.data});
        } catch (error) {
            set({error : "Failed to fetch products"})
            console.log(error.message);
        }
    }
}))