import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const rateStore = create((set, get) => ({
    gold: null,
    silver: null,
    platinum: null,
    fetchRates : async () => {
        try {
            const response = await axios.get("/metal-prices");
            if (!response) {
                return;
            }
            const data = response.data;
            const goldData = data.find((item) => item.metal === "XAU");
            const silverData = data.find((item) => item.metal === "XAG");
            const platinumData = data.find((item) => item.metal === "XPT");

            set({
                gold: goldData ? {
                    price: goldData.price,
                    price_gram_24k: goldData.price_gram_24k,
                    price_gram_22k: goldData.price_gram_22k,
                    price_gram_21k: goldData.price_gram_21k,
                    price_gram_20k: goldData.price_gram_20k,
                    price_gram_18k: goldData.price_gram_18k,
                    price_gram_16k: goldData.price_gram_16k,
                    price_gram_14k: goldData.price_gram_14k,
                    price_gram_10k: goldData.price_gram_10k,
                } : null,
                silver: silverData ? {
                    price: silverData.price,
                    price_gram_24k: silverData.price_gram_24k,
                    price_gram_22k: silverData.price_gram_22k,
                    price_gram_21k: silverData.price_gram_21k,
                    price_gram_20k: silverData.price_gram_20k,
                    price_gram_18k: silverData.price_gram_18k,
                    price_gram_16k: silverData.price_gram_16k,
                    price_gram_14k: silverData.price_gram_14k,
                    price_gram_10k: silverData.price_gram_10k,
                } : null,
                platinum: platinumData ? {
                    price: platinumData.price,
                    price_gram_24k: platinumData.price_gram_24k,
                    price_gram_22k: platinumData.price_gram_22k,
                    price_gram_21k: platinumData.price_gram_21k,
                    price_gram_20k: platinumData.price_gram_20k,
                    price_gram_18k: platinumData.price_gram_18k,
                    price_gram_16k: platinumData.price_gram_16k,
                    price_gram_14k: platinumData.price_gram_14k,
                    price_gram_10k: platinumData.price_gram_10k,
                } : null,
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "an error occured during rates");
        }
    }
}))