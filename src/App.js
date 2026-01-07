import logo from './logo.svg';

import Register from './pages/Register';
import Categories from './pages/Categories';
import React from "react"; // optional in modern React, but safe
import { BrowserRouter, Routes, Route } from "react-router-dom"; // router
import { CartProvider } from "./context/CartContext"; // your cart context
import Navbar from "./components/Navbar"; // Navbar component


import Foods from "./pages/Foods"; // Foods page
import Orders from "./pages/Orders"; // Orders page
import LoginPage from './pages/LoginPage';


function App() {
  return (
    
    
  <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
         {/* <Route path="/" element={<Categories />} />*/}
          <Route path="/register" element={<Register />} />
         {/*<Route path="/categories" element={<Categories />} />*/}
          <Route path="/foods" element={<Foods />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>



  );
}

export default App;
