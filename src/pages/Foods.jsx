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
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(0);
  const[size] = useState(8);
const [totalPages, setTotalPages] = useState(0); 

  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    apiFetch("/api/categories").then(setCategories);
  }, []);

  // Fetch foods on search / category change
  useEffect(() => {
    let url = `/api/foods?page=${page}&size=${size}`;
    if (searchText) url = `/api/foods/search?name=${searchText}&page=${page}&size=${size}`;
    else if (selectedCategory)
      url = `/api/foods/category?categoryId=${selectedCategory}&page=${page}&size=${size}`;

    
    apiFetch(url).then((data) => {
      setFoods(data.content);
      setTotalPages(data.totalPages);
    });
  }, [searchText, selectedCategory, page]);

  console.log(foods);
  console.log(totalPages);

  useEffect(() => {
    setPage(0);
  }, [searchText, selectedCategory]);
  
  const sortedFoods = [...foods].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
  
      case "price-desc":
        return b.price - a.price;
  
      case "name-asc":
        return a.name.localeCompare(b.name);
  
      case "name-desc":
        return b.name.localeCompare(a.name);
  
      default:
        return 0;
    }
  });
  

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
       
{/* Search + Filter + Sort */}
<div className="flex gap-3 mb-6 flex-wrap">
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

  {/* SORT DROPDOWN */}
  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">Sort By</option>
    <option value="price-asc">Price: Low → High</option>
    <option value="price-desc">Price: High → Low</option>
    <option value="name-asc">Name: A → Z</option>
    <option value="name-desc">Name: Z → A</option>
  </select>
</div>



      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedFoods.map((food) => (
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


      {/* Pagination Buttons */}
<div className="flex justify-center items-center mt-8 gap-2">
  <button
    disabled={page === 0}
    onClick={() => setPage(page - 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setPage(i)}
      className={`px-4 py-2 rounded ${
        page === i ? "bg-red-500 text-white" : "bg-gray-200"
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={page === totalPages - 1}
    onClick={() => setPage(page + 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

    </div>
  );
}
