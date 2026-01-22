
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

export default function Navbar({ cartCount }) {


  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };



  return (
    <nav className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        McD
      </h1>
      <div
  className="relative cursor-pointer"
  onClick={() => navigate("/cart")}
>
  <span className="text-2xl">🛒</span>

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
      {cartCount}
    </span>
  )}
</div>


      <div className="flex items-center gap-4">
        {/* Admin Links */}
        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/add-food">Add Food</Link>
            <Link to="/admin/orders">All Orders</Link>
          </>
        )}

        {/* User Links */}
        {user?.role === "USER" && (
          <>
            <Link to="/foods">Menu</Link>
            <Link to="/orders">My Orders</Link>
          </>
        )}

        {/* Not logged in */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* Logout */}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-white text-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
