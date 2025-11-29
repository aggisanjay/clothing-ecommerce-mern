import Cart from "../models/Cart.js";

export const getCart = async(req,res)=>{
  const cart = await Cart.findOne({user:req.user._id})
    .populate("items.product");

  if(!cart)
    return res.json({ items: [] });

  res.json(cart);
};

export const addCart = async(req,res)=>{
  const { productId, size, qty } = req.body;

  let cart = await Cart.findOne({ user:req.user._id });

  if(!cart){
    cart = await Cart.create({
      user:req.user._id,
      items:[{ product:productId, size, qty }]
    });
  } else {

    const item = cart.items.find(
      i => i.product == productId && i.size == size
    );

    if(item) item.qty += qty;
    else cart.items.push({ product:productId, size, qty });

    await cart.save();
  }

  cart = await cart.populate("items.product");
  res.json(cart);
};

export const updateCart = async(req,res)=>{
  const { productId, size, qty } = req.body;

  let cart = await Cart.findOne({ user:req.user._id });

  const item = cart.items.find(
    i => i.product == productId && i.size == size
  );

  item.qty = qty;

  await cart.save();

  cart = await cart.populate("items.product");
  res.json(cart);
};

export const removeCart = async (req, res) => {
  const { productId, size } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  cart.items = cart.items.filter(
    i =>
      i.product.toString() !== productId.toString() ||
      i.size !== size
  );

  await cart.save();

  cart = await cart.populate("items.product");

  res.json(cart);
};