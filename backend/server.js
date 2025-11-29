import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders",orderRoutes);

app.get("/",(req,res)=>{
  res.send("✅ Backend running");
});

app.listen(
  process.env.PORT,
  ()=>console.log("API running on",process.env.PORT)
);
