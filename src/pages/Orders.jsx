import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.name);
  useEffect(() => {
   
    if (!user) {
      navigate("/login");
      return;
    }

    apiFetch(`/api/orders/user/${user.id}`).then(setOrders);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
  
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(o => (
            <div key={o.id} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Order #{o.id}</span>
                <span className="text-gray-400 text-sm">{new Date(o.createdAt).toLocaleDateString()}</span>
              </div>
  
              <p className="text-gray-700 mb-1">User ID: {user.id}</p>
              <p className="text-gray-700 mb-1">User Name: {user.name}</p>
              <p className="text-gray-700 mb-1 font-medium">Total: ₹{o.totalPrice}</p>
  
              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => alert('Details not implemented yet')}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}
