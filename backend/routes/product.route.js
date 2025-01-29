import express from "express";
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getProductByCategory,toggleFeaturedProduct } from "../controllers/product.controllers.js";
import { protectRoute, adminRoute} from "../middleware/auth.midleware.js";
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductByCategory);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
