import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import  sendOrderEmail  from "../utils/sendEmail.js";

export const createOrder = async(req,res)=>{

  const cart = await Cart.findOne({user:req.user._id})
    .populate("items.product");

  if(!cart || !cart.items.length)
    return res.status(400).json({message:"Cart empty"});

  const items = cart.items.map(i=>({
    product:i.product._id,
    name:i.product.name,
    size:i.size,
    qty:i.qty,
    price:i.product.price
  }));

  const total = items.reduce(
    (sum,i)=>sum+i.qty*i.price
  ,0)

  const order = await Order.create({
    user:req.user._id,
    items,
    totalPrice:total
  });

  cart.items=[];
  await cart.save();

  await sendOrderEmail(order,req.user);

  res.json(order);

}
