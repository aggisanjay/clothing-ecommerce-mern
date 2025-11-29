// import { X, Plus, Minus } from "lucide-react";

// export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
//   const { product, size, qty } = item;
//   const lineTotal = product.price * qty;

//   return (
//     <div className="bg-white rounded-lg border p-3 flex gap-3">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-20 h-20 object-cover rounded"
//       />
//       <div className="flex-1">
//         <div className="flex justify-between">
//           <h3 className="font-semibold">{product.name}</h3>
//           <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//         <p className="text-xs text-gray-500">
//           {product.category} • Size: <span className="font-medium">{size}</span>
//         </p>
//         <p className="mt-1 text-sm">Price: ₹{product.price}</p>

//         <div className="mt-2 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={onDecrease}
//               className="border rounded p-1 disabled:opacity-50"
//               disabled={qty <= 1}
//             >
//               <Minus className="w-4 h-4" />
//             </button>
//             <span className="w-6 text-center text-sm">{qty}</span>
//             <button onClick={onIncrease} className="border rounded p-1">
//               <Plus className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="font-semibold text-sm">Total: ₹{lineTotal}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { X, Plus, Minus } from "lucide-react";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  // ✅ HARD GUARD
  if (!item?.product) return null;

  const { product, size, qty } = item;

  const price = product.price || 0;
  const lineTotal = price * qty;

  return (
    <div className="bg-white rounded-lg border p-3 flex gap-3">
      <img
        src={product.image || "https://picsum.photos/200"}
        onError={(e) => (e.target.src = "https://picsum.photos/200")}
        alt={product.name}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold">{product.name}</h3>
          <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-500">
          {product.category} • Size: <b>{size}</b>
        </p>

        <p className="mt-1 text-sm">Price: ₹{price}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onDecrease}
              disabled={qty <= 1}
              className="border rounded p-1"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-6 text-center">{qty}</span>

            <button
              onClick={onIncrease}
              className="border rounded p-1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <p className="font-semibold">₹{lineTotal}</p>
        </div>
      </div>
    </div>
  );
}
