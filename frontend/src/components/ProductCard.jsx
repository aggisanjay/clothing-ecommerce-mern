import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 flex flex-col gap-2">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-md h-48 w-full object-cover"
      />
      <h3 className="font-semibold truncate">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="font-bold text-lg">₹{product.price}</p>
      <Link
        to={`/product/${product._id}`}
        className="mt-auto text-center border px-3 py-1 rounded bg-black text-white text-sm"
      >
        View Details
      </Link>
    </div>
  );
}
