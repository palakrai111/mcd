import React from "react";

export default function FoodCard({ food, quantity, onQtyChange,onAddToCart}) {

  console.log("FoodCard food object:", food); // 👈 ADD HERE

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col">
      {/* Food Image */}
      <img
        src={food.imageUrl}
        alt={food.name}
        onError={(e) => (e.target.src = "/pulao.jpg")}
        className="h-40 w-full object-cover"
      />

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-bold text-lg">{food.name}</h2>

        <p className="text-sm text-gray-600 flex-grow">
          {food.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-red-600 font-semibold text-lg">
            ₹{food.price}
          </span>

          <input
            type="number"
            min="0"
            value={quantity || 0}
            onChange={(e) => onQtyChange(food.id, e.target.value)}
            className="border rounded w-16 p-1 text-center"
          />


          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onAddToCart(food.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}
