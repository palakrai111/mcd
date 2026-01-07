import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

import CategoryCard from "../components/CategoryCard";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiFetch("/api/categories").then(setCategories);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {categories.map(c => (
        <CategoryCard key={c.id} category={c} />
      ))}
    </div>
  );
}
