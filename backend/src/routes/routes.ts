import { Router } from "express";
import {
  returnFundData,
  returnRandomChartData,
  storeRandomChartData,
} from "./chartPerformanceLogic";

const router = Router();

router.get("/fundData", returnFundData);

router.get("/randomChartData", returnRandomChartData);

router.post("/storeRandomChartData", storeRandomChartData);

export default router;
