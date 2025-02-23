import { Router } from "express";
import {
  createNews,
  getAllNews,
  getSpecificNews,
} from "../controllers/news.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/getAll", getAllNews);
router.get("/get/:id", getSpecificNews);
router.post("/create", verifyToken, createNews);

export default router;
