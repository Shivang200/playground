import React from "react";

const Message = ({ message, user }) => {
  return (
    <div className="flex items-start ml-4 md:ml-[150px] mb-1 p-1 w-full max-w-2xl text-white rounded-md">
      {/* User Initial */}
      <div className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white font-bold rounded-full mr-3 shrink-0">
        {user.charAt(0).toUpperCase()}
      </div>

      {/* Username & Message */}
      <div className="flex flex-col max-w-full">
        <div className="text-purple-500 font-bold text-sm sm:text-base">{user}</div>
        <div 
          className="bg-gray-700 text-white p-2 rounded-lg max-w-xs sm:max-w-md md:max-w-lg break-words overflow-hidden"
          style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default Message;
