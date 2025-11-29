import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
const CART_KEY = "guest_cart";

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]); // {product, size, qty}

  // Load cart
  useEffect(() => {
    if (user) {
      api
        .get("/cart")
        .then((res) => setItems(res.data.items || []))
        .catch(() => setItems([]));

      // merge guest cart if exists
      const guest = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (guest.length) {
        Promise.all(
          guest.map((i) =>
            api.post("/cart/add", {
              productId: i.product._id,
              size: i.size,
              qty: i.qty,
            })
          )
        )
          .then(() => {
            localStorage.removeItem(CART_KEY);
            return api.get("/cart");
          })
          .then((res) => setItems(res.data.items || []))
          .catch(() => {});
      }
    } else {
      const guest = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      setItems(guest);
    }
  }, [user]);

  // persist guest cart
  useEffect(() => {
    if (!user) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items, user]);

  const totalQuantity = items.reduce((acc, i) => acc + i.qty, 0);
 const totalPrice = items.reduce((acc, i) => {
  if (!i.product || !i.product.price) return acc;
  return acc + i.qty * i.product.price;
}, 0);


  const addToCart = async (product, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    if (!user) {
      // guest
      setItems((prev) => {
        const match = prev.find(
          (i) => i.product._id === product._id && i.size === size
        );
        if (match) {
          return prev.map((i) =>
            i === match ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...prev, { product, size, qty: 1 }];
      });
      toast.success("Added to cart");
      return;
    }

    // logged-in
    const res = await api.post("/cart/add", {
      productId: product._id,
      size,
      qty: 1,
    });
    setItems(res.data.items);
    toast.success("Added to cart");
  };

  const updateQty = async (productId, size, qty) => {
    if (qty <= 0) {
      return removeItem(productId, size);
    }

    if (!user) {
      setItems((prev) =>
        prev.map((i) =>
          i.product._id === productId && i.size === size ? { ...i, qty } : i
        )
      );
      return;
    }

    const res = await api.put("/cart/update", {
      productId,
      size,
      qty,
    });
    setItems(res.data.items);
  };

  const removeItem = async (productId, size) => {
    if (!user) {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.product._id === productId &&
              i.size === size
            )
        )
      );
      toast.success("Removed from cart");
      return;
    }

    const res = await api.delete("/cart/remove", {
      data: { productId, size },
    });
    setItems(res.data.items);
    toast.success("Removed from cart");
  };
  const clearCart = () => {
  setItems([]);
  localStorage.removeItem("guest_cart");
};


  return (
    <CartContext.Provider
      value={{ items, totalQuantity, totalPrice, addToCart, updateQty, removeItem ,clearCart  }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
