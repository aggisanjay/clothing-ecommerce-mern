import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, totalPrice, updateQty, removeItem } = useCart();

  if (!items.length)
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p>Your cart is empty.</p>
        <Link to="/products" className="text-blue-600 text-sm">
          Go to products
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-[2fr,1fr] gap-6">
      <div className="space-y-3">
        {items.map((item, idx) => (
          <CartItem
            key={idx}
            item={item}
            onIncrease={() =>
              updateQty(item.product._id, item.size, item.qty + 1)
            }
            onDecrease={() =>
              updateQty(item.product._id, item.size, item.qty - 1)
            }
            onRemove={() => removeItem(item.product._id, item.size)}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg border p-4 space-y-3 h-fit">
        <h2 className="font-semibold text-lg">Order Summary</h2>
        <p className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </p>
        <p className="flex justify-between text-sm text-gray-500">
          <span>Shipping</span>
          <span>₹0</span>
        </p>
        <hr />
        <p className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </p>

        <Link
          to="/checkout"
          className="block bg-black text-white text-center py-2 rounded text-sm mt-2"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
