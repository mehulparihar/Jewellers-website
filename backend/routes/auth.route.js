import express from "express";
import { login, logout, signup, refreshToken, getProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.midleware.js";
const router = express.Router();

router.post("/signup", signup)

router.post("/logout", logout)

router.post("/login", login)

router.post("/refresh-token", refreshToken);

router.get("/profile", protectRoute, getProfile);

// router.get("/profile", getProfile);
export default router;