import mongoose from "mongoose";

const metalPriceSchema = new mongoose.Schema({
    metal: String,
    price: Number,
    price_gram_24k: Number,
    price_gram_22k: Number,
    price_gram_21k: Number,
    price_gram_20k: Number,
    price_gram_18k: Number,
    price_gram_16k: Number,
    price_gram_14k: Number,
    price_gram_10k: Number,
    lastUpdated: String,
});

const MetalPrice = mongoose.model("MetalPrice", metalPriceSchema);

export default MetalPrice;

