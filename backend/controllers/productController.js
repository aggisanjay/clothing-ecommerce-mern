import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const {
    search,
    category,
    size,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10
  } = req.query;

  let query = {};

  if (search)
    query.name = { $regex: search, $options: "i" };

  if (category) query.category = category;
  if (size) query.sizes = size;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }

  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({
    products,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
};


export const getProduct = async(req,res)=>{
  const product = await Product.findById(req.params.id);
  res.json(product);
}

