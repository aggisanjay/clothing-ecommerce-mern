import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD USER ON FIRST LOAD
  useEffect(() => {
    api
      .get("/auth/me", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data);
      toast.success("Logged in successfully");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // REGISTER
  const register = async (payload) => {
    try {
      const res = await api.post(
        "/auth/register",
        payload,
        { withCredentials: true }
      );

      setUser(res.data);
      toast.success("Account created");

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // LOGOUT ✅ real cookie clear
  const logout = async () => {
    await api.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );

    setUser(null);
    toast.success("Logged out");

    window.location.reload(); // ✅ force memory purge
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
