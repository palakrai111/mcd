import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

// USER PAGES
import Register from "./pages/Register";
import Foods from "./pages/Foods";
import Orders from "./pages/Orders";
import LoginPage from "./pages/LoginPage";

// ADMIN PAGES
import AdminDashboard from "./pages/AdminDashboard";
import AddFood from "./pages/AddFood";
import AllOrders from "./pages/AllOrders";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* USER ROUTES */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/orders" element={<Orders />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-food" element={<AddFood />} />
          <Route path="/admin/orders" element={<AllOrders />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
