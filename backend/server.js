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

const allowedOrigins = [
  "https://clothing-ecommerce-mern.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server or Postman calls (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS ❌ Origin blocked"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight
app.options("/*", cors());


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
