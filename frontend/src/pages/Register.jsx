import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const submit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <form
        onSubmit={submit}
        className="bg-white border rounded-lg p-6 space-y-3"
      >
        <h1 className="text-xl font-semibold text-center">Register</h1>
        <input
          className="border rounded px-3 py-2 w-full text-sm"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border rounded px-3 py-2 w-full text-sm"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="border rounded px-3 py-2 w-full text-sm"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-black text-white w-full py-2 rounded text-sm">
          Register
        </button>
        <p className="text-xs text-center mt-2">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
