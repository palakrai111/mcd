import { useState } from "react";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const submit = async () => {
    await apiFetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Registered Successfully");
    navigate("/login");
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
  
        <input
          className="w-full mb-4 p-3 border rounded-lg"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
  
        <input
          className="w-full mb-4 p-3 border rounded-lg"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
  
        <input
          type="password"
          className="w-full mb-4 p-3 border rounded-lg"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
  
        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          onClick={submit}
        >
          Register
        </button>
  
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
  
}
