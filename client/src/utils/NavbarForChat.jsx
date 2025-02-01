import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavbarForChat = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-black shadow-md fixed w-full z-20 mb-4 mix-blend-difference">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-purple-500">ChatHub</Link>
        <ul className="hidden md:flex space-x-8 text-gray-300 font-medium">
        </ul>
      
      </div>
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-16 bg-black text-white px-6 py-4 space-y-4">
          <ul>
            <li>
              <a href="#features" className="block hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#faq" className="block hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#start"
                className="block bg-purple-600 py-2 px-6 rounded-full hover:bg-purple-500"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarForChat;