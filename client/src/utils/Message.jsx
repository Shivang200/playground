import React from "react";

const Message = ({ message, user }) => {
  return (
    <div className="flex items-center mb-2">
      {/* Circle showing the user's first name initial */}
      <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full mr-3">
        {user.charAt(0).toUpperCase()} {/* First letter of the user's name */}
      </div>
      {/* Display the username and message */}
      <div>
        <div className="text-gray-300 font-semibold">{user}</div> {/* Username */}
        <div className="bg-gray-700 text-white p-3 rounded-lg">{message}</div> {/* Message */}
      </div>
    </div>
  );
};

export default Message;



// import React from 'react';

// const Message = ({message}) => {
//   return (
//     <div id="box" className=" ml-[150px] mb-1 p-2 break-words   min-h-9  min-w-72 max-w-2xl  text-white  bg-blue-800 rounded-md  ">
            
//   <h6>{message}</h6>
     
//       </div>
//   );
// };

// export default Message;