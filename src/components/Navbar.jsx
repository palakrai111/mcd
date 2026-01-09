import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
 
// Load user from localStorage
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  setUser(storedUser);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-red-600 text-white p-4 flex justify-between">
      <nav className="flex justify-between items-center px-6 py-4 bg-red-600 text-white">
      
      {/* LOGO */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        McD
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/foods")} className="hover:underline">
          Menu
        </button>

        {user ? (
          <>
            <span className="font-medium">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-red-600 px-4 py-1 rounded hover:bg-gray-100"
          >
            Login
          </button>
        )}
      </div>
    </nav>


      <h1 className="font-bold text-xl">McDonald's</h1>
      <div className="space-x-4">
       {/*<Link to="/categories">Categories</Link>*/}
       <Link to="/register">Register</Link>
       <Link to="/login">Login</Link>
        <Link to="/foods">Foods</Link>
        <Link to="/orders">Orders</Link>
       
      </div>
    </div>
  );
}
