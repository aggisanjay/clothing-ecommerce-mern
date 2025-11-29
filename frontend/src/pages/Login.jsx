import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg p-6 space-y-3"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>
        <input
          className="border rounded px-3 py-2 w-full text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border rounded px-3 py-2 w-full text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-black text-white w-full py-2 rounded text-sm">
          Login
        </button>
        <p className="text-xs text-center mt-2">
          New here?{" "}
          <Link to="/register" className="text-blue-600">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
