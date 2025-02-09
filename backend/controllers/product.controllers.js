import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // find all products
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        // if not in redis, fetch from db
        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts) {
            return res.status(404).json({ message: "No featured products found" });
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts));

        res.json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const singleProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            return res.json(product);
        } else {
            return res.status(404).json({ message: "Product not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, subCategory, Basic_Details, Metal_Detail, Price_Breakup } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category,
            subCategory,
            Basic_Details,
            Metal_Detail,
            Price_Breakup
        })
    } catch (error) {
        console.log("error in create product");
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
            } catch (error) {
                console.log("error deleting image from cludinary");
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getSearch = async (req, res) => {
    const { search } = req.params;
    if (!search) {
        return res.status(400).json({ error: 'Missing search query parameter' });
    }
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { subCategory: { $regex: search, $options: 'i' } }
            ]
        });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

export const getProductByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

export const getSubcategory = async (req, res) => {
    const { category, subCategory } = req.params;
    try {
        const products = await Product.find({ category, subCategory });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductCache();
            res.json(updatedProduct);
        }
        else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}


async function updateFeaturedProductCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("error in update cache function");
    }
}
