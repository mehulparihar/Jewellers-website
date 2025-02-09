import MetalPrice from "../models/goldRate.model.js";

export const getAllMetalPrices = async (req, res) => {
    try {
        const metalPrices = await MetalPrice.find();
        if (metalPrices.length > 0) {
           res.json(metalPrices);
        } else {
           res.status(503).json({ message: "Price data not available. Please try later." });
        }
      } catch (error) {
        console.error("Error fetching data from database:", error);
        res.status(500).json({ message: "Internal server error." });
      }
};