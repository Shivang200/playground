import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-black via-purple-800 to-black h-screen flex items-center justify-center text-center px-6">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-white max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-purple-200 typing-effect overflow-hidden">
          Chat Anonymously with Anyone, Anytime
        </h1>
        <p className="text-lg mb-6">
          Join ChatHub and experience the freedom of anonymous communication. No
          names, no pressure, just pure conversations.
        </p>
        <Link
          to="/Chat" // Replace with the actual path to your Get Started page
          className="bg-purple-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-purple-500 transition duration-300"
        >
          start chatting
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
