import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user:{ type:mongoose.Schema.Types.ObjectId, ref:"User" },
  items: Array,
  totalPrice:Number,
  orderDate:{ type:Date, default:Date.now }
});

export default mongoose.model("Order",orderSchema);
