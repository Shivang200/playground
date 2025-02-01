import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarForChat = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <nav className="bg-black shadow-md fixed w-full z-20 mb-4 mix-blend-difference px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-bold text-purple-500">
          GhostNet
        </Link>

        {/* Logout Button - Now aligned with ChatHub */}
        <button
          onClick={handleLogout}
          className="text-sm 2xl:mr-32 xl:mr-36 mt-1 md:text-base px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarForChat;