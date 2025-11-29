// import api from "../services/api";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Checkout() {
//   const { totalPrice,clearCart } = useCart();
//   const navigate = useNavigate();

//   const placeOrder = async () => {
//     try {
//       const res = await api.post("/orders");
//        clearCart(); 
//       toast.success("Order placed! Check your email.");
//       navigate(`/order/${res.data._id}`);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Order failed");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
//       <h1 className="text-xl font-semibold">Checkout</h1>
//       <p>Total payable: <span className="font-bold">₹{totalPrice}</span></p>
//       <button
//         className="bg-green-600 text-white px-4 py-2 rounded text-sm"
//         onClick={placeOrder}
//       >
//         Place Order
//       </button>
//     </div>
//   );
// }

import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      const res = await api.post("/orders");

      clearCart();

      toast.success("Order placed! Check your email.");
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    }
  };

  if (!items.length) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link to="/products" className="text-blue-600 text-sm">
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-center">Checkout</h1>

      <div className="grid md:grid-cols-[2fr,1fr] gap-6">

        {/* ITEMS LIST */}
        <div className="bg-white border rounded-lg p-4 space-y-3 shadow-sm">

          <h2 className="font-semibold text-lg border-b pb-2">Your Items</h2>

          {items.map((item, idx) => {
            if (!item.product) return null;

            return (
              <div key={idx} className="flex items-center gap-3">

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={e => e.target.src="https://picsum.photos/100"}
                />

                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-500">
                    Size: {item.size} | Qty: {item.qty}
                  </p>
                </div>

                <p className="font-semibold text-sm">
                  ₹{item.product.price * item.qty}
                </p>
              </div>
            );
          })}
        </div>

        {/* SUMMARY CARD */}
        <div className="bg-white border rounded-lg p-4 space-y-4 shadow-sm h-fit">

          <h2 className="font-semibold text-lg">Order Summary</h2>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Shipping</span>
            <span>₹0</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            className="bg-green-600 hover:bg-green-700 transition text-white py-2 w-full rounded text-sm"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </div>
    </div>
  );
}
