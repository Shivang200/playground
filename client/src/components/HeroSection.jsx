import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const  [login , setLogin] = useState(false);
  

  useEffect(()=>{
        const token = localStorage.getItem("token");

        if(token){

          setLogin(true);
        }else{
          setLogin(false);
        }

  },[])
  return (

    <section className="relative bg-gradient-to-r from-black via-purple-800 to-black h-screen flex items-center justify-center text-center px-4 sm:px-6 md:px-12">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-white w-full max-w-3xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl  md:text-5xl font-bold mb-4 text-purple-200 typing-effect break-words whitespace-normal w-full">
        Talk Without Judgment. Share Without Fear.
        </h1>
        <p className="text-lg mb-6">
          Join GhostNet and experience the freedom of anonymous communication. No
          names, no pressure, just pure conversations.
        </p>
        {login? 
          <Link
          to="/Chat"
          className="bg-purple-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-purple-500 transition duration-300"
        >
          Start Chatting
        </Link>:
         <Link
         to="/signin"
         className="bg-purple-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-purple-500 transition duration-300"
       >
         Log in to Start chat 
       </Link>
       }
      </div>
    </section>
  );
};

export default HeroSection;
