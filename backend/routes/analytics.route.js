import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.midleware.js";
import { getAnalyticsData } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAnalyticsData);

export default router;