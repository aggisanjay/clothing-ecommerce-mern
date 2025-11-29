// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";
// import { useCart } from "../context/CartContext";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const { addToCart } = useCart();
//   const [product, setProduct] = useState(null);
//   const [size, setSize] = useState("");

//   useEffect(() => {
//     api.get(`/products/${id}`).then((res) => setProduct(res.data));
//   }, [id]);

//   if (!product) return null;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="rounded-xl w-full max-h-[420px] object-cover"
//       />

//       <div className="space-y-4">
//         <h1 className="text-2xl font-bold">{product.name}</h1>
//         <p className="text-gray-600">{product.description}</p>
//         <p className="text-sm text-gray-500">Category: {product.category}</p>
//         <p className="text-2xl font-bold">₹{product.price}</p>

//         <div>
//           <label className="block text-sm mb-1">Select size</label>
//           <select
//             className="border rounded px-3 py-2 text-sm"
//             value={size}
//             onChange={(e) => setSize(e.target.value)}
//           >
//             <option value="">Choose size</option>
//             {product.sizes.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           className="bg-black text-white px-4 py-2 rounded text-sm"
//           onClick={() => addToCart(product, size)}
//         >
//           Add to cart
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return null;

  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const handleAdd = () => {
    if (!inStock) {
      toast.error("Out of stock");
      return;
    }
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    addToCart(product, size);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        onError={(e)=> e.target.src="https://picsum.photos/400"}
        className="rounded-xl w-full max-h-[420px] object-cover border"
      />

      {/* DETAILS */}
      <div className="space-y-4">

        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p className="text-gray-600">
          {product.description}
        </p>

        <div className="flex gap-3 text-sm">
          <p className="bg-gray-100 px-3 py-1 rounded">
            <b>Category:</b> {product.category}
          </p>
          <p className={`px-3 py-1 rounded text-white 
            ${lowStock ? "bg-orange-500" : inStock ? "bg-green-600" : "bg-red-600"}`}>
            {inStock ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>
        </div>

        <p className="text-3xl font-bold text-black">
          ₹{product.price}
        </p>

        <div>
          <label className="block text-sm mb-1">
            Select Size
          </label>
          <select
            className="border px-3 py-2 rounded w-52"
            value={size}
            onChange={(e)=> setSize(e.target.value)}
          >
            <option value="">Choose size</option>
            {product.sizes.map(s=>(
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAdd}
          disabled={!inStock}
          className={`px-4 py-2 rounded text-white text-sm
            ${inStock
              ? "bg-black hover:bg-gray-900"
              : "bg-gray-400 cursor-not-allowed"}`}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
