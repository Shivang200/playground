import React, { useEffect, useState } from "react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set timeout to hide loader after 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust timing to match your animation duration

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    isLoading && (
      <div
        id="loader"
        className={`fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center transition-all ease-in-out`}
      >
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800 bg-clip-text drop-shadow-[0_0_20px_rgba(120,80,255,1)]">
          TALK
        </h1>
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800 bg-clip-text drop-shadow-[0_0_20px_rgba(120,80,255,1)]">
          CONNECT
        </h1>
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800 bg-clip-text drop-shadow-[0_0_20px_rgba(120,80,255,1)]">
          DISAPPEAR
        </h1>

       
      </div>
    )
  );
};

export default Loader;
