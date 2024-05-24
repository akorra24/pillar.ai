import { useState } from "react";
import UserIcon from "../assets/user-circle.svg";
import { clearUserData } from "../services/saveLogin";
import { useNavigate } from "react-router-dom";

function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    clearUserData();
    setShowLogout(false);
    navigate("/login");
  };
  return (
    <div className="relative">
      <img
        src={UserIcon}
        className="w-10 cursor-pointer"
        onClick={() => setShowLogout(!showLogout)}
      />
      {showLogout && (
        <div className="absolute top-full right-0 bg-white p-2 rounded-lg shadow-lg">
          <button
            className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition duration-200 ease-in-out"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default LogoutContainer;
