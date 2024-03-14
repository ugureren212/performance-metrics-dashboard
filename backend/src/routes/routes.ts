import { Router } from "express";
import returnFundData from "./chartPerformanceLogic";

const router = Router();

router.get("/fundData", returnFundData);

export default router;
