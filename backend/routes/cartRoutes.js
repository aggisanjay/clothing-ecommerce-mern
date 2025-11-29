import express from "express";
import {
  getCart,
  addCart,
  updateCart,
  removeCart
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/",getCart);
router.post("/add",addCart);
router.put("/update",updateCart);
router.delete("/remove",removeCart);

export default router;
