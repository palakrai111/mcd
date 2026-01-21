import React, { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Load cart
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadCart();
  }, []);

  const loadCart = async () => {
    const data = await apiFetch(`/api/cart/${user.id}`);
    setCart(data);
  };

  // 🔹 Update quantity
  const updateQty = async (cartItemId, qty) => {
    if (qty <= 0) return;
    await apiFetch(`/api/cart/update/${cartItemId}?qty=${qty}`, {
      method: "PUT",
    });
    loadCart();
  };

  // 🔹 Remove item
  const removeItem = async (cartItemId) => {
    await apiFetch(`/api/cart/remove/${cartItemId}`, {
      method: "DELETE",
    });
    loadCart();
  };

  // 🔹 Place order from cart
  const placeOrderFromCart = async () => {
    const order = await apiFetch(`/api/orders/place-from-cart/${user.id}`, {
      method: "POST",
    });
    alert(`Order placed! Total: ₹${order.totalPrice}`);
    navigate("/orders");
  };

  if (!cart) return <p>Loading cart...</p>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.food.imageUrl}
                  alt={item.food.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.food.name}</h2>
                  <p className="text-gray-600">₹{item.food.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQty(item.id, e.target.value)
                  }
                  className="border w-16 p-1 text-center"
                />

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL + PLACE ORDER */}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold">Total: ₹{total}</h2>

            <button
              onClick={placeOrderFromCart}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
