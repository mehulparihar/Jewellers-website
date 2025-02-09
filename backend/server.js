import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import analyticsRoutes from "./routes/analytics.route.js"
import { fetchMetalPrice } from "./utils/fetchMetalPrices.util.js"
import goldRoutes from "./routes/goldRate.route.js"
import cron from "node-cron"


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/metal-prices", goldRoutes);

cron.schedule("0 */12 * * *", () => {
    console.log("Fetching metal prices...");
    fetchMetalPrice();
});


app.listen(PORT, () => {
    console.log("server is running");
    connectDB();
})
