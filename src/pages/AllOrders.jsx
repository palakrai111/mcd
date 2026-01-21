import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/orders")
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-6">Loading orders...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm"
            >
              {/* Order Header */}
              <div className="flex justify-between mb-2">
                <p className="font-semibold">
                  Order #{order.id}
                </p>
                <p className="font-bold text-red-600">
                  ₹{order.totalPrice}
                </p>
              </div>

              {/* User Info */}
              <p className="text-sm text-gray-600">
                Customer: {order.user?.name} ({order.user?.email})
              </p>

              {/* Items */}
              <div className="mt-3">
                <p className="font-medium mb-1">Items:</p>
                <ul className="list-disc ml-6">
                  {order.items?.map((item) => (
                    <li key={item.id}>
                      {item.food.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Date */}
              {order.orderDate && (
                <p className="text-xs text-gray-500 mt-2">
                  Placed on: {new Date(order.orderDate).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
