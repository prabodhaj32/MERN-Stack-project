import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Ensure correct path to firebase config
import { useNavigate, Link } from "react-router-dom"; // Import Link

const NavbarMain = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed Out");
        navigate("/"); // Redirect to login page
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="w-full bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold">Private Dashboard</div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/profile" className="hover:text-gray-400">Profile</Link>
          <Link to="/settings" className="hover:text-gray-400">Settings</Link>
        </div>
        <button
          onClick={handleSignout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default NavbarMain;
