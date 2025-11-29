import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // load user on mount
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data);
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (payload) => {
    try {
      const res = await api.post("/auth/register", payload);
      setUser(res.data);
      toast.success("Account created");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
