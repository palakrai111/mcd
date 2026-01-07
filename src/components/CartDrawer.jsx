import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { apiFetch } from "../services/api";

export default function CartDrawer() {
  const { cart, clearCart } = useContext(CartContext);

  // 1️⃣ Place your function here inside the component
  const placeOrder = async () => {
    try {
      const body = {};
      cart.forEach(item => body[item.id] = item.qty);

      // Call the backend API
      const order = await apiFetch("/api/orders/place/1", {
        method: "POST",
        body: JSON.stringify(body)
      });

      // Clear the cart after success
      clearCart();

      // Notify user
      alert("Order placed. Total: ₹" + order.totalPrice);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg w-80">
      <h2 className="text-xl font-bold mb-2">Cart</h2>

      {cart.map(item => (
        <div key={item.id} className="flex justify-between mb-1">
          <span>{item.name} x {item.qty}</span>
          <span>₹{item.price * item.qty}</span>
        </div>
      ))}

      <button
        onClick={placeOrder}  // 2️⃣ Call it on button click
        className="mt-4 w-full bg-red-600 text-white py-2 hover:bg-red-700"
      >
        Place Order
      </button>
    </div>
  );
}
