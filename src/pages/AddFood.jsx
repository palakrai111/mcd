import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
export default function AddFood() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  // 🔹 Fetch categories for dropdown
  useEffect(() => {
    apiFetch("/api/categories").then(setCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !categoryId) {
      alert("Name, price and category are required");
      return;
    }

    const foodBody = {
      name,
      description,
      price: Number(price),
      imageUrl
    };

    try {
      await apiFetch(`/api/foods?categoryId=${categoryId}`, {
        method: "POST",
        body: JSON.stringify(foodBody),
      });

      alert("Food added successfully");
      navigate("/admin");

    } catch (err) {
      alert("Failed to add food");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Food
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full border p-2 rounded"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {/* IMAGE PREVIEW (optional but nice) */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="h-32 w-full object-cover rounded"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        <select
          className="w-full border p-2 rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}
