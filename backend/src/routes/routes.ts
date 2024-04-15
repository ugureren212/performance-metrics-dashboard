import { Router } from "express";
import { returnFundData, storeRandomChartData } from "./chartPerformanceLogic";

const router = Router();

router.get("/fundData", returnFundData);

router.post("/storeRandomChartData", storeRandomChartData);

export default router;
