import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function AdminDashboard() {
  const navigate = useNavigate();




  

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user || user.role !== "ADMIN") {
      navigate("/login"); // redirect non-admin users
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="mt-6 space-x-4">
        <button onClick={() => navigate("/admin/add-food")}>
          Add Food
        </button>

        <button onClick={() => navigate("/admin/orders")}>
          View Orders
        </button>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
