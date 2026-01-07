import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/api";
import FoodCard from "../components/FoodCard";
import { useNavigate } from "react-router-dom";

export default function Foods() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    apiFetch("/api/categories").then(setCategories);
  }, []);

  // Fetch foods on search / category change
  useEffect(() => {
    let url = "/api/foods";
    if (searchText) url = `/api/foods/search?name=${searchText}`;
    else if (selectedCategory)
      url = `/api/foods/category?categoryId=${selectedCategory}`;

    apiFetch(url).then(setFoods);
  }, [searchText, selectedCategory]);

  const handleQtyChange = (foodId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: Number(value),
    }));
  };

  const placeOrder = async () => {
    const body = {};
    Object.keys(quantities).forEach((id) => {
      if (quantities[id] > 0) body[id] = quantities[id];
    });

    if (Object.keys(body).length === 0) {
      return alert("Select at least one item!");
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  navigate("/login"); // redirect if not logged in
  return;
}
      const order = await apiFetch(`/api/orders/place/${user.id}`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      alert(`Order placed! Total: ₹${order.totalPrice}`);
      setQuantities({});
    } catch (err) {
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search food..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            quantity={quantities[food.id]}
            onQtyChange={handleQtyChange}
          />
        ))}
      </div>

      {/* Place Order */}
      <div className="mt-6">
        <button
          onClick={placeOrder}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
