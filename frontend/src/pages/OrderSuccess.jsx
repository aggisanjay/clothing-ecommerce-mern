import { useParams, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="max-w-md mx-auto px-4 py-10 text-center space-y-4">
      <h1 className="text-2xl font-semibold">🎉 Order Placed!</h1>
      <p>Your order ID is:</p>
      <p className="font-mono text-sm bg-white border rounded px-3 py-2 inline-block">
        {id}
      </p>
      <p className="text-sm text-gray-600">
        A confirmation email has been sent to your registered email address.
      </p>
      <Link to="/products" className="text-blue-600 text-sm">
        Continue shopping
      </Link>
    </div>
  );
}
