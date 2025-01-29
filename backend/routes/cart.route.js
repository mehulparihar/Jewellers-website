import express from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuatity } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.midleware.js";
const router = express.Router();

router.get("/", protectRoute , getCartProducts);
router.post("/", protectRoute , addToCart);
router.delete("/", protectRoute , removeAllFromCart);
router.put("/:id", protectRoute , updateQuatity);



export default router;