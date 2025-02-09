import express from "express";
import { getAllMetalPrices } from "../controllers/goldRate.controller.js";
const router = express.Router();
router.get("/", getAllMetalPrices);

export default router;