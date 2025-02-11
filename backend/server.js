import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";
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

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/metal-prices", goldRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

cron.schedule("0 */12 * * *", () => {
    console.log("Fetching metal prices...");
    fetchMetalPrice();
});


app.listen(PORT, () => {
    console.log("server is running");
    connectDB();
})
