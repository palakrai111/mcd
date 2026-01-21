import { useState } from "react";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ important
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const user = await apiFetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // ✅ Save logged-in user
      localStorage.setItem("user", JSON.stringify(user));

      // navigate("/foods");
    //  window.location.href=("/foods")
    if (user.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/foods");
    }


    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
  
        <input
          className="w-full mb-4 p-3 border rounded-lg"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
  
        <input
          type="password"
          className="w-full mb-4 p-3 border rounded-lg"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
  
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>
  
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
  
}
