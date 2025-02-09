import fetch from "node-fetch";
import GoldRate from "../models/goldRate.model.js";
import dotenv from "dotenv";


export const fetchMetalPrice = async () => {
    const metals = ["XAU", "XAG", "XPT"];
    const apiKey = process.env.GOLD_RATE_PRICE;

    for (const metal of metals) {
        const apiUrl = `https://www.goldapi.io/api/${metal}/INR`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'x-access-token': apiKey,
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                const data = await response.json();
                const newMetalPrice = new GoldRate({
                    metal: data.metal,
                    price: data.price,
                    price_gram_24k: data.price_gram_24k,
                    price_gram_22k: data.price_gram_22k,
                    price_gram_21k: data.price_gram_21k,
                    price_gram_20k: data.price_gram_20k,
                    price_gram_18k: data.price_gram_18k,
                    price_gram_16k: data.price_gram_16k,
                    price_gram_14k: data.price_gram_14k,
                    price_gram_10k: data.price_gram_10k,
                    lastUpdated: new Date().toISOString(),
                });

                // Save to MongoDB
                await GoldRate.deleteMany({ metal: data.metal });
                await newMetalPrice.save();

                // console.log(`${data.metal} price updated in database:`, data.price);
            } else {
                console.error(`Failed to fetch ${metal} price:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error fetching ${metal} price:`, error);
        }
    }
};
