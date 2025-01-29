import Product from "../models/product.model.js";
import User from "../models/user.model.js";

async function getData()
{
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalSales = null;
    const totalRevenue = null;
    return {
        users : totalUsers,
        products : totalProducts,
        totalSales,
        totalRevenue
    }
}

export const getAnalyticsData = async (req, res) => {
    try {
        const analyticsData = await getData();
        res.json({
            analyticsData,
        })
    } catch (error) {
        res.status(500).json({message : "Server error", error : error.message});
    }
}