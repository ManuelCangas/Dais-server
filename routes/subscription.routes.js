import express from "express";
import {
  createSubscription,
  getSubscriptions,
} from "../controllers/subscription.js";
import { authenticateToken } from "../middleware/AuthPlayer.js";

const router = express.Router();

router.get("/", authenticateToken, getSubscriptions);

router.post("/subs", authenticateToken, createSubscription);

export default router;
