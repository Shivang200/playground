import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    //   {/* Navbar */}
    <nav className="bg-black shadow-md fixed w-full z-20 mb-4 mix-blend-difference ">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-purple-500">ChatHub</Link>
        <ul className="hidden md:flex space-x-8 text-gray-300 font-medium">
          <li>
            <Link to="/" className="hover:text-white">
              Features
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-white">
              FAQs
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="bg-purple-600 py-2 px-6 rounded-full hover:bg-purple-500"
            >
              Get Started
            </Link>
          </li>
        </ul>
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
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
