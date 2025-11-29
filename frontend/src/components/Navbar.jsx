import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalQuantity } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-bold text-xl">
          Clothify
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className={location.pathname.startsWith("/products") ? "font-semibold" : ""}
          >
            Products
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
                {totalQuantity}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm flex items-center gap-1">
                <User className="w-4 h-4" /> {user.name}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm border px-2 py-1 rounded"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2 text-sm">
              <Link to="/login" className="border px-2 py-1 rounded">
                Login
              </Link>
              <Link to="/register" className="border px-2 py-1 rounded bg-black text-white">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
